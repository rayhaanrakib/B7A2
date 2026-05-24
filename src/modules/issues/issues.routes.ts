import { Router } from "express";
import { roleBasedRoute } from "../../middleware/role.middleware";
import { createIssue, getIssues } from "./issues.controller";
import { privateRoute } from "../../middleware/auth.middleware";

const router = Router();
router.post("/issues", privateRoute, createIssue);
router.get("/issues", getIssues);

export default router;
