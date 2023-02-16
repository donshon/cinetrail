import React from 'react'
import './Header.css'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

function Header() {
    const darkMode = true;

  return (
    <div className="header-container">
        <a href="/" className="logo">CineTrail</a>
        <div className="search-container">
            <input placeholder="Search Movies"/>
        </div>
        <div className="header-buttons-container">
            {
                
            }
            <MdOutlineLightMode/>
            <MdOutlineDarkMode/>
            <button className="create-acct-btn">Create an account</button>
        </div>
    </div>
  )
}

export default Header