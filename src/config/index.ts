import { env } from "process";

import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const config = {
    port: env.PORT as string,
    database_url: env.DATABASE_URL as string,
}