import React, { Component } from 'react';
import './App.css';
import { colors } from './Constants';

export default class Board extends Component {
    componentWillMount() {
        this.setState({
            gameCount: this.props.gameCount,
            wordSelected: this.newWordSelected()
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameCount !== this.state.gameCount) {
            this.setState({ gameCount: nextProps.gameCount, wordSelected: this.newWordSelected() });
        }
    }

    render() {
        const words = this.props.words;
        const colorMap = this.props.colorMap;

        return (
            <body class='bg-light text-center'>
            <table class='table'>
                <tbody>
                    {
                        [0, 1, 2, 3, 4].map(row => {
                            return <tr class="primary" key={row}>
                                {
                                    [0, 1, 2, 3, 4].map(col => {
                                        const index = row * 5 + col;
                                        return <td key={index}>
                                            <input
                                                class='btn btn-sm'
                                                type='button'
                                                className={`cell ${this.state.wordSelected[index] ?
                                                    colorMap[index] :
                                                    this.props.codeMasterView ? `${colorMap[index]}-text` : ''}`}
                                                onClick={() => this.wordClicked(index)}
                                                disabled={!this.props.isGuessing}
                                                value={words[index]} />
                                        </td>;
                                    })
                                }
                            </tr>;
                        })
                    }
                </tbody>
            </table>
            </body>
        );
    }

    newWordSelected() {
        return [false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false, false];
    }

    wordClicked(index) {
        if (!this.state.wordSelected[index]) {
            const newWordSelected = [...this.state.wordSelected];
            newWordSelected[index] = true;
            this.setState({ wordSelected: [...newWordSelected] });

            if (this.props.colorMap[index] === colors.Black) {
                this.props.gameOver();
            } else if (this.props.colorMap[index] === colors.Yellow ||
                (this.props.isRedTurn && this.props.colorMap[index] !== colors.Red) ||
                (this.props.isBlueTurn && this.props.colorMap[index] !== colors.Blue)) {
                    this.props.turnChanged(this.props.colorMap[index]);
            } else {
                this.props.turnContinue();
            }
        }
    }
}
