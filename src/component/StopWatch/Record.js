import React from 'react';
import './StopWatch.css';

const Record = (props) => {
  return (
    <div className="recordContent">
      {props.time.map((time) => {
        return(
          <p key={time.key}>{time.hr} : {time.min} : {time.sec} . {time.ms} </p>
        );
      })}
    </div>
  );
}

export default Record;
