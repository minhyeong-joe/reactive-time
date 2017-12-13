import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Header from './reusable/header';
import Navbar from './reusable/navbar';
import Narrowbar from './reusable/narrowbar';
import Home from './Home/Home';
import LocalTime from './LocalTime/LocalTime';
import WorldTime from './WorldTime/WorldTime';
import StopWatch from './StopWatch/StopWatch';
import CountDown from './CountDown/CountDown';
import DayCount from './DayCount/DayCount';
import Footer from './reusable/footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="mainContent">
            <Header>Reactive Time</Header>
            <Navbar/>
            <Narrowbar/>
            <div className="body">
              <LocalTime/>
              <Route exact path="/reactivetime" component={Home}/>
              <Route exact path="/reactivetime/stopwatch" component={StopWatch}/>
              <Route exact path="/reactivetime/countdown" component={CountDown}/>
              <Route exact path="/reactivetime/worldtime" component={WorldTime}/>
              <Route exact path="/reactivetime/ddaycount" component={DayCount}/>
            </div>
          </div>
          <Footer/>
        </div>
    </Router>
    );
  }
}

export default App;
