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
      player: "X"
    }
  }
  render() {
    return (
      <button name={this.props.index} className="square" onClick={() => { this.props.switchPlayer() }} >
        {this.state.player}
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
      nextPlayer: "X"
    }
  }



  switchPlayer = () => {
    if (this.state.nextPlayer === "X") {
      this.setState({ nextPlayer: "0" })
    } else {
      this.setState({ nextPlayer: "X" })
    }
  }





  renderSquare(i) {
    return <Square index={i} switchPlayer={this.switchPlayer} />;
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
  render() {
    return (
      <article className="game container mt-5">
        <section className="row">
          <div className="col-sm-8 game-board">
            <Board />
          </div>
          <div className="col-sm-4 game-info">
            <p className="h2">{/* status */}</p>
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
