class Config {
    public vacationsUrl: string = "";
    public vacationsImagesUrl: string = "";
    public vacationsAndUsersUrl: string = "";
    public loginUrl: string = "";
    public registerUrl: string = "";
    public socketUrl: string = "";
}

class DevelopmentConfig extends Config {
    public vacationsUrl: string = "http://localhost:3002/api/vacations/";
    public vacationsImagesUrl: string = "http://localhost:3002/api/";
    public loginUrl: string = "http://localhost:3002/api/auth/login/";
    public vacationsAndUsersUrl: string = "http://localhost:3002/api/vacation-followers/";
    public registerUrl: string = "http://localhost:3002/api/auth/register/";
    public socketUrl: string = "http://localhost:3002";
}

class ProductionConfig extends Config {
    public vacationsUrl: string = " https://booking-clone-ben.herokuapp.com/api/vacations/";
    public vacationsImagesUrl: string = " https://booking-clone-ben.herokuapp.com/api/";
    public loginUrl: string = " https://booking-clone-ben.herokuapp.com/api/auth/login/";
    public vacationsAndUsersUrl: string = " https://booking-clone-ben.herokuapp.com/api/vacation-followers/";
    public registerUrl: string = "https://booking-clone-ben.herokuapp.com/api/auth/register/";
    public socketUrl: string = "https://booking-clone-ben.herokuapp.com";
}

let config: Config;

if (process.env.NODE_ENV === "development") {
    config = new DevelopmentConfig();
}

else if (process.env.NODE_ENV === "production") {
    config = new ProductionConfig();
}

export default config;