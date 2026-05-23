import { sql } from "../../db";
import authService from "./auth.service";
import type { CreateIssue } from "../../types/issue.types";

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

  
}

export default new IssueService();
