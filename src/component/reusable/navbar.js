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
          <li className="navItem"><NavLink to="/reactivetime" replace exact activeStyle={{color: "white", backgroundColor: "#1533d9"}}>Home</NavLink></li>
          <li className="navItem"><NavLink to="/reactivetime/stopwatch" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}}>Stopwatch</NavLink></li>
          <li className="navItem"><NavLink to="/reactivetime/countdown" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}}>Countdown</NavLink></li>
          <li className="navItem"><NavLink to="/reactivetime/worldtime" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}}>World Time</NavLink></li>
          <li className="navItem"><NavLink to="/reactivetime/ddaycount" replace activeStyle={{color: "white", backgroundColor: "#1533d9"}}>Date-to-Date</NavLink></li>
        </ul>
      </div>
    );
  }
};

export default Navbar;
