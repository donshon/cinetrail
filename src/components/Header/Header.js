import React, {useContext} from 'react'
import './Header.css'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { ThemeContext } from '../../contexts/ThemeContext';

function Header() {

    const {darkMode, setDarkMode} = useContext(ThemeContext)

    const handleTheme = () => {
      //toggle dark mode
      setDarkMode(!darkMode)
      //save value in local storage so theme doesn't change when refreshing
      localStorage.setItem("darkmode", !darkMode)
    }

  return (
    <div className={darkMode? "header-container": "header-container header-light"}>
        <a href="/" className="logo">CineTrail</a>
        <div className="search-container">
            <input placeholder="Search Movies"/>
        </div>
        <div className="header-buttons-container">
            {
                darkMode?
                <div className="theme-buttons">
                  <MdOutlineLightMode onClick={handleTheme} className="theme-icon"/>
                  <MdOutlineDarkMode className="theme-icon theme-icon-active"/>
                </div>
                :
                <div className="theme-buttons">
                  <MdOutlineLightMode className="theme-icon theme-icon-active"/>
                  <MdOutlineDarkMode onClick={handleTheme} className="theme-icon"/>
                </div>
            }
            <button className="create-acct-btn">Create an account</button>
        </div>
    </div>
  )
}

export default Header