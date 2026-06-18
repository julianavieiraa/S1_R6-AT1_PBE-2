import { Router } from "express";
import uploadImage from "../middlewares/uploadImage.middleware.js";
import produtoController from "../controllers/produto.controller.js";

const produtosRoutes = Router();

produtosRoutes.post('/produtos',uploadImage,produtoController.incluiRegistro);
produtosRoutes.get('/produtos', produtoController.selecionaTodos);
produtosRoutes.get('/produtos/:idProduto', produtoController.selectById);
produtosRoutes.delete('/produtos/:idProduto', produtoController.deletaProduto);

export default produtosRoutes;