const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');




const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: String,
    models: [{type: mongoose.Types.ObjectId, required: true, ref: 'Model'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);


