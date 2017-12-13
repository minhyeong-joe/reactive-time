import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="homeBody">
        <p className="homeTitle">Description</p>
        <div className="homeContent">
          <p>This react-based web application allows you to do a few fun stuffs with time.</p>
          <p>You can also count the days between two days, or find out what day it will be after certain days since the starting date.</p>
          <hr/>
          <p><font color="red">work in progress</font></p>
        </div>
      </div>
    );
  }
};
