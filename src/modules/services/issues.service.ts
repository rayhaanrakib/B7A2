import { sql } from "../../db";
import authService from "./auth.service";
import type { CreateIssue, IssueType, IssueStatus, IssueResponse, UpdateIssue } from "../../types/issue.types";

interface IssueFilters {
  type?: IssueType | undefined;
  status?: IssueStatus | undefined;
  sort?: 'newest' | 'oldest' | undefined;
}

async function responseIssues(data: Record<string, any>): Promise<IssueResponse> {
  const reporter = await authService.getUserById(data.reporter_id);
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    type: data.type,
    status: data.status,
    reporter: {
      id: reporter.id,
      name: reporter.name,
      role: reporter.role,
    },
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

class IssueService {
  async createIssue({ reporter_id, title, description, type }: CreateIssue & { reporter_id: number }) {
    const user = await authService.getUserById(reporter_id);
    if (!user) {
      throw new Error("User not found");
    }
    const res = await sql`
      INSERT INTO issues (reporter_id, title, description, type)
      VALUES (${reporter_id}, ${title}, ${description}, ${type})
      RETURNING *
    `;
    return res[0];
  }

  async getAllIssues(filters: IssueFilters = {}) {
    const { type, status, sort = 'newest' } = filters;
    if (sort === 'newest') {
      return sql`SELECT * FROM issues ORDER BY created_at DESC`;
    }
    if (type) {
      return sql`SELECT * FROM issues WHERE type = ${type} ORDER BY created_at ASC`;
    }
    if (status) {
      return sql`SELECT * FROM issues WHERE status = ${status} ORDER BY created_at ASC`;
    }
    if (type && status) {
      return sql`SELECT * FROM issues WHERE type = ${type} AND status = ${status} ORDER BY created_at ASC`;
    }
    return sql`SELECT * FROM issues ORDER BY created_at ASC`;
  }
  async getIssues(filters: IssueFilters = {}): Promise<IssueResponse[]> {
    const resData = await this.getAllIssues(filters);
    return Promise.all(resData.map(responseIssues));
  }

  async getIssueById(id: number) {
    const result = await sql`SELECT * FROM issues WHERE id = ${id}`;
    return Promise.all(result.map(responseIssues));
  }

  async updateIssue(id: number, data: UpdateIssue) {
    const { title, description, type } = data;

    const result = await sql`
      UPDATE issues
      SET
        title       = COALESCE(${title ?? null}, title),
        description = COALESCE(${description ?? null}, description),
        type        = COALESCE(${type ?? null}, type),
        updated_at  = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return result[0];
  }

}

export default new IssueService();
