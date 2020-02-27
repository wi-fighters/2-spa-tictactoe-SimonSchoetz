import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import './styles/index.css';

// ==========================
// Components
// ==========================
class Square extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <button className="square" onClick={() => { this.props.playerMove(this.props.index) }}>
        {[...this.props.occupiedBy]}
      </button >
    );
  }
}

///////////////////////////////////////////
//              UPPER LEVEL              //
///////////////////////////////////////////
class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextPlayer: "X",
      squares: [{ i: 0, occupiedBy: "" },
      { i: 1, occupiedBy: "" },
      { i: 2, occupiedBy: "" },
      { i: 3, occupiedBy: "" },
      { i: 4, occupiedBy: "" },
      { i: 5, occupiedBy: "" },
      { i: 6, occupiedBy: "" },
      { i: 7, occupiedBy: "" },
      { i: 8, occupiedBy: "" }],
      winner: ""
    }
  }

  //onclick (index)
  //if occupiedBy = "" on index X  setState occupiedBy current player + then switch player

  playerMove = i => {
    const squares = this.state.squares
    const newState = squares.map(el => {
      if (el.i === i && el.occupiedBy === "") {
        el.occupiedBy = this.state.nextPlayer
        this.switchPlayer()
      }
      return el
    })
    this.setState({ squares: newState })
    //Winning conditions horizontal
    const winner = this.state.nextPlayer
    if ((squares[0].occupiedBy === squares[1].occupiedBy) && (squares[0].occupiedBy === squares[2].occupiedBy) && (squares[0].occupiedBy !== "")) {
      this.props.win(winner)
    }
    if ((squares[3].occupiedBy === squares[4].occupiedBy) && (squares[3].occupiedBy === squares[5].occupiedBy) && (squares[3].occupiedBy !== "")) {
      this.props.win(winner)
    }
    if ((squares[6].occupiedBy === squares[7].occupiedBy) && (squares[6].occupiedBy === squares[8].occupiedBy) && (squares[6].occupiedBy !== "")) {
      this.props.win(winner)
    }
    //Winning conditions vertical
    if ((squares[0].occupiedBy === squares[3].occupiedBy) && (squares[0].occupiedBy === squares[6].occupiedBy) && (squares[0].occupiedBy !== "")) {
      this.props.win(winner)
    }
    if ((squares[1].occupiedBy === squares[4].occupiedBy) && (squares[1].occupiedBy === squares[7].occupiedBy) && (squares[1].occupiedBy !== "")) {
      this.props.win(winner)
    }
    if ((squares[2].occupiedBy === squares[5].occupiedBy) && (squares[2].occupiedBy === squares[8].occupiedBy) && (squares[2].occupiedBy !== "")) {
      this.props.win(winner)
    }
    //Winning conditions diagonal
    if ((squares[0].occupiedBy === squares[4].occupiedBy) && (squares[0].occupiedBy === squares[8].occupiedBy) && (squares[0].occupiedBy !== "")) {
      this.props.win(winner)
    }
    if ((squares[2].occupiedBy === squares[4].occupiedBy) && (squares[2].occupiedBy === squares[6].occupiedBy) && (squares[2].occupiedBy !== "")) {
      this.props.win(winner)
    }

  }

  switchPlayer = () => {
    if (this.state.nextPlayer === "X") {
      this.setState({ nextPlayer: "0" })
    } else {
      this.setState({ nextPlayer: "X" })
    }
  }

  // win = winner => {
  //   if (this.state.winner === "") {
  //     this.setState({ winner: winner + " won the game!" })
  //   }
  // }

  renderSquare(i) {
    return (
      <Square index={i} playerMove={this.playerMove} occupiedBy={this.state.squares[i].occupiedBy} win={this.win} />

    );
  }


  render() {
    const status = "Next player: " + this.state.nextPlayer;

    return (
      <React.Fragment>
        <div className="status h2 text-center">{status}</div>
        <div className="board">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </React.Fragment>
    );
  }
}
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      winner: ""
    }

  }
  win = (winner) => {
    if (this.state.winner === "") {
      this.setState({ winner: winner + " won the game!" })
    }
  }

  render() {
    return (
      <article className="game container mt-5">
        <section className="row">
          <div className="col-sm-8 game-board">
            <Board win={this.win} />
          </div>
          <div className="col-sm-4 game-info">
            <p className="h2">{this.state.winner}</p>
            <ul className="nav nav-pills flex-column">
              {/* TODO */}
            </ul>
          </div>
        </section>
      </article>
    );
  }

}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
