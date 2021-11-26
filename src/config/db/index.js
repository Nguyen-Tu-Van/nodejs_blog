const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education');
        console.log('success');
    } catch (error) {
        console.log('error: ' + error);
    }
}

module.exports = { connect };
