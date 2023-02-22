import React from 'react'
import './MovieCard.css'
import Rating from './../Rating/Rating';

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
    <div className={cardStyle}>
        <div className="" style={imgStyle}>
            <div className="movie-info-top">
                <p>{movie.vote_average}</p>
            </div>
            <div className="movie-info-bottom">
                <p>{movie.title}</p>
                <Rating rate={movie.vote_average/2}/>
            </div>
            {
                cardStyle==="top-rated-card"?
                <p>{movie.title}</p>
                :
                null
            }
        </div>
    </div>
  )
}

export default MovieCard