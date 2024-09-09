import { Transaction as SequelizeTransaction } from "sequelize";
import sequelize from "../config/db";
import Account from "../models/Account";
import Transaction from "../models/Transaction";

/**
 * Transfers funds between two accounts and handles transaction logging.
 *
 * @param fromId - ID of the user initiating the transfer.
 * @param toId - ID of the user receiving the transfer.
 * @param amount - The amount to be transferred.
 * @param credit - A boolean flag indicating whether the transaction is a credit (true) or debit (false).
 * @throws Error if any issues occur during the transfer (e.g., insufficient balance, account not found).
 */
export async function transferService(fromId: number, toId: number, amount: number, credit: boolean) {
    return sequelize.transaction(async (transaction: SequelizeTransaction) => {
        const fromAccount = await Account.findOne({ where: { userId: fromId }, transaction });
        const toAccount = await Account.findOne({ where: { userId: toId }, transaction });

        if (!fromAccount || !toAccount) {
            await Transaction.create({
                fromAccountId: fromId,
                toAccountId: toId,
                amount,
                transactionType: credit ? 'credit' : 'debit',
                status: 'failed',
            }, { transaction });
            throw new Error("One or both accounts not found or you do not have permission to access them.");
        }

        try {
            if (credit) {
                if (fromAccount.balance < amount) {
                    throw new Error("Insufficient balance");
                }
                fromAccount.balance -= amount;
                toAccount.balance += amount;
            } else {
                if (toAccount.balance < amount) {
                    throw new Error("Insufficient balance");
                }
                toAccount.balance -= amount;
                fromAccount.balance += amount;
            }

            await fromAccount.save({ transaction });
            await toAccount.save({ transaction });

            await Transaction.create({
                fromAccountId: fromId,
                toAccountId: toId,
                amount,
                transactionType: credit ? 'credit' : 'debit',
                status: 'success',
            }, { transaction });
        } catch (error) {
            await Transaction.create({
                fromAccountId: fromId,
                toAccountId: toId,
                amount,
                transactionType: credit ? 'credit' : 'debit',
                status: 'failed',
            }, { transaction });
            throw error; // Re-throw error to ensure transaction is rolled back
        }
    });
}

/**
 * Retrieves the balance of an account by its ID.
 *
 * @param userId - The ID of the account to retrieve the balance for.
 * @returns The balance of the account.
 * @throws Error if the account is not found.
 */
export async function getBalanceService(userId: number) {
    const account = await Account.findOne({ where: { userId } });
    if (!account) {
        throw new Error("Account not found");
    }
    return account.balance;
}
