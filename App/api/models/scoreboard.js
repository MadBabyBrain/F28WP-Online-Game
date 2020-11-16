const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId
    // TODO : Add scoreboard retrieval inforomation
});

module.exports = mongoose.model('Score', scoreSchema);