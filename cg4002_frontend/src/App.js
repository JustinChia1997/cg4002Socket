import React from 'react';
//import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import "bootstrap/dist/css/bootstrap.min.css"


class App extends React.Component{
  state={
    danceMoveList:[], //set danceMoveList as empty array
    positionsList:[],
    user1List:[],
    user2List:[],
    user3List:[],
  }

componentDidMount = async () => {
  // Initialize socket.io connection
  const socket = io(`localhost:5000/api/server`);

  //newDanceMove event; get "moveName" that is inserted;
  //updating the tempDanceMoves array
  socket.on("newDanceMove", ({moveName, positions, user1, user2, user3})=>{
    alert(moveName + " " + positions);
    let tempDanceMoves = this.state.danceMoveList;
    tempDanceMoves.push(moveName);

    let tempPositions = this.state.positionsList;
    tempPositions.push(positions);

    let tempUser1 = this.state.user1List;
    tempUser1.push(user1);
    
    let tempUser2 = this.state.user2List;
    tempUser2.push(user2);

    let tempUser3 = this.state.user3List;
    tempUser3.push(user3);
    
    console.log(`${tempDanceMoves}`);
    console.log(`${tempPositions}`);
    console.log(`${tempUser1}`);
    console.log(`${tempUser2}`);
    console.log(`${tempUser3}`);
    this.setState({danceMoveList : tempDanceMoves}); //updates the array
    this.setState({positionsList : tempPositions});
    this.setState({user1List : tempUser1});
    this.setState({user2List : tempUser2});
    this.setState({user3List : tempUser3});
  });
}


  render(){
    return (
      <div>
    <div class="text-center alert alert-primary">
        <h3>Current Move Prediction:</h3>
    </div>
    <div class="text-center container">
        <h1 >{`${this.state.danceMoveList[0] ? 
          this.state.danceMoveList[this.state.danceMoveList.length - 1] : 'waiting for move'}`} </h1>
    </div>

    {/* POSITIONS DISPLAY */}
    <div class="text-center alert alert-primary">
        <h3>Positions:</h3>
    </div>
    <div class="text-center">
    <h1 >{`${this.state.positionsList[0] ? 
          this.state.positionsList[this.state.positionsList.length - 1] : 'waiting for pos'}`} </h1>
    </div>

    {/* MOVES BREAKDOWN */}
    <div class="text-center alert alert-primary">
        <h3>Moves Record</h3>
    </div>

    <div class="container">
        <div class="row text-center">
            <div class="col">
                <h3>User 1</h3>
            </div>
            <div class="col">
                <h3>User 2</h3>
            </div>
            <div class="col">
                <h3>User 3</h3>
            </div>
        </div>
    </div>
        <div class="container">
          <div class="row text-center">
            <div class="col">
              <div class="text-center">
                {this.state.user1List.map((name, index) => {
                  return <p>
                    {index + 1}. {name}
                  </p>
                })}</div>
            </div>
            <div class="col">
              <div class="text-center">
                {this.state.user2List.map((name, index) => {
                  return <p>
                    {index + 1}. {name}
                  </p>
                })}</div>
            </div>
            <div class="col">
              <div class="text-center">
                {this.state.user3List.map((name, index) => {
                  return <p>
                    {index + 1}. {name}
                  </p>
                })}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App