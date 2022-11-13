const mongoose = require('mongoose');

async function prepareDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        throw error;
    }
}


module.exports = {
    prepareDatabase
}