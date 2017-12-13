import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="container">
      <p className="footer">ⓒCopyright 2017</p>
      <p className="footer" onClick={()=>{window.open("https://sanheng03.github.io")}}>Minhyeong Joe</p>
    </div>
  );
};

export default Footer;
