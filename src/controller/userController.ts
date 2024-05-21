import { Request, Response } from 'express';
import { UsuarioModel, EncuestaRealizadaModel } from '../models/user';
import { CategoryModel } from '../models/category';
import bcrypt from 'bcryptjs'; 

// Crear un nuevo usuario
export async function crearUsuario(req: Request, res: Response) {
  const { name, surnames, genre, email, password} = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    
    const nuevoUsuario = new UsuarioModel({
      name,
      surnames,
      genre,
      email,
      password:hashedPass,
      fecha_creacion: new Date(),
      encuestas_realizadas: []
    });
    console.log(nuevoUsuario)
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ mensaje: 'Error al crear usuario' });
  }
}

// Agregar una encuesta realizada a un usuario
export async function agregarEncuestaById(req: Request, res: Response) {
  let json:any;
  try {
    const usuario = await UsuarioModel.findById(req.params.id_user);
    if (!usuario) json = res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const category = await CategoryModel.findById(req.params.id_category);
    if (!category) json =  res.status(404).json({ mensaje: 'Categoria no encontrada' });
    else{

      const encuestaExistente = usuario?.surveys.find(
        encuesta => encuesta.name === category.name && encuesta.parent === category.parent
      );
  
      if (encuestaExistente) {
        return res.status(400).json({ mensaje: 'El usuario ya ha realizado esta encuesta' });
      }else {
        const nuevaEncuesta = new EncuestaRealizadaModel({
          id: category._id,
          name: category.name || '',
          parent: category.parent || '',
          reward: category.reward || '',
          fecha_añadido: new Date()
        });
  
        usuario?.surveys.push(nuevaEncuesta);
        await usuario?.save();
  
        json = res.status(200).json({ mensaje: 'Encuesta agregada correctamente' });
      }
    }

  } catch (error) {
    console.error('Error al agregar encuesta:', error);
    json =  res.status(500).json({ mensaje: 'Error al agregar encuesta' });
  }
  return json;
}


//Obtener todos los usuarios
export async function getAllUsers(req: Request, res: Response) {
  try {
      const users = await UsuarioModel.find();
      res.json(users);
  } catch (error) {
      console.error('Error al mostrar usuarios:', error);
      res.status(500).json({ error: 'Error al mostrar usuarios' });
  }
}

// Obtener un usuario según su email y contraseña
export async function getUserByEmail(req: Request, res: Response) {
  const email = req.query.email as string;
  const password = req.query.password as string;
  let json:any;
  try {

    if (!email || !password) json =  res.status(400).json({ error: 'Los parámetros de email y contraseña son requeridos' });

    const user = await UsuarioModel.findOne({ email: email });
    if (!user) json =  res.status(404).json({ error: 'El usuario no existe' });
    else{
      if (!user.password) {
        json =  res.status(500).json({ error: 'El usuario no tiene contraseña almacenada' });
      }
      console.log("password: "+password)
      console.log("user.pass: "+user.password)

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch)

      if(isMatch){
        res.json(user);
      }else{
        json =  res.status(401).json({ error: 'La contraseña proporcionada es incorrecta' });
      }
    }

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    json =  res.status(500).json({ error: 'Error al obtener usuario' });
  }
  return json;
}

