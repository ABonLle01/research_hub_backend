import * as functions from "firebase-functions";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import categoryRouter from "./routes/categoryRoutes";

dotenv.config();

const app = express();

const corsOptions = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  origin: true
};

app.use(cors(corsOptions));

// Configuración
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Rutas
app.use("/user", userRouter);
app.use("/category", categoryRouter);


export const api = functions.https.onRequest(app);
