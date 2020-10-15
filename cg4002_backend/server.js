const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const router = require('express').Router();

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection  = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB has established connection');
});

app.use(cors());
app.use(express.json());

// const danceMoveRouter = require('./routes/danceMove');
// app.use('/dancemove', danceMoveRouter);

const server = app.listen(port, () =>{
    console.log(`server is running on port: ${port}`);
}
);

//------------------socket setup---------------
const io = socket(server);

io.of('api/server').on('connection', (socket) => {
    console.log(`a socket connection has been made! ${socket.id}`);
    
});



//Router set up

let danceMove = require('./models/dancemove.model');

router.route('/dancemove').get((req,res) => {
    danceMove.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ` + err));
});


app.post('/dancemove/add',(req,res) => {
    const tempName = req.body.data;
    const testing = tempName.split('|')[1];
    let danceMoveName = testing;
    console.log(testing);

    const newDanceMove = new danceMove({danceMoveName});
    console.log('this is working now');
    io.of('api/server').emit('newDanceMove', {moveName:danceMoveName});

    newDanceMove.save()
        .then(() => res.json('dance move added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.use('',router);

