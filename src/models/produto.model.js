import connection from '../config/Database';

const produtoModel = {

    selectAll: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await connection.query(sql);
        return rows;
    },

    insert: async (pProduto) => {
        const sql = 'INSERT INTO produtos (nomeProduto, valorProduto, idCategoria, vinculoImagem) VALUES (?, ?, ?, ?);';
        const values = [
            pProduto.nomeProduto,
            pProduto.valorProduto,
            pProduto.idCategoria,
            pProduto.vinculoImagem
        ];

        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    update: async (pIdProduto, pProduto) => {
        const sql = 'UPDATE produtos SET nomeProduto = ?, valorProduto = ? WHERE idProduto = ?;';
        const values = [
            pProduto.nomeProduto,
            pProduto.valorProduto,
            pIdProduto
        ];

        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    delete: async (pIdProduto) => {
        const sql = 'DELETE FROM produtos WHERE idProduto = ?;'
        const values = [pIdProduto]
        const [rows] = await connection.execute(sql, values);
        return rows
    },
    selectById: async (pIdProduto) => {
        const sql = "SELECT * FROM produtos WHERE idProduto = ?";
        const values = [pIdProduto];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },
}

export default produtoModel;