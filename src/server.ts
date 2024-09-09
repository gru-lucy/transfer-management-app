import app from "./app";
import dotenv from "dotenv";
import { testDatabaseConnection } from "./config/db";
import seed from "./utils/seed";

dotenv.config();

const PORT = process.env.PORT || 3000;

testDatabaseConnection();
seed();
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
