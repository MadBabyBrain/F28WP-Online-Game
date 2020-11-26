const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    score: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Score', scoreSchema);