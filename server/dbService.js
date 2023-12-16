
const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('database:' + connection.state);
})


class dbService {
    static getDbServiceInstance() {
        return instance ? instance : new dbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names";
                connection.query(query, (err, results) => {
                    if (err) 
                        reject(new Error(err.message));
                    resolve(results);
                });
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = dbService;