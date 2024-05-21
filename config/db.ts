import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db_uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/researchHub_db";

const db_connection = mongoose.connect(db_uri).then(() => {
    console.log('Conectado a la base de datos MongoDB');
  }).catch((error) => {
    console.error('Error al conectar a la base de datos MongoDB:', error);
  });

export { db_connection };
