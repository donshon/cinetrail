import React from 'react'
import './Rating.css'
//npm install react-star-ratings
import StarRatings from 'react-star-ratings'


function Rating({stars}) {
  return (
    <div>
        <StarRatings
          rating={stars}
          starRatedColor="red"
          numberOfStars={5}
          starDimension="15px"
          starSpacing="1px"
        />
    </div>
  )
}

export default Rating