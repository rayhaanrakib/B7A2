import type { NextFunction, Request, Response } from "express";
import { config } from "../config";

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    const error = err instanceof Error ? err : undefined;
    res.status(500).json({
        success: false,
        message: error ? error.message : "Internal Server Error",
        stack: config.node_env === "development" ? error?.stack : undefined
    });
};
