const { poolPromise } = require('../config/db');

class GenericRepository {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async findAll() {
        const pool = await poolPromise;
        try {
            const result = await pool.request().query(`SELECT * FROM ${this.tableName}`);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        const pool = await poolPromise;
        try {
            const result = await pool.request()
                .input('id', id)
                .query(`SELECT * FROM ${this.tableName} WHERE id = @id`);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        const pool = await poolPromise;
        try {
            const columns = Object.keys(data).join(',');
            const values = Object.values(data).map(value => `'${value}'`).join(',');
            const result = await pool.request()
                .query(`INSERT INTO ${this.tableName} (${columns}) VALUES (${values}); SELECT SCOPE_IDENTITY() AS newId;`);
            return result.recordset[0].newId;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        const pool = await poolPromise;
        try {
            const updateValues = Object.entries(data)
                .map(([key, value]) => `${key} = '${value}'`)
                .join(',');
            await pool.request()
                .input('id', id)
                .query(`UPDATE ${this.tableName} SET ${updateValues} WHERE id = @id`);
        } catch (error) {
            throw error;
        }
    }

    async remove(id) {
        const pool = await poolPromise;
        try {
            await pool.request()
                .input('id', id)
                .query(`DELETE FROM ${this.tableName} WHERE id = @id`);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GenericRepository;
