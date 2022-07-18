import { RouteNotFoundError } from './5-models/errors-model';
import { NextFunction } from 'express';
import expressFileUpload from 'express-fileupload';
import express, { Request, Response } from 'express';
import catchAll from './3-middleware/catch-all';
import vacationController from "./6-controllers/vacation-controllers";
import authController from "./6-controllers/auth-controllers";
import vacationsAndUsersController from "./6-controllers/vacations-and-users-controllers";
import cors from "cors";
import path from 'path';
import socketLogic from './4-logic/socket-logic';
import config from './2-utils/config';
import sanitize from './3-middleware/sanitize';
import expressRateLimit from 'express-rate-limit';


const expressServer = express();

// dos attack prevention
expressServer.use("/api/", expressRateLimit({
    windowMs: 1000, 
    max: 100, 
    message: "Too many attempts please wait and try again." 
}));

expressServer.use(expressFileUpload());

expressServer.use(cors());

// xss attack prevention
expressServer.use(sanitize);

// allows us to serve photos from the backend
expressServer.use("/api/", express.static(path.join(__dirname, "public")));

expressServer.use(express.json());

expressServer.use("/api", vacationController);
expressServer.use("/api", authController);
expressServer.use("/api", vacationsAndUsersController);

expressServer.use(express.static(path.join(__dirname, "./7-frontend")));

expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    if (config.isDevelopment) {
        const err = new RouteNotFoundError(request.method, request.originalUrl);
        next(err);
    }
    else {
        response.sendFile(path.join(__dirname, "./7-frontend/index.html"));
    }
});

expressServer.use(catchAll);

const httpServer = expressServer.listen(config.port, () => console.log("listening..."));
socketLogic.init(httpServer);