import { Router } from "express";
import { roleBasedRoute } from "../../middleware/role.middleware";
import { createIssue, getIssueById, getIssues, updateIssue } from "./issues.controller";
import { privateRoute } from "../../middleware/auth.middleware";

const router = Router();
router.get("/issues", getIssues);
router.get("/issues/:id", getIssueById);
router.post("/issues", privateRoute, createIssue);
router.patch("/issues/:id", privateRoute, updateIssue);

export default router;
