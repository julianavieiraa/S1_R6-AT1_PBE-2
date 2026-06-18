import connection from "../config/Database";

const categoriaModel = {
    insert: async (pDescricao) => {
        const sql = 'INSERT INTO categorias (descricaoCategoria) VALUES (?);';
        const values = [pDescricao];
        const [result] = await connection.execute(sql, values);
        return result;
    },

    selectAll: async () => {
        const sql = 'SELECT * FROM categorias';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    delete: async (pIdCategoria) => {
        const sql = 'DELETE FROM categorias WHERE idCategoria = ?;';
        const values = [pIdCategoria];
        const [result] = await connection.execute(sql, values);
        return result;
    },

    selectCategoria: async (pIdCategoria) => {
        const sql = 'SELECT * FROM categorias WHERE idCategoria = ?;';
        const values = [pIdCategoria];
        const [rows] = await connection.execute(sql, values);
        return rows;
    }
};

export default categoriaModel;