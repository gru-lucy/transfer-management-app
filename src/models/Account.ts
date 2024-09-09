import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./User";

/**
 * Account Model
 *
 * This class represents the "Account" model, which is used to define and interact with the `accounts` table in the database.
 * Each account is linked to a specific user via a foreign key (`userId`), and it maintains information about the user's balance.
 *
 * Fields:
 * - `id`: The unique identifier for each account (Primary Key).
 * - `balance`: The balance of the account, stored as a decimal value with two decimal places. It has a default value of 0.00.
 * - `userId`: A foreign key that references the `id` field from the `User` model, establishing a relationship between accounts and users.
 *
 * Sequelize Configuration:
 * - This model uses the `sequelize` instance defined in the `../config/db` file.
 * - The model is defined under the table name `accounts`.
 * - The `Account` model inherits from Sequelize's `Model` class.
 *
 * Example Usage:
 * ```javascript
 * import Account from "./Account";
 *
 * // Creating a new account for a user
 * const newAccount = await Account.create({ balance: 100.00, userId: 1 });
 *
 * // Fetching an account
 * const account = await Account.findByPk(1);
 * console.log(account.balance); // 100.00
 * ```
 *
 * Relationships:
 * - Each account is associated with a single user, as defined by the foreign key `userId` that references the `id` field of the `User` model.
 *
 * Methods:
 * - Standard Sequelize methods such as `create`, `findByPk`, `findAll`, and others can be used to interact with the `accounts` table.
 *
 * Constraints:
 * - Foreign Key Constraint: `userId` must reference a valid `id` from the `users` table.
 * - The balance cannot be null and is initialized to 0.00 by default.
 *
 * @class Account
 * @extends {Model}
 */
class Account extends Model {
    public id!: number;
    public balance!: number;
}

Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: "accounts",
        modelName: "Account",
    }
);

export default Account;
