import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import Account from "./Account"; // Ensure this import matches your setup

/**
 * Transaction Model
 *
 * This class represents the "Transaction" model, which defines and interacts with the `transactions` table in the database.
 * Each transaction represents a transfer of funds between two accounts. It stores the amount transferred, the type of transaction,
 * and its current status.
 *
 * Fields:
 * - `id`: The unique identifier for each transaction (Primary Key). It is auto-incremented.
 * - `fromAccountId`: The ID of the account from which the funds are debited. It is a foreign key referencing the `Account` model.
 * - `toAccountId`: The ID of the account to which the funds are credited. It is a foreign key referencing the `Account` model.
 * - `amount`: The amount of funds transferred in the transaction, stored as a decimal with two decimal places.
 * - `transactionType`: A string representing the type of transaction (e.g., "transfer", "withdrawal", "deposit").
 * - `status`: The status of the transaction (e.g., "pending", "completed", "failed").
 *
 * Sequelize Configuration:
 * - The model uses the `sequelize` instance defined in the `../config/db` file.
 * - The model is associated with the `transactions` table in the database.
 * - Foreign keys are used to relate `fromAccountId` and `toAccountId` to the `Account` model's `id` field.
 *
 * Example Usage:
 * ```javascript
 * import Transaction from "./Transaction";
 *
 * // Creating a new transaction
 * const newTransaction = await Transaction.create({
 *   fromAccountId: 1,
 *   toAccountId: 2,
 *   amount: 500.00,
 *   transactionType: "transfer",
 *   status: "pending"
 * });
 *
 * // Fetching a transaction by primary key
 * const transaction = await Transaction.findByPk(1);
 * console.log(transaction.amount); // 500.00
 * ```
 *
 * Methods:
 * - Standard Sequelize methods such as `create`, `findByPk`, `findAll`, and others can be used to interact with the `transactions` table.
 *
 * Constraints:
 * - Both `fromAccountId` and `toAccountId` must reference valid account IDs from the `Account` model.
 * - The `amount` field cannot be null and must be a positive decimal value.
 * - The `transactionType` and `status` fields cannot be null and are expected to be strings.
 *
 * Relationships:
 * - The `Transaction` model is related to the `Account` model through the `fromAccountId` and `toAccountId` foreign keys.
 *
 * @class Transaction
 * @extends {Model}
 */
class Transaction extends Model {
    public id!: number;
    public fromAccountId!: number;
    public toAccountId!: number;
    public amount!: number;
    public transactionType!: string;
    public status!: string;
}

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fromAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Account,
            key: 'id',
        },
    },
    toAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Account,
            key: 'id',
        },
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "transactions",
    modelName: "Transaction",
});

export default Transaction;
