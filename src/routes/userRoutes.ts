import express from 'express';
import { crearUsuario, agregarEncuestaById, getAllUsers, getUserByEmail  } from '../controller/userController';

const userRouter = express.Router();

//Ruta para crear un nuevo usuario
userRouter.post('/new', crearUsuario);

//Ruta para agregar una nueva encuesta realizada por un usuario existente
userRouter.post('/:id_user/encuestas/:id_category', agregarEncuestaById);

//Ruta para obtener todos los usuarios
userRouter.get('/all', getAllUsers);

//Ruta para obtener un usuario por email y contraseña
userRouter.get('/login', getUserByEmail);

export default userRouter;
