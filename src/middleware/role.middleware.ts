import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../types/user.types";
import { sendResponse } from "../utils/response.util";

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendResponse(_res, { message: "Unauthorized", error: true }, 401);
    }

    if (!roles.includes(req.user.role)) {
      return sendResponse(
        _res,
        { message: "Forbidden - you don't have permission", error: true },
        403,
      );
    }

    return next();
  };
};
