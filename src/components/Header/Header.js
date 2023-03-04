import React, {useState, useContext} from 'react'
import './Header.css'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function Header() {
    const navigate = useNavigate();

    const {darkMode, setDarkMode} = useContext(ThemeContext)
    const {user, setUser, token, setToken} = useContext(UserContext)
    const [profileOptions, setProfileOptions] = useState(false)

    const handleTheme = () => {
      //toggle dark mode
      setDarkMode(!darkMode)
      //save value in local storage so theme doesn't change when refreshing
      localStorage.setItem("darkmode", !darkMode)
    }

    const handleLogout = () => {
      //clear localStorage
      localStorage.clear()
      setUser('')
      setToken('')
      //go back to homepage
      navigate('/')
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

            {
              token?
              <div className="profile-container">
                <img src={user.image_url} className="profile-img" onClick={()=>setProfileOptions(!profileOptions)}/>
                <p>Welcome {user.username}</p>
                {
                  profileOptions?
                  <div className="profile-options">
                    <p>My Favorites</p>
                    <p className="logout" onClick={handleLogout}>Logout</p>
                  </div>
                  :
                  null
                }
              </div>
              :
              <button className="create-acct-btn" onClick={()=>navigate('/signup')}>Create an account</button>
            }
        </div>
    </div>
  )
}

export default Header