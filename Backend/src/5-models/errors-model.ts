class ClientError {
    public status: number;
    public message: string;

    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

export class GeneralError extends ClientError {
    public constructor(message: string) {
        super(400, message)
    };
}

// for sending wrong source parameters
export class SourceNotFound extends ClientError {
    public constructor(id: number) {
        super(400, `vacation with id ${id} is not found`)
    };
};

// login or password error
export class LoginError extends ClientError {
    public constructor(message: string) {
        super(404, message)
    }
}

export class RouteNotFoundError extends ClientError {
    public constructor(method: string, url: string) {
        super(404, `${method} ${url} not found`)
    }
}

// error in sent data
export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(400, message)
    }
}

// user is already existing in the system 
export class UserExists extends ClientError {
    public constructor(user: string) {
        super(400, `user ${user} already exists.`)
    }
}

// user is not authorized for the operation 
export class UnAuthorizedError extends ClientError {
    public constructor(message: string) {
        super(400, message)
    }
}