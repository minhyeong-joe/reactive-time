import React, { Component } from 'react';
import './DayCount.css';

export default class DayCount extends Component {
  constructor() {
    super();
    this.state={
      startDate: null,
      endDate: null,
      error: false,
      result: null,
      days: null,
      currentMode: 'dateRadio',
    };
  }

  componentDidMount() {
    document.getElementById('dateRadio').checked = true;
  }


  onBtnClick() {
    if (this.state.currentMode==='dateRadio') {
      if (!this.state.startDate || !this.state.endDate) {
        this.setState({
          error: true,
        })
      } else {
        const d1 = new Date(this.state.startDate);
        const d2 = new Date(this.state.endDate);
        let ms_difference = d2.getTime() - d1.getTime();
        let day_difference = Math.floor(ms_difference/(1000*60*60*24));
        if (document.getElementById('checkBox').checked) {
          day_difference+=1;
        }
        this.setState({
          error: false,
          result: day_difference+' Days'
        })
      }
    } else if (this.state.currentMode ==='daysRadio') {
      if (!this.state.startDate || !this.state.days) {
        this.setState({
          error: true,
        })
      } else {
        const d1 = new Date(this.state.startDate);
        let ms_sum = d1.getTime() + ((this.state.days+1)*24*60*60*1000);
        const resultDate = new Date(ms_sum);
        const result = resultDate.toDateString();
        this.setState({
          error: false,
          result: result,
        })
      }
    }
  }


  renderError() {
    if (this.state.error) {
      return (
        <p><font color="red" size="4">Input is not valid.</font></p>
      )
    }
  }

  renderResult() {
    if (this.state.result != null) {
      return (
        <div>
          <p>{this.state.result}</p>
        </div>
      )
    }
  }

  renderInput() {
    if (this.state.currentMode === 'daysRadio') {

      return (
        <div className="input">
          <span>Days Elapsed: </span>
          <input className="daysInput" placeholder="days" type="text" inputMode="numerical" step="1" onChange={this.ValidateDays.bind(this)}/>
        </div>
      );
    } else if (this.state.currentMode === 'dateRadio'){

      return (
        <div className="input">
          <span>End Date: </span>
          <input type="date" required onChange={e=>this.setState({endDate: e.target.value})}/>
        </div>
      );
    }
  }

  ValidateDays(e) {
  let valueArray = e.target.value.split('');
  for (let i=0; i<valueArray.length; i++){
    if (isNaN(valueArray[i])) {
      valueArray.splice(i, 1);
      e.target.value = valueArray.join('');
    }
  }
  this.setState({
    days: parseInt(e.target.value, 10),
  })
  }

  renderBtnName() {
    if (this.state.currentMode === 'dateRadio') {
      return ("Calculate Difference")
    } else {
      return ("Calculate Day")
    }
  }

  renderCheckbox() {
    if (this.state.currentMode === 'dateRadio') {
      return (
        <div>
          <input type="checkbox" id="checkBox"/><label htmlFor="checkBox">Include the starting date</label>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="datecountBody">
        <p className="datecountTitle">Date-to-Date Count</p>
        <form>
          <div className="calcOption">
            <input type="radio" name="radio" id="dateRadio" onClick={e=>this.setState({currentMode: e.target.id})}/><label htmlFor="dateRadio">Calculate Date-to-Date difference</label>
          </div>
          <div className="calcOption">
            <input type="radio" name="radio" id="daysRadio" onClick={e=>this.setState({currentMode: e.target.id})}/><label htmlFor="daysRadio">Add/Subtract Days</label>
          </div>
          <div className="input">
            <span>Starting Date: </span>
            <input type="date" required onChange={e=>this.setState({startDate: e.target.value})}/>
          </div>
          {this.renderInput()}

          <div>
            {this.renderCheckbox()}
          </div>
          <input type="button" value={this.renderBtnName()} onClick={this.onBtnClick.bind(this)}/>
        </form>
        {this.renderError()}
        {this.renderResult()}
      </div>
    );
  }
};
