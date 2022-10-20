import React, { Component } from "react";
import "../Hangman.css";
import { randomWords } from "./Words";
import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
  };
  constructor(props) {
    super(props);

    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomWords(),
    };
  }

  guessedWord = () => {
    return this.state.answer
      .split("")
      .map((letter) =>
        this.state.guessed.has(letter) ? (
          <p className="letter text-black">{letter}</p>
        ) : (
          <p className="dash">_</p>
        )
      );
  };

  handleGuess = (e) => {
    let letter = e.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  };

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(
      (letter) => (
        (
          <button
            key={letter}
            value={letter}
            onClick={this.handleGuess}
            className="btn btn-lg btn-primary m-2"
            disable={this.state.guessed.has(letter).toString()}
          >
            {letter}
          </button>
        )
      )
    );
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set(),
      answer: randomWords(),
    });
  };

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    let gameStat = this.generateButtons();
    const isWinner = this.guessedWord().join("") === this.state.answer;

    if (isWinner) {
      gameStat = <div className="won">You won!!!</div>;
    }

    if (gameOver) {
      gameStat = <div className="lost">You Lost!!!</div>;
    }

    return (
      <div className="Hangman container">
        <h1 className="text-center text-uppercase">Hangman</h1>
        <div className="float-right">
          Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}
        </div>
        <div className="text-center">
          <img
            src={this.props.images[this.state.mistake]}
            alt="hangman images"
          />
        </div>
        <div className="text-center">
          <p className="guess">Guess the color: </p>
          <p className="answer">
            {!gameOver ? this.state.guessedWord : this.state.answer}
          </p>
          <p>{gameStat}</p>
          <button className="btn btn-danger mb-2" onClick={this.resetButton}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
