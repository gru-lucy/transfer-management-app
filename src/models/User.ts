import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

/**
 * User Model
 *
 * This class represents the "User" model, which is used to define and interact with the `users` table in the database.
 * Each user has an associated unique identifier (`id`), a name, and an email address. The email field must be unique.
 *
 * Fields:
 * - `id`: The unique identifier for each user (Primary Key). It is auto-incremented.
 * - `name`: The name of the user, stored as a string. It cannot be null.
 * - `email`: The email of the user, stored as a string. It cannot be null and must be unique.
 *
 * Sequelize Configuration:
 * - This model uses the `sequelize` instance defined in the `../config/db` file.
 * - The model is defined under the table name `users`.
 * - The `User` model inherits from Sequelize's `Model` class.
 *
 * Example Usage:
 * ```javascript
 * import User from "./User";
 *
 * // Creating a new user
 * const newUser = await User.create({ name: "Alice Johnson", email: "alice@example.com" });
 *
 * // Fetching a user by primary key
 * const user = await User.findByPk(1);
 * console.log(user.name); // "Alice Johnson"
 * ```
 *
 * Methods:
 * - Standard Sequelize methods such as `create`, `findByPk`, `findAll`, and others can be used to interact with the `users` table.
 *
 * Constraints:
 * - The `email` field must be unique, ensuring no duplicate emails exist.
 * - The `name` and `email` fields cannot be null.
 *
 * Relationships:
 * - This model can be related to other models (e.g., an account model) via foreign keys.
 *
 * @class User
 * @extends {Model}
 */
class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "users",
        modelName: "User",
    }
);

export default User;
