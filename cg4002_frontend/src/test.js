<div>
    <p> You are on the Exercises List Component!!!!!!!!</p>
    <div class="text-center alert alert-primary">
        <h3>Current Move Prediction:</h3>
    </div>
    <div class="text-center container">
        <h1 >{`${this.state.danceMoveList[0]?this.state.danceMoveList[this.state.danceMoveList.length - 1]:'waiting for move'}`} </h1>
    </div>

    {/* POSITIONS DISPLAY */}
    <div class="text-center alert alert-primary">
        <h3>Positions:</h3>
    </div>
    <div class="text-center">
        <h1> parse the string bitch 123</h1>
    </div>

    {/* MOVES BREAKDOWN */}
    <div class="text-center alert alert-primary">
        <h3>Moves Breakdown</h3>
    </div>

    <div class="container">
        <div class="row text-center">
            <div class="col">
                <h3>User 1</h3>
            </div>

            <div class="text-center">
                {this.state.danceMoveList.map((name, index)=>{
                    return <p>
                        {index+1}. {name}
                    </p>
                })}
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
                <h4>User 1 data</h4>
            </div>
            <div class="col">
                <h4>User 2 data</h4>
            </div>
            <div class="col">
                <h4>User 3 data</h4>
            </div>
        </div>
    </div>
    </div>