import React, { Component } from 'react';
import Record from './Record';
import './StopWatch.css';

export default class StopWatch extends Component {
  constructor() {
    super();
    this.state = {
      isRunning : false,
      isPaused : false,
      ms : '00',
      sec : '00',
      min : '00',
      hr : '0',
      record: [],
      timerInterval : null
    };
  }

  renderStartBtn() {
    if (this.state.isRunning && !this.state.isPaused) {
      return (
        <button id="record" onClick={this.recordTime.bind(this)}>RECORD</button>
      )
    } else {
      return (
        <button id="start" onClick={this.startTimer.bind(this)}>START</button>
      )
    }
  }

  renderStopBtn() {
    if (this.state.isRunning && !this.state.isPaused) {
      return (
        <button id="stop" onClick={this.stopTimer.bind(this)}>STOP</button>
      )
    } else if (this.state.isRunning && this.state.isPaused) {
      return (
        <button id="reset" onClick={this.resetTimer.bind(this)}>RESET</button>
      )
    } else {
      return (
        <button id="stop">STOP</button>
      )
    }
  }

  startTimer() {
    this.setState({
      isRunning: true,
      isPaused: false
    });
    const timerInterval = setInterval(()=>{
      let ms = this.state.ms;
      let sec = this.state.sec;
      let min = this.state.min;
      let hr = this.state.hr;
      ms++;
      if(ms<10){
        ms = '0'+ms;
      }
      if (ms >= 100) {
        ms = '00';
        sec++;
        if (sec < 10) {
          sec = '0'+sec;
        }
        if (sec >= 60) {
          sec ='00';
          min++;
          if (min <10) {
            min = '0'+min;
          }
          if (min >= 60) {
            min = '00';
            hr++;
            if (hr <10) {
              hr = '0' + hr;
            }
          }
        }
      }
      this.setState({
        ms: ms,
        sec: sec,
        min: min,
        hr: hr,
      });
    }, 10);
    this.setState({
      timerInterval: timerInterval
    })
  }

  recordTime() {
    this.setState({
      record: [...this.state.record, {ms: this.state.ms, sec: this.state.sec, min: this.state.min, hr: this.state.hr, key: Date.now()}]
    })
  }

  stopTimer() {
    this.setState({
      isPaused: true
    });
    clearInterval(this.state.timerInterval);
  }

  resetTimer() {
    this.setState({
      isRunning : false,
      isPaused : false,
      ms : '00',
      sec : '00',
      min : '00',
      hr : '0',
      record: [],
      timerInterval : null
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerInterval);
  }

  render() {
    return (
      <div className="stopwatchBody">
        <p className="stopwatchTitle">STOPWATCH</p>
        <div className="display">{this.state.hr} : {this.state.min} : {this.state.sec} . {this.state.ms}</div>
        <div className="btnGroup">
          {this.renderStartBtn()}
          {this.renderStopBtn()}
        </div>
        <Record time={this.state.record}/>
      </div>
    );
  }
};
