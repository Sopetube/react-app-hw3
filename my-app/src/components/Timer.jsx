import styles from './timer.module.css';
import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      timeLeft: props.initialTime,
      inputTime: '',
      pausedTimeLeft: 0,
    };
    this.timerInterval = null;
  }

  formatTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const seconds = totalSeconds % 60;

    return `${seconds}`;
  };

  componentDidMount() {
    if (this.props.autoStart) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

startTimer = () => {
    const { inputTime, isActive, pausedTimeLeft } = this.state;
    if (!isActive && inputTime !== '') {
      const initialTime = parseInt(inputTime, 10) * 1000;
      const startTime = pausedTimeLeft || initialTime; 
      this.setState({
        isActive: true,
        timeLeft: startTime,
        pausedTimeLeft: 0
      });
  
      if (this.props.onTimeStart) {
        this.props.onTimeStart(startTime);
      }
  
      this.timerInterval = setInterval(this.tick, this.props.tickInterval);
    }
  };
  
  stopTimer = () => {
    if (this.state.isActive) {
      clearInterval(this.timerInterval);
      this.setState(prevState => ({
        isActive: false,
        pausedTimeLeft: prevState.timeLeft 
      }));
  
      if (this.props.onTimePause) {
        this.props.onTimePause(this.state.timeLeft);
      }
    }
  };

  tick = () => {
    if (this.state.timeLeft > 0) {
      const newTimeLeft = this.state.timeLeft - this.props.tickInterval;
      this.setState({ timeLeft: newTimeLeft });

      if (this.props.onTick) {
        this.props.onTick(newTimeLeft);
      }
    } else {
      this.stopTimer();
      if (this.props.onTimeEnd) {
        this.props.onTimeEnd();
      }
    }
  };

  handleInputChange = (event) => {
    this.setState({ inputTime: event.target.value });
  };

  render() {
    const { timeLeft, inputTime, isActive } = this.state;
    const progressBarWidth = (timeLeft / (parseInt(inputTime, 10) * 1000)) * 100;

    return (
      <div>
        <p className={styles.head}>Time: {this.formatTime(timeLeft)} s </p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressBarWidth}%` }}></div>
        </div>
        <input
          type="number"
          placeholder="seconds"
          value={inputTime}
          onChange={this.handleInputChange}
        />
        <button onClick={isActive ? this.stopTimer : this.startTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
      </div>
    );
  }
}


export default Timer;
