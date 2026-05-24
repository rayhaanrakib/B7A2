import { Router } from "express";
import { roleBasedRoute } from "../../middleware/role.middleware";
import { createIssue, deleteIssue, getIssueById, getIssues, updateIssue, updateStatus } from "./issues.controller";
import { privateRoute } from "../../middleware/auth.middleware";

const router = Router();
router.get("/issues", getIssues);
router.get("/issues/:id", getIssueById);
router.post("/issues", privateRoute, createIssue);
router.patch("/issues/:id", privateRoute, updateIssue);
router.delete("/issues/:id", privateRoute, roleBasedRoute('maintainer'), deleteIssue);
router.put("/issues/:id", privateRoute, roleBasedRoute('maintainer'), updateStatus);

export default router;
