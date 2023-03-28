const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log('DB connected');
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar DB')
    }
}

module.exports = {
    dbConnection
}