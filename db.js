import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../../.env")
});

const { Pool } = pg;

const pool = new Pool({
    user: String(process.env.DB_USER),
    host: String(process.env.DB_HOST),
    database: String(process.env.DB_NAME),
    password: String(process.env.DB_PASSWORD),
    port: Number(process.env.DB_PORT)
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log("PostgreSQL Connected");
    } catch (error) {
        console.log("Database Error:", error.message);
    }
};

export default connectDB;
export { pool };