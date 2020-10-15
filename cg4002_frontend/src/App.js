import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';


class App extends React.Component{
  state={
    danceMoveList:[],
  }

componentDidMount = async () => {
  //socket.io connection
  const socket = io(`localhost:5000/api/server`);

  socket.on("newDanceMove", ({moveName})=>{
    alert(moveName);
    let tempDanceMoves = this.state.danceMoveList;
    tempDanceMoves.push(moveName);
    console.log(`${tempDanceMoves}`);
    this.setState({danceMoveList : tempDanceMoves});
  });
}

  render(){
    return (
      <div>
        <header>
        <div style={{display:"flex", paddingLeft: '16px', paddingRight: '16px', backgroundColor:'lightcoral'}}>
          <p>Powered by:</p>
          <img src={logo} className="App-logo" alt="logo" style={{width: '50px', height: '50px'}}/>
          <h1 style={{margin: 'auto'}}>CG4002 Dashboard</h1>
          <p>Login</p>
          </div>
        </header>
        <div style={{textAlign:'center'}}>
        <p>current prediction: </p>
          <h1 >{`${this.state.danceMoveList[0]?this.state.danceMoveList[this.state.danceMoveList.length - 1]:'waiting for move'}`} </h1>
        </div>
        <hr/>
        <div style={{textAlign: 'center'}}>
        {this.state.danceMoveList.map((name, index)=>{
            return <p>{index+1}. {name}</p>
        })}
        </div>
      </div>
    );
  }
}

export default App