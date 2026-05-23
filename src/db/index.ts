import { neon } from "@neondatabase/serverless";
import { config } from "../config";
import { createSchema } from "./schema";

export const sql = neon(config.database_url)

export const initializeDB = async ()=>{
    await createSchema();
    console.log("db connected");
}