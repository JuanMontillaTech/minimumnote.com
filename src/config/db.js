const sql = require('mssql');

const config = {
    user: 'sa',
    password: '830434Jr.',
    server: '44.213.223.109',  // Replace with your SQL Server hostname or IP
    database: 'note',
    options: {
        encrypt: true,  // Enable encryption
        trustServerCertificate: true,  // Bypass certificate validation
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL database');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed: ', err);
        throw err;
    });

module.exports = {
    sql,
    poolPromise,
};
