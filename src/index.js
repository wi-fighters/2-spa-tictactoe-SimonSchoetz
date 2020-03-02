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
      <li><button onClick={() => { this.props.loadOldGame(this.props.index) }}>{this.props.game}</button></li>

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
      winConditions: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
        [0, 3, 6], [1, 4, 7], [3, 5, 8], //vertical
        [0, 4, 8], [2, 4, 6]], //diagonal
      currentGame: [],
      oldGameLoaded: false,
      oldGames: []
    }


  }

  playerMove = i => {
    if (!this.props.gameWon && !this.state.oldGameLoaded) {
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

      this.state.winConditions.map(condition => {
        const [a, b, c] = condition
        if ((squares[a].occupiedBy === squares[b].occupiedBy) && (squares[a].occupiedBy === squares[c].occupiedBy) && (squares[a].occupiedBy !== "")) {
          return this.props.win(this.state.nextPlayer)
        }
      })
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


  //Load an old game and store current one
  loadOldGame = i => {
    if (!this.state.oldGameLoaded) {
      this.setState({ currentGame: [...this.state.squares], oldGameLoaded: true })
    }
    this.setState({ squares: this.state.oldGames[i] })
  }
  //Load the current game
  loadCurrent = () => {
    this.setState({ squares: [...this.state.currentGame], oldGameLoaded: false })
  }

  reset() {

    //safe current game state to oldGames first before resetting
    this.setState({
      oldGames: [...this.state.oldGames, this.state.squares]
    })
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
}

///////////////////////////////////////////
//              Upper LEVEL              //
///////////////////////////////////////////
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "Starting player: X",
      newGame: "New Game",
      gameWon: false,
      winner: "",
      games: []
    }
    this.gameBoard = React.createRef()
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
    //If an old game is loaded, become a continue button and not make a fresh game
    if (this.gameBoard.current.state.oldGameLoaded) {
      this.setState({ newGame: "New Game" })
      this.gameBoard.current.loadCurrent()
      return
    }
    //Text on button
    if (this.state.winner === "") {
      this.setState({ games: [...this.state.games, "Draw"] })
    } else {
      this.setState({ games: [...this.state.games, this.state.winner + " won"] })
    }
    //reset in Game component
    this.setState({ message: "Starting player: X", gameWon: false, winner: "" })
    //reset in Board component
    this.gameBoard.current.reset()



  }
  //Call function in the Board component to load an old game
  loadOldGame = i => {
    this.gameBoard.current.loadOldGame(i)
    this.setState({ newGame: "Continue" })
  }


  render() {
    const gameList = this.state.games
    const listItems = gameList.map((el, i) => {
      return (<GameList loadOldGame={this.loadOldGame} index={i} game={el} />)
    })
    return (
      <article className="game container mt-5">
        <section className="row">
          <div className="col-sm-8 game-board">
            <Board ref={this.gameBoard} win={this.win} nextPlayer={this.nextPlayer} gameWon={this.state.gameWon} />
          </div>
          <div className="col-sm-4 game-info">
            <p className="h2">{this.state.message}</p>
            <ul className="nav nav-pills flex-column">
              <li>
                <button onClick={() => { this.newGame() }}>
                  {this.state.newGame}
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
