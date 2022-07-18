import Joi from 'joi';
class CredentialsModel {
    userName: string;
    password: string;

    public constructor(credentials: CredentialsModel) {
        this.userName = credentials.userName;
        this.password = credentials.password;
    }

    public static PostValidationScheme = Joi.object({
        userName: Joi.string().min(3).max(20),
        password: Joi.string().min(8).max(20)
    });

    public ValidatePost(): string {
        const result = CredentialsModel.PostValidationScheme.validate(this);
        return result.error?.message;
    };
}
export default CredentialsModel;