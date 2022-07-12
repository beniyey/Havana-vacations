import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {
    id: number;
    description: string;
    destination: string;
    departure: any;
    departureBack: any;
    price: string;
    image: UploadedFile;
    imageName: string;

    public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.departure = vacation.departure;
        this.departureBack = vacation.departureBack;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
    };

    // post validation for a vacation 
    public static PostValidation = Joi.object({
        id: Joi.forbidden(),
        description: Joi.string().required().allow().min(10).max(150),
        destination: Joi.string().required().allow().min(3).max(15),
        departure: Joi.any().required(),
        departureBack: Joi.any().required(),
        price: Joi.number().integer().required().min(1).max(10000),
        image: Joi.any().required(),
        imageName: Joi.string().optional().allow().min(1).max(100)
    });

    // put validation for a vacation 
    public static PutValidation = Joi.object({
        id: Joi.number().integer().required().min(1),
        description: Joi.string().required().allow().min(10).max(150),
        destination: Joi.string().required().allow().min(3).max(15),
        departure: Joi.any().required(),
        departureBack: Joi.any().required(),
        price: Joi.number().integer().required().min(1).max(100000),
        image: Joi.any().optional(),
        imageName: Joi.string().optional().allow().min(1).max(100)
    });

    public ValidatePost(vacation: VacationModel): string {
        const result = VacationModel.PostValidation.validate(this);
        return result.error?.message;
    }

    public ValidatePut(vacation: VacationModel): string {
        const result = VacationModel.PutValidation.validate(this);
        return result.error?.message;
    }

};
export default VacationModel;