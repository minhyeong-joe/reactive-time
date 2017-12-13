import React from 'react';
import './header.css';

const Header = (props) => {
  return (
    <div className="header">
      <h1>{props.children}</h1>
    </div>
  );
};

export default Header;
