// default environment is development
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

class Config {
    public isDevelopment = process.env.NODE_ENV === 'development';
    public isProduction = process.env.NODE_ENV === 'production';
    public port: number;
    public sqlPort: number;
    public host: string;
    public user: string;
    public password: string;
    public database: string;
}

class DevelopmentConfig extends Config {
    public isDevelopment: true;
    public port = 3002;
    public sqlPort = 8889;
    public host = 'localhost';
    public user = 'root';
    public password = 'root';
    public database = 'Travel-agency';
}

class ProductionConfig extends Config {
    public isDevelopment: false;
    public port = +process.env.PORT;
    public host = 'eu-cdbr-west-03.cleardb.net';
    public user = 'b9c04a372fb25f';
    public password = '636d6c86';
    public database = 'heroku_b97f661941bec96';
}

// mysql://user:password@host:port/database
// mysql://b9c04a372fb25f:636d6c86@eu-cdbr-west-03.cleardb.net/heroku_b97f661941bec96?reconnect=true
const config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig();
export default config;