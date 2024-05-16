import express from "express";
import mongooseConnection from "./DB/connectionMongoose";
import cors from "cors";
import index from "./routes/index";
import customerRoutes from "./routes/CustomerRoute";


const app = express();

mongooseConnection();

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "100mb" }));

app.use("/", index);
app.use("/customer", customerRoutes);

export default app;
