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
          currentPlayWithTimer={this.state.playWithTimer}
          currentPlanningTime={this.state.planningTime}
          currentGuessingTime={this.state.guessingTime}
          isOpen={this.state.timerSettingsOpen}
          onOpen={() => this.setState({ timerSettingsOpen: true })}
          onClose={() => this.closeTimerSettings()}
          setTimerValues={(playWithTimer, planningTime, guessingTime) => this.updateTimerValues(playWithTimer, planningTime, guessingTime)} />
      </div>
    );
  }

  closeTimerSettings() {
    if (this.state.planningTime === 0 || this.state.guessingTime === 0) {
      this.setState({ timerSettingsOpen: false, playWithTimer: false, planningTime: 0, guessingTime: 0 });
    } else {
      this.setState({ timerSettingsOpen: false });
    }
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
