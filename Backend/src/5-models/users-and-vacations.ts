import Joi from "joi";

class UsersAndVacationsModel {
    userId: number;
    vacationId: number;

    public constructor(vacation: UsersAndVacationsModel) {
        this.userId = vacation.userId
        this.vacationId = vacation.vacationId
    }

    public static postValidationScheme = Joi.object({
        userId: Joi.number().integer().required().min(1),
        vacationId: Joi.number().integer().required().min(1)
    });

    public static putValidationScheme = Joi.object({
        userId: Joi.number().integer().required().min(1),
        vacationId: Joi.number().integer().required().min(1)
    });

    public static patchValidationScheme = Joi.object({
        userId: Joi.number().integer().optional().min(1),
        vacationId: Joi.number().integer().optional().min(1)
    });

    public postValidation(): string {
        const result = UsersAndVacationsModel.postValidationScheme.validate(this);
        return result.error?.message;
    }

    public putValidation(): string {
        const result = UsersAndVacationsModel.putValidationScheme.validate(this);
        return result.error?.message;
    }

    public patchValidation(): string {
        const result = UsersAndVacationsModel.patchValidationScheme.validate(this);
        return result.error?.message;
    }

};
export default UsersAndVacationsModel;