import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import Timer from './Timer';
import { colors, totals } from './Constants';
import { wordList } from './words';

export default class Codenames extends Component {
    componentWillMount() {
        this.setState({
            gameStarted: false,
            words: this.getWords(),
            colorMap: this.getColorMap(totals.firstColor),
            isRedTurn: true,
            isBlueTurn: false,
            isGameOver: false,
            redTotal: totals.firstColor,
            redRemaining: totals.firstColor,
            blueTotal: totals.secondColor,
            blueRemaining: totals.secondColor,
            codeMasterView: false,
            gameCount: 0,
            clueGiven: false,
            playWithTimer: this.props.playWithTimer,
            planningTime: this.props.planningTime,
            guessingTime: this.props.guessingTime
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playWithTimer !== this.props.playWithTimer || nextProps.planningTime !== this.props.planningTime || nextProps.guessingTime !== this.props.guessingTime) {
            this.setState({ playWithTimer: nextProps.playWithTimer, planningTime: nextProps.planningTime, guessingTime: nextProps.guessingTime });
        }
    }

    render () {
        const oddGameCount = (this.state.gameCount % 2) > 0;
        return (
            <div>
                <div className='section-left'>
                    <div>
                        <table className='top-row-table'>
                            <tbody>
                                <tr className='top-row'>
                                    <td className='top-row-left'>
                                        <input
                                            type='button'
                                            className='button cell'
                                            disabled={this.state.clueGiven}
                                            onClick={() => this.setState({ clueGiven: true })}
                                            value='Clue Given' />
                                    </td>
                                    <td className='top-row-middle'>
                                        <div className='turn'>
                                            <span
                                                className='red-text'
                                                hidden={this.state.isGameOver || this.state.isBlueTurn}>
                                                    {`Red ${this.state.clueGiven ? 'Players\'' : 'Codemaster\'s'} turn`}
                                            </span>
                                            <span
                                                className='blue-text'
                                                hidden={this.state.isGameOver || this.state.isRedTurn}>
                                                    {`Blue ${this.state.clueGiven ? 'Players\'' : 'Codemaster\'s'} turn`}
                                            </span>
                                            <span
                                                className={`${this.getWinner().toLowerCase()}-text`}
                                                hidden={!this.state.isGameOver}>
                                                    {`${this.getWinner()} Wins!`}
                                            </span>
                                        </div>

                                        <div className='words-remaining'>
                                            <div className={`red-text ${oddGameCount ? 'hidden' : ''}`}>{`Words remaining: ${this.state.redRemaining}/${this.state.redTotal}`}</div>
                                            <div className='blue-text'>{`Words remaining: ${this.state.blueRemaining}/${this.state.blueTotal}`}</div>
                                            <div className={`red-text ${!oddGameCount ? 'hidden' : ''}`}>{`Words remaining: ${this.state.redRemaining}/${this.state.redTotal}`}</div>
                                        </div>
                                    </td>
                                    <td className='top-row-right'>
                                        <input
                                            type='button'
                                            className='button cell'
                                            disabled={!this.state.clueGiven}
                                            onClick={() => this.changeTurn()}
                                            value='End Turn' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='board'>
                        <Board
                            gameCount={this.state.gameCount}
                            words={this.state.words}
                            colorMap={this.state.colorMap}
                            isBlueTurn={this.state.isBlueTurn}
                            isRedTurn={this.state.isRedTurn}
                            codeMasterView={this.state.codeMasterView}
                            isGuessing={this.state.clueGiven}
                            turnContinue={() => this.continueTurn()}
                            turnChanged={color => this.changeTurn(color)}
                            gameOver={() => this.setState({ isGameOver: true, gameStarted: false })} />
                    </div>
                    
                    <div>
                        <input
                            type='button'
                            className={`button ${this.state.codeMasterView ? 'codemaster-view-button' : ''}`}
                            onClick={() => this.setState({ codeMasterView: !this.state.codeMasterView })}
                            value='Code Master View' />
                    </div>
                    <div>
                        <input
                            type='button'
                            className='button'
                            onClick={() => (this.state.isGameOver || window.confirm('Are you sure you want to start a new game?'))
                                && this.newGame()}
                            value='Next Game' />
                    </div>
                </div>
                {
                    this.state.playWithTimer &&
                    <div className='section-right'>
                        <br /><br />
                        <input
                            type='button'
                            className='button'
                            disabled={this.state.gameStarted}
                            onClick={() => this.setState({ gameStarted: true })}
                            value='Start Game' />
                        <br /><br />

                        <Timer
                            gameStarted={this.state.gameStarted}
                            clueGiven={this.state.clueGiven}
                            codeMasterSecondsRem={this.state.planningTime}
                            guessingSecondsRem={this.state.guessingTime}
                            timeUp={() => {
                                if (this.state.clueGiven) {
                                    this.changeTurn();
                                } else {
                                    this.setState({ clueGiven: true });
                                }
                            }} />
                    </div>
                }
            </div>
        );
    }

    getWords() {
        const length = wordList.length;
        const indices = [];
        while (indices.length < totals.allWords) {
            const random = Math.floor(Math.random() * length);
            if (!indices.some(index => index === random)) {
                indices.push(random);
            }
        }
        const words = [];
        for (let i = 0; i < totals.allWords; i++) {
            words.push(wordList[indices[i]].toUpperCase());
        }
        return words;
    }

    getColorMap(redTotal) {
        const colorMap = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        let maxElement = numberList.length;
        let filled = 0;
        while (maxElement > 0) {
            const random = Math.floor(Math.random() * maxElement);
            if (random >= maxElement) {
                continue;
            }
            if (filled < redTotal) {
                colorMap[numberList[random]] = colors.Red;
            } else if (filled < totals.bothColors) {
                colorMap[numberList[random]] = colors.Blue;
            } else if (filled < totals.nonBlack) {
                colorMap[numberList[random]] = colors.Yellow;
            } else {
                colorMap[numberList[random]] = colors.Black;
            }
            const swap = numberList[random];
            numberList[random] = numberList[maxElement - 1];
            numberList[maxElement - 1] = swap;
            maxElement -= 1;
            filled += 1;
        }
        return colorMap;
    }

    continueTurn() {
        if (this.state.isRedTurn) {
            const newCount = this.state.redRemaining - 1;
            const gameOver = newCount === 0;
            this.setState({ redRemaining: newCount, isGameOver: gameOver, gameStarted: !gameOver });
        } else if (this.state.isBlueTurn) {
            const newCount = this.state.blueRemaining - 1;
            const gameOver = newCount === 0;
            this.setState({ blueRemaining: newCount, isGameOver: gameOver, gameStarted: !gameOver });
        }
    }

    changeTurn(color = colors.Yellow) {
        const currentRedTurn = this.state.isRedTurn;
        const currentBlueTurn = this.state.isBlueTurn;
        if (color === colors.Red) {
            const newCount = this.state.redRemaining - 1;
            const gameOver = newCount === 0;
            this.setState({ clueGiven: false, isRedTurn: !currentRedTurn, isBlueTurn: !currentBlueTurn, redRemaining: newCount, isGameOver: gameOver, gameStarted: !gameOver });
        } else if (color === colors.Blue) {
            const newCount = this.state.blueRemaining - 1;
            const gameOver = newCount === 0;
            this.setState({ clueGiven: false, isRedTurn: !currentRedTurn, isBlueTurn: !currentBlueTurn, blueRemaining: newCount, isGameOver: gameOver, gameStarted: !gameOver });
        } else {
            this.setState({ clueGiven: false, isRedTurn: !currentRedTurn, isBlueTurn: !currentBlueTurn });
        }
    }

    getWinner() {
        if (this.state.redRemaining === 0) {
            return 'Red';
        } else if (this.state.blueRemaining === 0) {
            return 'Blue';
        } else if (this.state.isRedTurn) {
            return 'Blue';
        } else {
            return 'Red';
        }
    }

    newGame() {
        const newGameCount = (this.state.gameCount + 1) % 2;
        const oddGameCount = (newGameCount % 2) > 0;
        const redTotal = oddGameCount ? totals.secondColor : totals.firstColor;
        const blueTotal = oddGameCount ? totals.firstColor : totals.secondColor;
        this.setState({
            gameStarted: false,
            words: this.getWords(),
            colorMap: this.getColorMap(redTotal),
            isRedTurn: !oddGameCount,
            isBlueTurn: oddGameCount,
            isGameOver: false,
            redTotal,
            redRemaining: redTotal,
            blueTotal,
            blueRemaining: blueTotal,
            codeMasterView: false,
            gameCount: newGameCount,
            clueGiven: false
        });
    }
}
