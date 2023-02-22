import React, {useContext} from 'react'
import './Homepage.css'
import Slider from '../../components/Slider/Slider';
import { ThemeContext } from '../../contexts/ThemeContext';
import PopularMovies from '../../components/PopularMovies/PopularMovies';
import TopMovies from './../../components/TopMovies/TopMovies';


function Homepage() {
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode? "homepage-container": "homepage-container homepage-light"}>
        <Slider/>
        <div className="movies-wrapper">
          <PopularMovies/>
          <TopMovies/>
        </div>
    </div>
  )
}

export default Homepage