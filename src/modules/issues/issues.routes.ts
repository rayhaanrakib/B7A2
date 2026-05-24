import { Router } from "express";
import { roleBasedRoute } from "../../middleware/role.middleware";
import { createIssue, getIssueById, getIssues } from "./issues.controller";
import { privateRoute } from "../../middleware/auth.middleware";

const router = Router();
router.post("/issues", privateRoute, createIssue);
router.get("/issues", getIssues);
router.get("/issues/:id", getIssueById);

export default router;
