const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const danceMoveSchema = new Schema({
    danceMoveName: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const danceMove = mongoose.model('danceMove', danceMoveSchema);

module.exports = danceMove;