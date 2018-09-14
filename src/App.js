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
      <html>

      <div class="container">

      <div class="row">

         <div class="col-md-12">

          <Codenames
            playWithTimer={this.state.playWithTimer}
            planningTime={this.state.planningTime}
            guessingTime={this.state.guessingTime} />
        </div>
      </div>

      <div class="row align-items-end">

         <div class="col-md-2 text-center">
           <TimerDetails
              isOpen={this.state.timerSettingsOpen}
              onOpen={() => this.setState({ timerSettingsOpen: true })}
              onClose={() => this.setState({ timerSettingsOpen: false })}
              setTimerValues={(playWithTimer, planningTime, guessingTime) => this.updateTimerValues(playWithTimer, planningTime, guessingTime)} />
          </div>
       </div>
       </div>
      </html>
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
