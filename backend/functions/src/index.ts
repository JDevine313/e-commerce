import * as functions from "firebase-functions";
import ProductRouter from "./routes/productRouter";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", ProductRouter);
export const api = functions.https.onRequest(app);
