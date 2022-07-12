import Joi from "joi";

class UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    roleId: number;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    public static PostValidationScheme = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().required().min(4).max(20),
        lastName: Joi.string().required().min(4).max(20),
        userName: Joi.string().required().min(3).max(20),
        password: Joi.string().required().min(8).max(20),
        roleId: Joi.forbidden(),
        roleName: Joi.forbidden(),
    });

    public validatePost(): string {
        const result = UserModel.PostValidationScheme.validate(this);
        return result.error?.message;
    }

}
export default UserModel;