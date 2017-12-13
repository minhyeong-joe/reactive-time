import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';


class Navbar extends Component {

  NavLinkClicked = (e) => {
    console.log(e.target.href);
  }

  render() {
    return (
      <div className="navbar">
        <ul>
          <li className="navItem"><NavLink to="/reactive-time" replace exact activeStyle={{color: "white", backgroundColor: "#1533d9"}}>Home</NavLink></li>
          <li className="navItem"><NavLink to="/reactive-time/stopwatch" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}}>Stopwatch</NavLink></li>
          <li className="navItem"><NavLink to="/reactive-time/countdown" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}}>Countdown</NavLink></li>
          <li className="navItem"><NavLink to="/reactive-time/worldtime" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}}>World Time</NavLink></li>
          <li className="navItem"><NavLink to="/reactive-time/ddaycount" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}}>Date-to-Date</NavLink></li>
        </ul>
      </div>
    );
  }
};

export default Navbar;
