import mysql from 'mysql';

export const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: '',
    database: process.env.DBNAME
});
