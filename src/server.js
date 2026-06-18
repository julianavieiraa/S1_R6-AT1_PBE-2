import express from 'express';
import produtoRoutes from './routes/produto.routes.js';
import categoriaRoutes from './routes/categoria.routes.js'
import 'dotenv/config.js';
import path from 'path';
import { initializeDatabase } from './configs/Database.js';

const app = express();
app.use('/', produtoRoutes);
app.use('/', categoriaRoutes);


app.use('/images', express.static(path.resolve('uploads/images')));


initializeDatabase().then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
    });
}).catch(err => {
    console.error("Erro ao inicializar o banco de dados:", err);
});

