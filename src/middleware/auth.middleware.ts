import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/response.util";
import { verifyToken } from "../utils/jwt.util";
import authService from "../modules/services/auth.service";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return sendResponse(res, { message: "token is missing", error: true }, 401);
    }

    const payload = verifyToken(token, "refresh");
    console.log(payload);
    if (!payload) {
      return sendResponse(res, { message: "Invalid token", error: true }, 401);
    }

    const user = await authService.getUserById(payload.id);
    console.log(user);
    if (!user) {
      return sendResponse(res, { message: "User not found", error: true }, 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};