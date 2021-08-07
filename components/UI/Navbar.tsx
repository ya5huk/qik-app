import classes from './Navbar.module.css';
import React from 'react';

const Navbar: React.FC = () => {
    return <div className={`${classes.navContainer} myFont`}>
    <nav className="d-flex px-5 pb-3 align-items-center justify-content-between">
      <div className="left">
        <a className={`mt-auto ${classes.navLink}`}>profile</a>
      
      </div>
      <div className="right">
        <a className={`mt-auto ${classes.navLink}`}>sign out</a>
      </div>

    </nav>
  </div>
}

export default Navbar;