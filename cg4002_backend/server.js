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
});

//------------------socket setup---------------
const io = socket(server);

io.of('api/server').on('connection', (socket) => {
    console.log(`a socket connection has been made! ${socket.id}`);
    
});



/* 
 * Router set up
 */

let danceMove = require('./models/dancemove.model');

router.route('/dancemove').get((req,res) => {
    danceMove.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ` + err));
});

/* 
 * Add New Move
 */
app.post('/dancemove/add',(req,res) => {
    const tempMove = req.body.data; //gets new dance move "1 2 3|move|0.12|hair rocket hair"
    console.log(tempMove);
    const splitNewMove = tempMove.split('|');

    const testPositions = splitNewMove[0].split('#')[1]; //gets positions
    const testMoveName = splitNewMove[1]; //gets dance move name
    
    //gets indiv user's moves
    const userMoveName = splitNewMove[3].split(" ");
    const userMove_1 = userMoveName[0];
    const userMove_2 = userMoveName[1];
    const userMove_3 = userMoveName[2];

    let danceMoveName = testMoveName;
    //console.log(testMoveName);
    let positions = testPositions;
    console.log(userMove_1 + " " + userMove_2 + " " + userMove_3);

    const newDanceMove = new danceMove({
        danceMoveName,
        positions,
        userMove_1,
        userMove_2,
        userMove_3,
    });
    console.log('this is working now');
    io.of('api/server').emit('newDanceMove', {
        moveName: danceMoveName,
        positions: positions,
        user1: userMove_1,
        user2: userMove_2,
        user3: userMove_3,
    });

    newDanceMove.save()
        .then(() => res.json('dance move added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.use('',router);

