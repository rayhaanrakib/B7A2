import type { Request, Response } from "express";
import authService from "../services/auth.service";
import { sendResponse } from "../../utils/response.util";
import { signToken, verifyToken } from "../../utils/jwt.util";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const user = await authService.createUser({ name, email, password, role });
  if (!user) {
    sendResponse(res, { message: "Failed to create your account" }, 400);
    return;
  }
  sendResponse(
    res,
    { message: "User registered successfully", data: user },
    201,
  );
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.validateUser(email, password);

  if (!user) {
    sendResponse(res, { message: "invalid credentials" }, 401);
    return;
  }
  const { jwtToken, refreshToken } = signToken(user);
  res.cookie("refreshToken", refreshToken, {
    sameSite: "lax",
    httpOnly: true,
  });
  sendResponse(
    res,
    {
      message: "Login successful",
      data: {
        token: jwtToken,
        user,
      },
    },
    200,
  );
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return sendResponse(res, { message: "refresh token not found" });
  }
  const payload = verifyToken(refreshToken, "refresh");
  if (!payload) {
    return sendResponse(res, { message: "Invalid refresh token" }, 401);
  }
  const user = await authService.getUserById(payload.id);
  if (!user) {
    return sendResponse(res, { message: "User not found" }, 404);
  }
  const { jwtToken, refreshToken: newRefreshToken } = signToken(user);
  res.cookie("refreshToken", newRefreshToken, {
    sameSite: "lax",
    httpOnly: true,
  })
  sendResponse(res,{
      message: "token refreshed",
      data: {
        token: jwtToken,
        user,
      },
    },
    200,
  );
};
