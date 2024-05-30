import * as functions from "firebase-functions";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import categoryRouter from "./routes/categoryRoutes";

dotenv.config();

const app = express();

app.use(cors());

// Configuración
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Conexión a MongoDB establecida");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

// Rutas
app.use("/user", userRouter);
app.use("/category", categoryRouter);


export const api = functions.https.onRequest(app);
