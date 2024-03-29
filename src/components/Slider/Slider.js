import React from 'react'
import './Slider.css'
import axios from 'axios';
import {MdKeyboardArrowRight,MdKeyboardArrowLeft } from 'react-icons/md'
import Rating from './../Rating/Rating';
import { Link } from 'react-router-dom'; //page link 4
import Genres from '../Genres/Genres';


function Slider() {
    //using api key from .env
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imgBase = process.env.REACT_APP_IMG_BASE;

    //create state to store data
    const [upcomingMovies, setUpcomingMovies] = React.useState([])

    //create state to move thru movies
    const [index, setIndex] = React.useState(0)

    //create state for rating stars
    const [currentRating, setCurrentRating] = React.useState(0)

    //endpoint example: https://api.themoviedb.org/3/movie/upcoming?api_key=4b5e5dfe2a22d13362c4b73eb09a74c6

    React.useEffect(
        ()=>{
            //get upcoming movie data
            axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
            .then( res => {
                //console.log(res.data.results)
                //store data in state
                setUpcomingMovies(res.data.results)
                //set first rating
                setCurrentRating((res.data.results[0]?.vote_average/2))
            })
            .catch(err=>console.log(err))
            // eslint-disable-next-line
        }, [] //if nothing in [], useEffect only runs once on page loading
    )

    //run whenever index cahnges to update rating
    React.useEffect(
        ()=>{
            if (index > 0) {
                setCurrentRating((upcomingMovies[index]?.vote_average/2))
            }
            // eslint-disable-next-line
        }, [index]
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
            <Genres movieGenres={upcomingMovies[index]?.genre_ids}/> 
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
            <Rating stars={currentRating}/>
            <p>Rating: {upcomingMovies[index]?.vote_average}</p>
            <Link to={`/moviedetails/${upcomingMovies[index]?.id}`} className="movie-link">
                See Details
            </Link>
        </div>
    </div>
  )
}

export default Slider