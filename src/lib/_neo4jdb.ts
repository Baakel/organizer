import dotenv from "dotenv";
import neo4j from "neo4j-driver";

dotenv.config();

const uri = process.env.DB_URI;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;

export const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
export const session = driver.session();


