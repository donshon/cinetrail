import React, {useState, useContext} from 'react'
import './Header.css'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import {Link} from 'react-router-dom'
import axios from 'axios'
import SearchResult from './../SearchResult/SearchResult';

function Header() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const {darkMode, setDarkMode} = useContext(ThemeContext)
    const {user, setUser, token, setToken} = useContext(UserContext)
    const [profileOptions, setProfileOptions] = useState(false)
    //state for search
    const [query, setQuery] = useState("")
    const [queryResults, setQueryResults] = useState([])

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

    const handleSearch = (e) => {
      //store search input in state
      setQuery(e.target.value)
      //call api to get matching movies
      axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${e.target.value}`)
      .then(res => {
        console.log(res.data.results)
        setQueryResults(res.data.results)
      })
      .catch(err => console.log(err))
    }

  return (
    <div className={darkMode? "header-container": "header-container header-light"}>
        <a href="/" className="logo">CineTrail</a>
        <div className="search-container">
            <input className="search-input" onChange={handleSearch} placeholder="Search Movies"/>
            {
              query?
              <div className="search-results-container">
                {
                  queryResults.map(item => <SearchResult key={item.id} movie={item} />)
                }
              </div>
              :
              null
            }
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
                    <Link to='/myfavorites'>My Favorites</Link>
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