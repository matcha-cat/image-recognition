import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import MyIcon from './MyIcon.png';

const Logo = () => {
  return (
    <div className="appLogo ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 170, width: 170 }}
      >
        <div className="logo-content">
          <div className="Tilt-inner pa3">
            <br></br>
            <img style={{ paddingTop: '10px' }} alt="logo" src={MyIcon} />
            <p className="app-name">Image Recognition</p>
            <br></br>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
