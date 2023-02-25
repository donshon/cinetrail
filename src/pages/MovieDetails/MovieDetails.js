import React, {useState, useEffect, useContext} from 'react'
import './MovieDetails.css'
import { useParams } from 'react-router-dom' //Page link 5
import axios from 'axios'
import ReactPlayer from 'react-player'//npm install react-player
import { ThemeContext } from '../../contexts/ThemeContext';

function MovieDetails() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imgBase = process.env.REACT_APP_IMG_BASE;
    const {darkMode, setDarkMode} = useContext(ThemeContext)

    //Need to show movie details. From? movie id found in url as a parameter from App.js
    const {movieid} = useParams();

    //need state for video
    const [videoLink, setVideoLink] = useState("")
    //need state for movie info
    const [movie, setMovie] = useState()

    //example movie details endpoint: https://api.themoviedb.org/3/movie/{movie_id}?api_key=4b5e5dfe2a22d13362c4b73eb09a74c6
    
    //example trailer endpoint: https://api.themoviedb.org/3/movie/646389/videos?api_key=4b5e5dfe2a22d13362c4b73eb09a74c6&language=en-US
    useEffect(
        ()=>{
            axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}`)
            .then( res => {
                //need a 'Trailer' from 'YouTube'
                const youtubeLinks = res.data.results.filter( item => item.site==="YouTube" && item.type==="Trailer")
                //set a video link
                setVideoLink(youtubeLinks[0].key)
            })
            .catch(err=>console.log(err))
            
            //another api call for movie info
            axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}`)
            .then( res => {
                //
                setMovie(res.data)
            })
            .catch(err=>console.log(err))
        }, []
    )

  return (
    <div className={darkMode? "details-container": "details-container details-light"}>
        {
            videoLink?
            <div className="trailer-container">
                <ReactPlayer 
                className="trailer-player" 
                url={`https://www.youtube.com/watch?v=${videoLink}`}
                width="100%"
                height="100%"
                />
            </div>
            :
            <div className="trailer-container-blank" 
            style= {{
                backgroundImage:`url("${imgBase}/${movie?.backdrop_path}")`,
                backgroundPosition:"center",
                backgroundSize:"cover"
            }}>
                <p>No trailer found</p>
            </div>
            
        }
        <div className="title-container">
            <h2>{movie?.title}</h2>
        </div>
        <div className="info-container">
            <img className="details-poster" src={`${imgBase}/${movie?.poster_path}`}/>
            <div className="movie-details-info">
                <h2>{movie?.tagline}</h2>
                <h4>{movie?.overview}</h4>
                <h4>Status: <span>{movie?.status}</span></h4>
                <h4>Runtime: <span>{movie?.runtime}</span></h4>
                <h4>Budget: <span>{movie?.budget}</span></h4>
            </div>

        </div>
        <div className="review-container">
            review
        </div>
    </div>
  )
}

export default MovieDetails