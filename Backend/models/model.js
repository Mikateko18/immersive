const mongoose = require('mongoose');




const modelSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
});

module.exports = mongoose.model('Model', modelSchema);