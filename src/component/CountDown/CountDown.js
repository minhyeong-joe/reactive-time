import React, { Component } from 'react';
// import Sound from 'react-sound';
import './CountDown.css';

export default class CountDown extends Component {
  constructor(){
    super();
    this.state={
      hr:'00',
      min: '00',
      sec:'00',
      setHr:'00',
      setMin:'05',
      setSec:'00',
      isRunning: false,
      timesUp: false,
      timerInterval: null,
      timerTimeout: null,
      canReset: false,
    }
  }



  renderDisplay() {
    if (this.state.isRunning) {
      return (
        <div className="display">
          {this.state.hr}&nbsp;: {this.state.min}&nbsp;: {this.state.sec}
        </div>
      );
    } else {
      return(
        <div className="setter">
          <input type="text" min="0" max="999" maxLength="3" id="hrInput"
          inputMode="numeric"
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          value={this.state.setHr}
          onChange={e=>this.setState({setHr:e.target.value})}
          ></input> hour &nbsp;
          <input type="text" min="0" max="59" maxLength="2" id="minInput"
          inputMode="numeric"
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          value={this.state.setMin}
          onChange={e=>this.setState({setMin:e.target.value})}
          ></input> min &nbsp;
          <input type="text" min="0" max="59" maxLength="2" id="secInput"
          inputMode="numeric"
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          value={this.state.setSec}
          onChange={e=>this.setState({setSec:e.target.value})}
          ></input> sec
        </div>
      );
    }
  }

  handleFocus(e) {
    e.target.select();
  }

  handleBlur(e) {
    if (isNaN(e.target.value)) {
      e.target.value = 0;
    }
    if (e.target.value.length < 2) {
      e.target.value = '0' + e.target.value;
    }
    if (e.target.value < e.target.min) {
      e.target.value = e.target.min;
    }
    if (e.target.value > e.target.max || e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.max;
    }
    if (e.target.id==='hrInput') {
      this.setState({
        setHr: e.target.value
      })
    } else if (e.target.id==='minInput') {
      this.setState({
        setMin: e.target.value
      })
    } else if (e.target.id==='secInput') {
      this.setState({
        setSec: e.target.value
      })
    }
  }


  renderBtn() {
    if (this.state.isRunning && !this.state.timesUp) {
      return (
        <button onClick={this.onResetClick.bind(this)}>RESET</button>
      )
    } else if (this.state.timesUp) {
      return(
        <button onClick={this.onOkayClick.bind(this)}>OKAY</button>
      )
    } else {
      return(
        <button onClick={this.onStartClick.bind(this)}>START</button>
      )
    }
  }

  onStartClick() {
    let hr = this.state.setHr;
    let min = this.state.setMin;
    let sec = this.state.setSec;
    let ms = sec*1000 + min*60*1000 + hr*60*60*1000;
    console.log(ms);
    document.getElementById("alarm").volume=0;
    document.getElementById("alarm").play();
    const timerTimeout = setTimeout(()=> {
      this.timeOver();
    }, ms)
    if (hr.length < 2) {
      hr = '0'+hr;
    }
    if (min.length<2) {
      min = '0'+min;
    }
    if (sec.length<2) {
      sec = '0'+sec;
    }
    this.setState({
      isRunning: true,
      hr: hr,
      min: min,
      sec: sec,
      timerTimeout: timerTimeout
    })
    this.updateTimer();
  }

  updateTimer() {
    const timerInterval = setInterval(()=>{
      let hr = this.state.hr;
      let min = this.state.min;
      let sec = this.state.sec;
      if (sec>0) {
        sec--;
        if (String(sec).length<2) {
          sec= '0'+sec;
        }
      } else {
        if (min >0) {
          sec= 59;
          min--;
          if (String(min).length<2) {
            min= '0'+min;
          }
        } else {
          if (hr >0) {
            min = 59;
            hr--;
            if (String(hr).length<2) {
              hr= '0'+hr;
            }
          } else {
            clearInterval(timerInterval);
          }
        }
      }
      this.setState({
        hr: hr,
        min: min,
        sec: sec,
        timerInterval: timerInterval,
        canReset: true
      })
    }, 1000)
  }

  onResetClick() {
    if (this.state.canReset) {
      clearTimeout(this.state.timerTimeout);
      clearInterval(this.state.timerInterval);
      this.setState({
        isRunning: false,
        timerInterval: null,
        timerTimeout: null,
        canReset: false,
      })
    }
  }

  timeOver() {
    this.setState({
      timesUp: true,
    })
    document.getElementById("alarm").currentTime=0;
    document.getElementById("alarm").volume=1;
  }

  // renderSound() {
  //   if(this.state.timesUp) {
  //     return(
  //       <Sound
  //         url="./alarm.mp3"
  //         playStatus={Sound.status.PLAYING}
  //         playFromPosition={0}
  //       />
  //     )
  //   }
  // }

  onOkayClick() {
    this.setState({
      isRunning: false,
      timesUp: false,
      timerInterval: null,
      timerTimeout: null,
      canReset: false,
    })
    document.getElementById('alarm').pause();
  }

  componentWillUnmount() {
    clearInterval(this.state.timerInterval);
    clearTimeout(this.state.timerTimeout);
    this.setState({
      timerInterval: null,
      timerTimeout: null,
    });
  }


  render() {
    return (
      <div className="countdownBody">
        <p className="countdownTitle">COUNTDOWN</p>
        {this.renderDisplay()}
        <div className="btnGroup">
          {this.renderBtn()}
        </div>
        {/* {this.renderSound()} */}
        <audio src='./alarm.mp3' id="alarm" loop="true" />
      </div>
    );
  }
};
