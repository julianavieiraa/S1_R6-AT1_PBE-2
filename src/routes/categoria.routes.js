import { Router } from "express";
import categoriaController from "../controllers/categoria.controller.js";

const categoriaRoutes = Router();

categoriaRoutes.post('/categorias', categoriaController.incluiCategoria);
categoriaRoutes.get('/categorias', categoriaController.selecionaTodos);
categoriaRoutes.delete('/categorias/:idCategoria', categoriaController.deletaCategoria);

export default categoriaRoutes;
