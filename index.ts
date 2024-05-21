import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import './config/db';
import userRouter from './src/routes/userRoutes';
import categoryRouter from './src/routes/categoryRoutes';

dotenv.config();

const app = express();

app.use(cors());

// Configuración
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);


const PORT: number = parseInt(process.env.PORT || '3000');

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
