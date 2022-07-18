import fs from 'fs/promises';
import { NextFunction, Request, Response } from "express";

// catches all the errors and sorting them 
async function catchAll(error: any, request: Request, response: Response, next: NextFunction) {
  console.log(error)
  const status = error.status || 500;
  const message = error.message || "unknown error";
  if (status == 500) {
    fs.appendFile("./src/2-utils/error-logger.txt", `\n error : ${error.message} has ocurred at ${new Date().toLocaleString()}`)
    fs.appendFile("./src/2-utils/error-logger.txt", "\n ********************************************************")
  };
  response.status(status).send(message);
}

export default catchAll;