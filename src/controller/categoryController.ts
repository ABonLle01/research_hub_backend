import { Request, Response } from 'express';
import { CategoryModel } from '../models/category';


// Insertar una nueva categoría
export async function newCategory(req: Request, res: Response) {
  const { name, parent, level, url_survey, url_img, description } = req.body;

  try {
    const newCategory = new CategoryModel({
      name, parent, level, url_survey, url_img, description
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error al insertar categoría:', error);
    res.status(500).json({ error: 'Error al insertar categoría' });
  }
}


// Mostrar todas las categorias
export async function showCategories(req: Request, res: Response) {
  try {
      const categories = await CategoryModel.find();
      res.json(categories);
  } catch (error) {
      console.error('Error al mostrar categorias:', error);
      res.status(500).json({ error: 'Error al mostrar categorias' });
  }
}


//Obtener las categorias por atributos
export async function getCategoriesByFilters(req: Request, res: Response) {
  const name = req.query.name;
  const parent = req.query.parent;
  const level = req.query.level;

  const filter: { name?: string; parent?: string; level?: number; } = {};

  if (typeof name === 'string') filter.name = name;
  if (typeof parent === 'string') filter.parent = parent;
  if (typeof level === 'string') filter.level = parseInt(level);

  try {
      const categories = await CategoryModel.find(filter);
      res.json(categories);
  } catch (error) {
      console.error('Error al mostrar categorias:', error);
      res.status(500).json({ error: 'Error al mostrar categorias' });
  }
}

//Obtener categorias por nombre
export async function getCategoriesByName(req: Request, res: Response) {
  const name = req.params.name;

  try {
    const categories = await CategoryModel.find({ name: name });
    res.json(categories);
  } catch (error) {
    console.error('Error al mostrar categorías por nombre:', error);
    res.status(500).json({ error: 'Error al mostrar categorías por nombre' });
  }
}


//Obtener categorias por padre
export async function getCategoriesByParent(req: Request, res: Response) {
  const parent = req.params.parent;

  try {
    const categories = await CategoryModel.find({ parent: parent });
    res.json(categories);
  } catch (error) {
    console.error('Error al mostrar categorías por nombre:', error);
    res.status(500).json({ error: 'Error al mostrar categorías por nombre' });
  }
}

//Obtener categorias por nivel
export async function getCategoriesByLevel(req: Request, res: Response) {
  const level = req.params.level;

  try {
    const categories = await CategoryModel.find({ level: level });
    res.json(categories);
  } catch (error) {
    console.error('Error al mostrar categorías por nombre:', error);
    res.status(500).json({ error: 'Error al mostrar categorías por nombre' });
  }
}
