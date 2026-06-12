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

export const getIssueById = async (req: Request, res: Response) => {
  const id = Number(req?.params?.id);
  if (!id || id < 1) {
    return sendResponse(res, { message: "Invalid Id" }, 400);
  }
  const getIssue = await issuesService.getIssueById(id);
  const issue = getIssue[0];
  if (!issue) {
    return sendResponse(res, { message: "Issue not found" }, 404);
  }

  sendResponse(res, { message: "Issue retrieved successfully", data: issue}, 200);
}

export const updateIssue = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id || id < 1) {
    return sendResponse(res, { message: "Invalid Id" }, 400);
  }

  const existing = await issuesService.getIssueById(id);
  const issue = existing[0];
  if(!issue){
    return sendResponse
    (res, { message: "Issue not found" }, 404);
  }
  const currentUser = req.user!;

  const isMaintainer = currentUser.role === 'maintainer';
  const isOwner = issue.reporter.id === currentUser.id;
  const isOpen = issue.status === 'open';

  if (!isMaintainer && !(isOwner && isOpen)) {
    return sendResponse(res, { message: "Forbidden - you don't have permission to update this issue" }, 403);
  }

  const { title, description, type } = req.body;
  const updated = await issuesService.updateIssue(id, { title, description, type });
  if(!updated){
    return(sendResponse(res, { message: "Failed to update issue" }, 500));
  }
  sendResponse(res, { message: "Issue updated successfully", data: updated }, 200);
};

export const deleteIssue= async(req:Request, res:Response)=>{
  const id = Number(req.params.id);
  if (!id || id < 1) {
    return sendResponse(res, { message: "Invalid Id" }, 400);
  }

  const existing = await issuesService.getIssueById(id);
  const issue = existing[0];
  if(!issue){
    return sendResponse
    (res, { message: "Issue not found" }, 404);
  }
  const currentUser = req.user!;
  const isMaintainer = currentUser.role === 'maintainer';
  if (!isMaintainer) {
    return sendResponse(res, { message: "Forbidden - you don't have permission to delete this issue" }, 403);
  }
  const deleted = await issuesService.deleteIssue(id);
  sendResponse(res, { message: "Issue deleted successfully"}, 200);
}

export const updateStatus = async(req:Request, res:Response)=>{
  const id = Number(req.params.id);
  if (!id || id < 1) {
    return sendResponse(res, { message: "Invalid Id" }, 400);
  }

  const existing = await issuesService.getIssueById(id);
  const issue = existing[0];
  if(!issue){
    return sendResponse
    (res, { message: "Issue not found" }, 404);
  }
  const currentUser = req.user!;
  const isMaintainer = currentUser.role === 'maintainer';
  if (!isMaintainer) {
    return sendResponse(res, { message: "Forbidden - you don't have permission to update status of this issue" }, 403);
  }

  const {status} = req.body;
  const updated = await issuesService.updateStatus(id, status);
  if(!updated){
    return(sendResponse(res, { message: "Failed to update issue status" }, 500));
  }
  sendResponse(res, { message: "Issue status updated successfully", data: updated }, 200);

}
