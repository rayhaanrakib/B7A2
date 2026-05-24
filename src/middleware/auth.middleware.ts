import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/response.util";
import { verifyToken } from "../utils/jwt.util";
import authService from "../modules/services/auth.service";

export const privateRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return sendResponse(res, { message: "token is missing", error: true }, 401);
    }

    const payload = verifyToken(token, "refresh");
    if (!payload) {
      return sendResponse(res, { message: "Invalid token", error: true }, 401);
    }

    const user = await authService.getUserById(payload.id);
    if (!user) {
      return sendResponse(res, { message: "User not found", error: true }, 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};