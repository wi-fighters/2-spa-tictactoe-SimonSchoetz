import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import './styles/index.css';

// ==========================
// Components
// ==========================

///////////////////////////////////////////
//            Square Component           //
///////////////////////////////////////////
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
//          List Item Component          //
///////////////////////////////////////////


class GameList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  //Shows button with status of the last game
  render() {
    return (
      <li><button>{this.props.game}</button></li>

    )
  }
}


///////////////////////////////////////////
//         CHILD OF class GAME           //
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
      oldGames: []
    }


  }

  playerMove = i => {
    if (!this.props.gameWon) {
      const squares = this.state.squares
      //If square matches index is empty, write player name into occupiedBy and switch player
      // -> prevents actions by clicking on already occupied field
      const newState = squares.map(el => {
        if (el.i === i && el.occupiedBy === "") {
          el.occupiedBy = this.state.nextPlayer
          this.switchPlayer()
        }
        return el
      })
      //update the squares array
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
  }

  switchPlayer = () => {
    if (this.state.nextPlayer === "X") {
      this.setState({ nextPlayer: "0" })
      this.props.nextPlayer("O")
    } else {
      this.setState({ nextPlayer: "X" })
      this.props.nextPlayer("X")
    }
  }


  renderSquare(i) {
    return (
      <Square index={i} playerMove={this.playerMove} occupiedBy={this.state.squares[i].occupiedBy} win={this.win} />

    );
  }


  render() {

    return (
      <React.Fragment>
        <div className="status h2 text-center">{/*to do dunno*/}</div>
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

  reset() {

    //safe current game state to oldGames first before resetting
    // this.setState({
    //   oldGames: [...this.state.oldGames, this.state.squares]
    // })
    //reset Game template
    this.setState({
      nextPlayer: "X",
      squares: [{ i: 0, occupiedBy: "" },
      { i: 1, occupiedBy: "" },
      { i: 2, occupiedBy: "" },
      { i: 3, occupiedBy: "" },
      { i: 4, occupiedBy: "" },
      { i: 5, occupiedBy: "" },
      { i: 6, occupiedBy: "" },
      { i: 7, occupiedBy: "" },
      { i: 8, occupiedBy: "" }]
    })
    console.log(this.state.oldGames)
  }
}

///////////////////////////////////////////
//              Upper LEVEL              //
///////////////////////////////////////////
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "Starting player: X",
      gameWon: false,
      winner: "",
      games: []
    }
    this.resetGame = React.createRef()

  }

  nextPlayer = (player) => {
    this.setState({ message: "Next player: " + player })

  }

  win = (winner) => {
    this.setState({ winner: winner })
    this.setState({ message: winner + " won the game!" })
    this.setState({ gameWon: true })
  }

  newGame = () => {
    //Text on button
    if (this.state.winner === "") {
      this.setState({ games: [...this.state.games, "Draw"] })
    } else {
      this.setState({ games: [...this.state.games, this.state.winner + " won"] })
    }
    //reset in Game component
    this.setState({ message: "Starting player: X", winner: "" })
    //reset in Board component
    this.resetGame.current.reset()

    //TODO:
    //somehow safe Board state
    //call reset for Board state


  }


  render() {
    const gameList = this.state.games
    const listItems = gameList.map((el, i) => {
      return (<GameList index={i} game={el} />)
    })
    return (
      <article className="game container mt-5">
        <section className="row">
          <div className="col-sm-8 game-board">
            <Board ref={this.resetGame} win={this.win} nextPlayer={this.nextPlayer} gameWon={this.state.gameWon} />
          </div>
          <div className="col-sm-4 game-info">
            <p className="h2">{this.state.message}</p>
            <ul className="nav nav-pills flex-column">
              <li>
                <button onClick={() => { this.newGame() }}>
                  New Game
                </button>
              </li>
              {listItems}
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
