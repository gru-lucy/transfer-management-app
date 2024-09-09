import User from "../../models/User";

/**
 * Seeds the User table with predefined data.
 * 
 * @async
 * @function seedUsers
 * @returns {Promise<void>} Resolves when users are seeded successfully.
 * @throws {Error} Throws an error if seeding fails.
 */
const seedUsers = async () => {
    try {
        // Array of user objects to be inserted into the database
        const users = [
            { name: "Alice Johnson", email: "alice@example.com" },
            { name: "Bob Smith", email: "bob@example.com" },
            { name: "Carol White", email: "carol@example.com" },
            { name: "Dave Brown", email: "dave@example.com" },
            { name: "Eve Black", email: "eve@example.com" },
            { name: "Frank Clark", email: "frank@example.com" },
            { name: "Grace Hall", email: "grace@example.com" },
            { name: "Henry Lee", email: "henry@example.com" },
            { name: "Isabel Young", email: "isabel@example.com" },
            { name: "Jack King", email: "jack@example.com" }
        ];

        // Insert the user data into the User table
        await User.bulkCreate(users);
        console.log("Users have been seeded successfully.");
    } catch (error) {
        console.error("Failed to seed users:", error);
    }
};

export default seedUsers;
