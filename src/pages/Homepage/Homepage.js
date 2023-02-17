import React from 'react'
import './Homepage.css'

function Homepage() {
  //using api key from .env
  const apiKey = process.env.REACT_APP_API_KEY;

  return (
    <div className="homepage-container">
        Homepage
    </div>
  )
}

export default Homepage