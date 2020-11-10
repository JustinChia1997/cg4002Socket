const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const danceMoveSchema = new Schema({
    danceMoveName: {
        type: String,
        required: true,
    },

    position: {
        type: String,
        require: true,
    },

    user1:{
        type: String,
        require: true,
    },
    user2:{
        type: String,
        require: true,
    },
    user3:{
        type: String,
        require: true,
    }

}, {
    timestamps: true,
});

const danceMove = mongoose.model('danceMove', danceMoveSchema);

module.exports = danceMove;