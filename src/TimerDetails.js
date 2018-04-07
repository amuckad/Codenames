import React, { Component } from 'react';
import * as Modal from 'react-modal';
import './App.css';

export default class TimerDetails extends Component {
    customModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            padding: 0,
            background: 'rgb(255, 255, 255)',
            transform: 'translate(-50%, -50%)',
            overlfow: 'scroll',
            maxHeight: '70%',
            maxWidth: '30%',
            overflowX: 'hidden',
            overflowY: 'auto'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            overflow: 'hidden',
            zIndex: 7000
        }
    };

    componentWillMount() {
        this.setState({
            playWithTimer: true,
            planningTime: 0,
            guessingTime: 0
        });
    }

    render() {
        return (
            <div>
                <div>
                    <input
                        type='button'
                        className='button'
                        onClick={() => this.props.onOpen()}
                        value='Edit Timer Settings' />
                    {
                        this.props.currentPlayWithTimer &&
                        <div>
                            <div className='timer-details'>{`Planning Time: ${this.props.currentPlanningTime} seconds`}</div>
                            <div className='timer-details'>{`Guessing Time: ${this.props.currentGuessingTime} seconds`}</div>
                        </div>
                    }
                    {
                        !this.props.currentPlayWithTimer &&
                        <div>Playing without timer</div>
                    }
                </div>
                <Modal
                    contentLabel='Modal'
                    style={this.customModalStyles}
                    isOpen={this.props.isOpen}>
                    <div className='modal-header'>
                        <span>Timer Details</span>
                    </div>
                    <div>
                        <div className='modal-body'>
                            <input
                                type='checkbox'
                                checked={this.state.playWithTimer}
                                onChange={e => this.setState({ playWithTimer: e.target.checked })} />
                            <span>Play With Timer</span>
                        </div>
                        <div className='modal-body'>
                            <span>Planning time (seconds)</span>
                            <input
                                type='input'
                                className='modal-input'
                                disabled={!this.state.playWithTimer}
                                value={this.state.planningTime}
                                onChange={e => this.setState({ planningTime: e.target.value })} />
                        </div>
                        <div className='modal-body'>
                            <span>Guessing time (seconds)</span>
                            <input
                                type='input'
                                className='modal-input'
                                disabled={!this.state.playWithTimer}
                                value={this.state.guessingTime}
                                onChange={e => this.setState({ guessingTime: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <input
                            type='button'
                            className='modal-buttons'
                            onClick={() => this.checkAndSetTimerValues()}
                            value='OK' />
                        <input
                            type='button'
                            className='modal-buttons'
                            onClick={() => {
                                this.setState({
                                    playWithTimer: this.props.currentPlayWithTimer,
                                    planningTime: this.props.currentPlanningTime,
                                    guessingTime: this.props.currentGuessingTime
                                });
                                this.props.onClose();
                            }}
                            value='Close' />
                    </div>
                </Modal>
            </div>
        );
    }

    checkAndSetTimerValues() {
        if (this.state.playWithTimer) {
            if (this.state.planningTime === 0 || this.state.guessingTime === 0) {
                alert('Timer values cannot be 0');
            } else {
                this.props.setTimerValues(true, this.state.planningTime, this.state.guessingTime);
            }
        } else {
            this.props.setTimerValues(false, 0, 0);
        }
    }
}
