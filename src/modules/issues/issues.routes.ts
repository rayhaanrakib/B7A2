import { Router } from "express";
import { authorizeRoles } from "../../middleware/role.middleware";
import { createIssue } from "./issues.controller";
import { auth } from "../../middleware/auth.middleware";

const router = Router();
router.post("/issues", auth, createIssue);

export default router;
