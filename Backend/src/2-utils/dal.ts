import mysql from "mysql";
import config from "./config";


const connection = mysql.createPool({
    port: config.sqlPort,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err, result) => {

            if (err) {
                reject(err);
                return;
            }

            resolve(result || [])

        })
    })
}

export default {
    execute,
};