import React, { Component } from 'react';
import './App.css';
import Seconds from './Seconds';

export default class Timer extends Component {
    timerCodeMaster;
    timerGuessing;

    componentWillMount() {
        this.setState({
            codeMasterSecondsRem: 0,
            guessingSecondsRem: 0,
            isPaused: false
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameStarted && (!this.props.gameStarted || nextProps.clueGiven !== this.props.clueGiven)) {
            if (nextProps.clueGiven) {
                this.setState({ guessingSecondsRem: nextProps.guessingSecondsRem, codeMasterSecondsRem: 0 }, () => {
                    if (!this.state.isPaused) {
                        clearInterval(this.timerCodeMaster);
                        this.timerGuessing = setInterval(() => { this.decrementGuessingSeconds() }, 1000);
                    }
                });
            } else {
                this.setState({ codeMasterSecondsRem: nextProps.codeMasterSecondsRem, guessingSecondsRem: 0 }, () => {
                    if (!this.state.isPaused) {
                        clearInterval(this.timerGuessing);
                        this.timerCodeMaster = setInterval(() => { this.decrementCodeMasterSeconds() }, 1000);
                    }
                });
            }
        } else if (!nextProps.gameStarted) {
            clearInterval(this.timerCodeMaster);
            clearInterval(this.timerGuessing);
            this.setState({ codeMasterSecondsRem: 0, guessingSecondsRem: 0, isPaused: false });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <input
                        type='button'
                        className='button'
                        value={this.state.isPaused ? 'Continue' : 'Pause'}
                        onClick={() => this.switchPause()} />
                </div>
                <div>
                    {
                        this.props.clueGiven &&
                        <Seconds
                            seconds={this.state.guessingSecondsRem} />
                    }
                    {
                        !this.props.clueGiven &&
                        <Seconds
                            seconds={this.state.codeMasterSecondsRem} />
                    }
                </div>
            </div>
        );
    }

    decrementCodeMasterSeconds() {
        if (this.state.codeMasterSecondsRem === 0) {
            this.props.timeUp();
        } else {
            this.setState({ codeMasterSecondsRem: this.state.codeMasterSecondsRem - 1 });
        }
    }

    decrementGuessingSeconds() {
        if (this.state.guessingSecondsRem === 0) {
            this.props.timeUp();
        } else {
            this.setState({ guessingSecondsRem: this.state.guessingSecondsRem - 1 });
        }
    }

    switchPause() {
        if (this.state.isPaused) {
            if (this.props.clueGiven) {
                this.timerGuessing = setInterval(() => { this.decrementGuessingSeconds() }, 1000);
            } else {
                this.timerCodeMaster = setInterval(() => { this.decrementCodeMasterSeconds() }, 1000);
            }
        } else {
            if (this.props.clueGiven) {
                clearInterval(this.timerGuessing);
            } else {
                clearInterval(this.timerCodeMaster);
            }
        }
        this.setState({ isPaused: !this.state.isPaused });
    }
}
