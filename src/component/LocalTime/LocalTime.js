import React, { Component } from 'react';
import './LocalTime.css';

export default class LocalTime extends Component {
  constructor(){
    super();
    this.state = {
      hr: '0',
      min: '00',
      sec: '00',
      ampm: null,
      interval: null,
    };
  }

  componentWillMount() {
    const d = new Date();
    const hr = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();
    this.adjustTime(hr, min, sec);

    const interval = setInterval(()=>{
      const d = new Date();
      const hr = d.getHours();
      const min = d.getMinutes();
      const sec = d.getSeconds();
      this.adjustTime(hr, min, sec);
    }, 1000);
    this.setState({
      interval: interval
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  adjustTime(hr, min, sec) {
    let ampm = 'AM'
    if (hr === 12) {
      ampm = 'PM'
    }
    if(hr===0){
      hr = 12;
    }
    else if(hr>=13){
      hr = hr - 12;
      ampm = 'PM';
    }
    if(min<10){
      min = '0'+min;
    }
    if(sec<10){
      sec = '0'+sec;
    }
    this.setState({
      hr: hr,
      min: min,
      sec: sec,
      ampm: ampm
    });
  }


  render() {
    return (
      <div className="localTimeContainer">
        <p>Current Local Time: </p>
        <div className="localTime">{this.state.hr} : {this.state.min} : {this.state.sec} {this.state.ampm} </div>
      </div>
    );
  }
};
