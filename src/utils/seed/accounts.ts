import User from "../../models/User";
import Account from "../../models/Account";

/**
 * Seeds the Account table with data based on existing users.
 * 
 * This function fetches all users from the User table and creates an account record for each user.
 * The balance for each account is set to (index + 1) * 100, where index is the user's position in the list.
 * 
 * @async
 * @function seedData
 * @returns {Promise<void>} Resolves when accounts are seeded successfully.
 * @throws {Error} Throws an error if seeding fails.
 */
const seedData = async () => {
    try {
        // Fetch all users from the User table
        const users = await User.findAll();

        // Create account data for each user
        const accounts = users.map((user, index) => ({
            userId: user.id,
            balance: (index + 1) * 100  // Set balance based on user index
        }));

        // Insert the generated account data into the Account table
        await Account.bulkCreate(accounts);

        console.log("Accounts have been seeded successfully.");
    } catch (error) {
        console.error("Failed to seed data:", error);  // Log error if seeding fails
    }
};

export default seedData;
