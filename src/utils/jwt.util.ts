import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import type { UserResponse } from "../types/user.types";


export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret = type === "refresh" ? config.jwt_refresh_secret : config.jwt_secret;
  const decoded = jwt.verify(token, secret) as JwtPayload;
  return decoded;
};

export const signToken = (payload: UserResponse) => {
  const jwtToken = jwt.sign(payload, config.jwt_secret, {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign(payload, config.jwt_refresh_secret, {
    expiresIn: "30d",
  });

  return { jwtToken, refreshToken };
};
