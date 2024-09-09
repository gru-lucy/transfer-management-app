import sequelize from "../../config/db";
import seedUsers from "./users";
import seedAccounts from "./accounts";

/**
 * Seeds the database with initial data.
 * 
 * This function first synchronizes the database schema by forcing a re-sync. It then calls the
 * `seedUsers` function to populate the User table and the `seedAccounts` function to populate the
 * Account table based on existing users.
 * 
 * @async
 * @function seed
 * @returns {Promise<void>} Resolves when seeding is completed successfully.
 * @throws {Error} Throws an error if any part of the seeding process fails.
 */
export default async function seed() {
    try {
        // Synchronize the database schema
        await sequelize.sync({ force: true });

        // Seed the User table
        await seedUsers();

        // Seed the Account table
        await seedAccounts();

        console.log("Seeding completed successfully.");
    } catch (error) {
        console.error("Seeding failed:", error);  // Log error if seeding fails
    }
}
