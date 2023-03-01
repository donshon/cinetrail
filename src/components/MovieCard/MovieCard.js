import React from 'react'
import './MovieCard.css'
import Rating from './../Rating/Rating';
import { Link } from 'react-router-dom';

function MovieCard({movie, imgUrl, imgHeight, radius, cardStyle}) {
    const imgBase = process.env.REACT_APP_IMG_BASE;

    const imgStyle = {
        height: imgHeight,
        width: "200px",
        borderRadius: radius,
        backgroundImage: `url("${imgBase}${imgUrl}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative" //needed to to use absolute on stuff on top
    }

  return (
    <Link to={`/moviedetails/${movie?.id}`} className={cardStyle}>
        <div className="" style={imgStyle}>
            <div className="movie-info-top">
                <p>{movie?.vote_average}</p>
            </div>
            <div className="movie-info-bottom">
                <p>{movie?.title}</p>
                <Rating stars={movie?.vote_average/2}/>
            </div>
        </div>
        {
            cardStyle==="top-rated-card"?
            <p>{movie?.title}</p>
            :
            null
        }
    </Link>
  )
}

export default MovieCard