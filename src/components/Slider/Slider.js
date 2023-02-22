import React from 'react'
import './Slider.css'
import axios from 'axios';
import {MdKeyboardArrowRight,MdKeyboardArrowLeft } from 'react-icons/md'
import Rating from './../Rating/Rating';



function Slider() {
    //using api key from .env
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imgBase = process.env.REACT_APP_IMG_BASE;

    //create state to store data
    const [upcomingMovies, setUpcomingMovies] = React.useState([])

    //create state to move thru movies
    const [index, setIndex] = React.useState(0)

    //endpoint example: https://api.themoviedb.org/3/movie/upcoming?api_key=4b5e5dfe2a22d13362c4b73eb09a74c6

    React.useEffect(
        ()=>{
            //get upcoming movie data
            axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
            .then( res => {
                //console.log(res.data.results)
                //store data in state
                setUpcomingMovies(res.data.results)
            })
            .catch(err=>console.log(err))
        }, [] //if nothing in [], useEffect only runs once on page loading
    )

    const sliderStyle = {
        height: "60vh",
        width: "100%",
        backgroundImage: `url("${imgBase}${upcomingMovies[index]?.backdrop_path}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative" //needed to to use absolute on stuff on top
    }

    const handleRight = () => {
        index < upcomingMovies.length-1?
        setIndex(index+1):
        setIndex(0)
    }

    const handleLeft = () => {
        index > 0?
        setIndex(index-1):
        setIndex(upcomingMovies.length-1) 
    }

  return (
    <div className="slider-container" style={sliderStyle}>
        <div className="slider-overlay"></div>
        <MdKeyboardArrowLeft className="left-arrow" onClick={handleLeft}/>
        <MdKeyboardArrowRight className="right-arrow" onClick={handleRight}/>
        <div className="slider-movie-info">
            <h1>{upcomingMovies[index]?.title}</h1>
            <p>{upcomingMovies[index]?.overview?.slice(0, 120)}</p>
            <p>Genres: </p>
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
            <Rating rate={upcomingMovies[index]?.vote_average/2}/>
            <p>Rating: {upcomingMovies[index]?.vote_average}</p>
            <p>See Details</p>
        </div>
    </div>
  )
}

export default Slider