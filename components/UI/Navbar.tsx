import classes from "./Navbar.module.css";
import React from "react";
import router from 'next/router';

const Navbar: React.FC = () => {
  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('?');
    router.push('/');
  }

  const handleProfileClick = (e: any) => {
    e.preventDefault();
    const userId = localStorage.getItem('?') as string;
    router.push(`/accounts/${userId}`);
  }
  return (
    <div className={`${classes.navContainer} myFont`}>
      <nav className="d-flex px-5 pb-3 align-items-center justify-content-between">
        <div className="left">
          <a onClick={handleProfileClick} className={`mt-auto ${classes.navLink}`}>profile</a>
        </div>
        <div className="right">
          <a onClick={handleLogout} className={`mt-auto ${classes.navLink}`}>sign out</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
