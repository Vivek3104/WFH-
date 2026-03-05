import mysql from 'mysql2/promise';
import 'dotenv/config';

async function createDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'wfh_db'}\`;`);
    console.log(`Database ${process.env.DB_NAME || 'wfh_db'} created or already exists.`);
    await connection.end();
}

createDatabase().catch(console.error);
