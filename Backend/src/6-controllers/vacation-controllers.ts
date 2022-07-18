import { UnAuthorizedError } from './../5-models/errors-model';
import fs from 'fs/promises';
import express, { NextFunction, Request, Response } from 'express';
import verifyAdmin from '../3-middleware/verify-admin';
import vacationLogic from '../4-logic/vacation-logic';
import VacationModel from '../5-models/vacation-model';
import verifyLoggedIn from '../3-middleware/verify-loggge-in';


const router = express.Router();

// GET http://localhost:3002/api/vacations
router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const result = await vacationLogic.getAllVacations();
        response.json(result)
    } catch (error) {
        next(error)
    }
})

// POST http://localhost:3002/api/vacations
router.post("/vacations/", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // get image from files and insert into body;
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body)
        const addedVacation = await vacationLogic.addVacation(vacation)
        response.json(addedVacation);
    } catch (error) {
        next(error)
    }
})

// PUT http://localhost:3002/api/vacations/1
router.put("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const id: number = +request.params.id;
        request.body.id = id;
        const vacation = new VacationModel(request.body)
        const updatedVacation = await vacationLogic.updateFullVacation(vacation);
        response.json(updatedVacation)
    } catch (error) {
        next(error)
    }
})

// delete http://localhost:3002/api/vacations/1
router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: number = +request.params.id;
        await vacationLogic.deleteVacation(id);
        response.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

export default router;