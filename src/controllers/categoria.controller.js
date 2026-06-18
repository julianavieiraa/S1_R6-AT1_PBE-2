import categoriaModel from "../models/categoria.model.js";

const categoriaController = {
    selecionaTodos: async (req, res) => {
        try {
            const result = await categoriaModel.selectAll();

            if (result.length === 0) {
                return res.status(200).json({ message: "A consulta não retornou resultados" });
            }
            return res.status(200).json({ data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },
    
    incluiCategoria: async (req, res) => {
        try {
            const { descricaoCategoria } = req.query
            const result = await categoriaModel.insert(descricaoCategoria);

            if (result.insertId === 0) {
                throw new Error('Erro ao incluir categoria');
            }

            res.status(201).json({ message: 'Categoria incluido com sucesso!!', data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },

deletaCategoria: async (req, res) => {
    try {
        const idCategoria = Number(req.params.idCategoria);

        if (!idCategoria || isNaN(idCategoria)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const result = await categoriaModel.delete(idCategoria);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }

        return res.status(200).json({ message: "Categoria excluída com sucesso!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro no servidor",errorMessage: error.message});
    }
},


    selectById: async (req, res) => {
        try {
            const { idCategoria } = req.query;
            const result = await categoriaModel.selectCategoria(idCategoria);
            if (result === 0) {
                return res.status(200).json({ message: 'Nenhuma categoria encontrada' });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    }
}

export default categoriaController;





