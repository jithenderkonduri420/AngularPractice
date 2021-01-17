const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    hash: { type: String, required: true },
    role: { type: String, default: 'user' },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
