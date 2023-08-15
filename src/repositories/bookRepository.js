const { poolPromise } = require('../config/db');
const Book = require('../models/book');

class BookRepository {
    async findAll() {
        const pool = await poolPromise;
        try {
            const result = await pool.request().query('SELECT * FROM Book');
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
                .query('SELECT * FROM Book WHERE id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    async create(book) {
        const pool = await poolPromise;
        try {
            await pool.request()
                .input('name', book.name)
                .input('comment', book.comment)
                .input('subtitle', book.subtitle)
                .query('INSERT INTO Book ( name) VALUES ( @name)');
        } catch (error) {
            throw error;
        }
    }

    async update(id, book) {
        const pool = await poolPromise;

        try {
            await pool.request()
                .input('id', id)
                .input('name', book.name)
                .input('comment', book.comment)
                .input('subtitle', book.subtitle)
                .query('UPDATE Book SET name = @name ,comment = @comment , subtitle = @subtitle WHERE id = @id');
        } catch (error) {
            throw error;
        }
    }

    async remove(id) {
        const pool = await poolPromise;
        try {
            await pool.request()
                .input('id', id)
                .query('DELETE FROM Book WHERE id = @id');
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BookRepository;
