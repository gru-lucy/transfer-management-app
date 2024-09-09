import { Router } from "express";
import { transferCredit, transferDebit, getAccountBalance } from "../controllers/accountController";

// Create a new Router instance
const router = Router();

// Route to handle credit transfers
router.post("/transfer/credit", transferCredit);

// Route to handle debit transfers
router.post("/transfer/debit", transferDebit);

// Route to get account balance by userId
router.get("/balance/:userId", getAccountBalance);

// Export the router
export default router;
