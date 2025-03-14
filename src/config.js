const mysql = require("mysql2/promise");
const dbConnection = async (env = process.env.DEFAULT_ENV || "DEV") => {
    const credentials = {
        host: 'localhost', 
        user: 'root',      
        password: 'Hass@8751',  
        database: process.env[`DB_${env}_NAME`]  
    };
    
    console.log('credentials', credentials);
    return mysql.createPool(credentials);
};


module.exports = dbConnection;




