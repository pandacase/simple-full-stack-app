
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
                connection.query(query, (err, result) => {
                    if (err) 
                        reject(new Error(err.message));
                    resolve(result);
                });
            });
            // console.log(response);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added) VALUES (?,?);";
                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err)
                        reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });
            return {
                id : insertId,
                name : name,
                dataAdded : dateAdded
            };
        } catch (err) {
            console.log(err);
        }
    }

    async deleteRowById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
                connection.query(query, [id], (err, result) => {
                    if (err)
                        reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }

    async getByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;";
                connection.query(query, [name], (err, result) => {
                    if (err) 
                        reject(new Error(err.message));
                    resolve(result);
                });
            });
            // console.log(response);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async updateNameById(id, newName) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";
                connection.query(query, [newName, id], (err, result) => {
                    if (err)
                        reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            // console.log(response);
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = dbService;