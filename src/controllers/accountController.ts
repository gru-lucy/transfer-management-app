import { Request, Response } from "express";
import { transferService, getBalanceService } from "../services/accountService";

/**
 * Handles credit transfer between two accounts.
 * 
 * @param req - Express request object containing fromId, toId, and amount in the body.
 * @param res - Express response object.
 */
export async function transferCredit(req: Request, res: Response) {
    const { fromId, toId, amount } = req.body;
    try {
        await transferService(fromId, toId, parseFloat(amount), true);
        res.status(200).send({ message: "Transfer completed successfully" });
    } catch (error) {
        res.status(500).send({ error });
    }
}

/**
 * Handles debit transfer between two accounts.
 * 
 * @param req - Express request object containing fromId, toId, and amount in the body.
 * @param res - Express response object.
 */
export async function transferDebit(req: Request, res: Response) {
    const { fromId, toId, amount } = req.body;
    try {
        await transferService(toId, fromId, parseFloat(amount), false);
        res.status(200).send({ message: "Transfer completed successfully" });
    } catch (error) {
        res.status(500).send({ error });
    }
}

/**
 * Retrieves the account balance for a specific user.
 * 
 * @param req - Express request object with userId in the params.
 * @param res - Express response object.
 */
export async function getAccountBalance(req: Request, res: Response) {
    const { userId } = req.params;
    try {
        const balance = await getBalanceService(parseInt(userId));
        res.status(200).send({ balance });
    } catch (error) {
        res.status(500).send({ error });
    }
}
