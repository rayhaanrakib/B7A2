import type { Request, Response } from "express";
import { sendResponse } from "../../utils/response.util";
import issuesService from "../services/issues.service";

export const createIssue = async (req: Request, res: Response) => {
  const { title, description, type } = req.body;
  const reporter_id = req.user!.id;
  const newIssue = await issuesService.createIssue({
    reporter_id,
    title,
    description,
    type,
  });
  if (!newIssue) {
    return sendResponse(res, { message: "Failed to create issue" }, 500);
    return;
  }
  sendResponse(
    res, { message: "Issue created successfully", data: newIssue },
    201,
  );
};


export const getIssues = async (req: Request, res: Response) => {
  const { type, status, sort } = req.query as {
    type?: string;
    status?: string;
    sort?: 'newest' | 'oldest';
  };
  const issues = await issuesService.getIssues({
    type: type as any,
    status: status as any,
    sort,
  });

  sendResponse(res, { message: "Issues retrived successfully", data: issues });
};
