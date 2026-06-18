import produtoModel from "../models/produto.model.js";

const produtoController = {
    incluiRegistro: async (req, res) => {
        try {
            const { nomeProduto, valorProduto, descricaoCategoria, idCategoria } = req.body;

            if (!nomeProduto || !valorProduto || !descricaoCategoria || !idCategoria) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" });
            }

            if (!req.file) {
                return res.status(400).json({ message: "Imagem do produto é obrigatória" });
            }

            if (isNaN(Number(idCategoria)) || isNaN(Number(valorProduto))) {
                return res.status(400).json({ message: "Digite apenas números" });
            }

            const imagemProduto = req.file.filename;

            const resultado = await produtoModel.insert({
                nomeProduto,
                valorProduto,
                idCategoria,
                vinculoImagem: imagemProduto
            });

            if (!resultado.insertId) {
                return res.status(400).json({ message: "Erro ao cadastrar produto" });
            }

            return res.status(201).json({ message: "Produto cadastrado com sucesso", idProduto: resultado.insertId });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
        }
    },


    selectById: async (req, res) => {
        try {
            const { idProduto } = req.params;
            if (!Number.isInteger(Number(idProduto))) {
                return res.status(400).json({ message: "ID do produto deve ser numérico" });
            }

            const result = await produtoModel.selectById(idProduto);
            if (result.length === 0) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
        }
    },

    selecionaTodos: async (req, res) => {
        try {
            const { idProduto } = req.query;

            if (idProduto) {
                const resultado = await produtoModel.selectById(idProduto);
                console.log(resultadoProduto);
                return res.status(200).json({ data: resultado })
            }
            const resultado = await produtoModel.selectAll();

            if (!resultado || resultado.length === 0) {
                return res.status(200).json({ message: 'A consulta não retornou resultados' });
            }

            return res.status(200).json({ data: resultado });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    deletaProduto: async (req, res) => {
        try {

            const idProduto = Number(req.params.idProduto);
            if (!idProduto || !Number.isInteger(idProduto)) {
                return res.status(400).json({ message: 'Forneça um identificador válido!' });
            }

            const produtoSelecionado = await produtoModel.selectById(idProduto);
            if (produtoSelecionado.length === 0) {
                return res.status(200).json({ message: 'Produto não localizado na base de dados' });
            }

            const result = await produtoModel.delete(idProduto);
            if (result.affectedRows === 0) {
                return res.status(200).json({ message: 'Ocorreu um erro ao excluir o produto' });

            }

            res.status(200).json({ message: 'Produto excluido com sucesso!' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessege: error.message });
        }
    }
}


export default produtoController;