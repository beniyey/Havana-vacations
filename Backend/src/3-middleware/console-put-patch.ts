import { NextFunction, Request, Response } from "express";

function consolePutOrPatch(request: Request, response: Response, next: NextFunction) {
    if (request.method == "PUT" || request.method == "PATCH") {
        console.log("User is going to update data: ");
        console.log(request.body);
    }
    next();
}

export default consolePutOrPatch;