import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Create a Sequelize instance to connect to the PostgreSQL database
const sequelize = new Sequelize(
    process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/mysterium",
    {
        dialect: "postgres",
        logging: false, // Disable logging to avoid cluttering the console
    }
);

/**
 * Tests the connection to the PostgreSQL database.
 * 
 * This function attempts to authenticate the Sequelize instance and logs
 * whether the connection was successful or failed.
 */
export async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Export the Sequelize instance for use in the rest of the application
export default sequelize;
