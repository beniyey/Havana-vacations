import express, { NextFunction, Request, Response } from 'express';
import usersAndVacationsLogic from '../4-logic/users-and-vacations-logic';
import vacationLogic from '../4-logic/vacation-logic';
import UsersAndVacationsModel from '../5-models/users-and-vacations';

const router = express.Router();

// GET http://localhost:3002/api/vacation-followers/:id
router.get("/vacation-followers/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: number = +request.params.id;
        const followersAndVacations = await usersAndVacationsLogic.getUsersAndVacationsByUserId(id);
        response.json(followersAndVacations);
    } catch (error) {
        next(error)
    }
})

// POST http://localhost:3002/api/vacation-followers
router.post("/vacation-followers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userVacation = new UsersAndVacationsModel(request.body);
        const addedUserVacation = await usersAndVacationsLogic.addUsersAndVacations(userVacation);
        response.json(addedUserVacation);
    } catch (error) {
        next(error)
    }
})

// POST http://localhost:3002/api/vacation-followers
router.delete("/vacation-followers/:userId/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user: number = +request.params.userId;
        const vacation: number = +request.params.vacationId;
        await usersAndVacationsLogic.deleteUsersAndVacations(user , vacation);
        response.sendStatus(204);
    } catch (error) {
        next(error)
    }
})

export default router;