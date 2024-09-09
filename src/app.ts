import express from "express";
import bodyParser from "body-parser";
import accountRoutes from "./routes/accountRoutes";

const app = express();
app.use(bodyParser.json());
app.use("/api", accountRoutes);

export default app;
