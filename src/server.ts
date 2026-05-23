import app from "./app";
import {config} from "./config"
import { initializeDB } from "./db";

const server = () =>{
    initializeDB();
    app.listen(config.port, ()=>{
        console.log(`Server listening on port ${config.port}`);
    });
}

server();