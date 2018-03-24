import React, { Component } from 'react';
import './App.css';
import Codenames from './Codenames';
import TimerDetails from './TimerDetails';

class App extends Component {
  componentWillMount() {
    this.setState({
      playWithTimer: true,
      planningTime: 0,
      guessingTime: 0,
      timerSettingsOpen: true
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Codenames!</h1>
        </header>
        <Codenames
          playWithTimer={this.state.playWithTimer}
          planningTime={this.state.planningTime}
          guessingTime={this.state.guessingTime} />
        <TimerDetails
          isOpen={this.state.timerSettingsOpen}
          onOpen={() => this.setState({ timerSettingsOpen: true })}
          onClose={() => this.setState({ timerSettingsOpen: false })}
          setTimerValues={(playWithTimer, planningTime, guessingTime) => this.updateTimerValues(playWithTimer, planningTime, guessingTime)} />
      </div>
    );
  }

  updateTimerValues(playWithTimer, planningTime, guessingTime) {
    this.setState({
      playWithTimer: playWithTimer,
      planningTime: Number(planningTime),
      guessingTime: Number(guessingTime),
      timerSettingsOpen: false
    });
  }
}

export default App;
