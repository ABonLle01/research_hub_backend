import express from "express";
import {showCategories, getCategoriesByFilters, getCategoriesByLevel, getCategoriesByName, getCategoriesByParent, newCategory} from "../controller/categoryController";

const categoryRouter = express.Router();

categoryRouter.post("/new", newCategory);

// Ruta para mostrar todas las categorias
categoryRouter.get("/all", showCategories);

// Mostrar categorias por filtros
categoryRouter.get("/filtered-categories", getCategoriesByFilters);

categoryRouter.get("/filtered-categories/name/:name", getCategoriesByName);
categoryRouter.get("/filtered-categories/parent/:parent", getCategoriesByParent);
categoryRouter.get("/filtered-categories/level/:level", getCategoriesByLevel);


export default categoryRouter;
