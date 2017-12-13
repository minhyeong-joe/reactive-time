import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './narrowbar.css';
import $ from 'jquery';

export default class Narrowbar extends Component {

  menuToggle() {
    $('.menuList').slideToggle("fast");
  }

  componentDidMount() {
    $('.body').on('click', function() {
      $('.menuList').slideUp();
    });
    $('.container').on('click', function() {
      $('.menuList').slideUp();
    });
  }

  render() {
    return(
      <div className="narrowbar">
        <div className="narrowbarTitle">Reactive Time</div>
        <div className="menuBtn" onClick={this.menuToggle.bind(this)}>
          <div className="menuBar"></div>
          <div className="menuBar"></div>
          <div className="menuBar"></div>
        </div>
        <div className="menuList">
          <div className="menuItem"><NavLink to="/reactive-time" replace exact activeStyle={{color: "white", backgroundColor: "#1533d9"}} onClick={this.menuToggle.bind(this)}>Home</NavLink></div>
          <div className="menuItem"><NavLink to="/reactive-time/stopwatch" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}} onClick={this.menuToggle.bind(this)}>Stopwatch</NavLink></div>
          <div className="menuItem"><NavLink to="/reactive-time/countdown" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}} onClick={this.menuToggle.bind(this)}>Countdown</NavLink></div>
          <div className="menuItem"><NavLink to="/reactive-time/worldtime" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}} onClick={this.menuToggle.bind(this)}>World Time</NavLink></div>
          <div className="menuItem"><NavLink to="/reactive-time/ddaycount" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}} onClick={this.menuToggle.bind(this)}>Date-to-Date</NavLink></div>
        </div>
      </div>
    );
  }
};
