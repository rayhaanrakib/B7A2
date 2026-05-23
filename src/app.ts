import cookieParser from "cookie-parser";
import express, { type Application, type Request, type Response } from "express";
import logger from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./modules/auth/auth.routes"
import issuesRoutes from "./modules/issues/issues.routes"

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(logger);


app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to DevPulse");
});

app.use("/api/auth", authRoutes)
app.use("/api", issuesRoutes)

app.use(errorHandler)
export default app;