import mysql from "mysql2/promise";

export async function getDatabaseInstance(): Promise<mysql.Connection> {
  const databaseInstance = await mysql.createConnection({
    host: process.env.DB_DEV_HOST!,
    user: process.env.DB_DEV_USER!,
    port: parseInt(process.env.DB_DEV_PORT!),
    password: process.env.DB_DEV_PASSWORD!,
    database: process.env.DB_NAME!,
  });

  return databaseInstance;
}
