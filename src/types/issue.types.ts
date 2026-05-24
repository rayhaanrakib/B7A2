import type { UserRole } from "./user.types";

export type IssueType = 'bug' | 'feature_request';
export type IssueStatus = 'open' | 'in_progress' | 'resolved';

export interface Issue {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateIssue {
  title: string;
  description: string;
  type: IssueType;
}
export interface IssueFilters{
  status?: IssueStatus;
  type?: IssueType;
  reporter_id?: number;
}
export interface UpdateIssue {
  title?: string;
  description?: string;
  type?: IssueType;
}

export interface IssueResponse {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  reporter: {
    id: number;
    name: string;
    role: UserRole;
  };
  created_at: string;
  updated_at: string;
}