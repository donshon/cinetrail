import React from 'react'
import './TopMovies.css'
import axios from 'axios'
import MovieCard from './../MovieCard/MovieCard';


function TopMovies() {
    //using api key from .env
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;


    //set up state to store movies
    const [topMovies, setTopMovies] = React.useState([])

    //what's the API endpoint? https://api.themoviedb.org/3/movie/top_rated?api_key=4b5e5dfe2a22d13362c4b73eb09a74c6&page=1
    React.useEffect(
        ()=>{
            //get upcoming movie data
            axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`)
            .then( res => {
                //store data in state
                setTopMovies(res.data.results.slice(0, 10))
            })
            .catch(err=>console.log(err))
            // eslint-disable-next-line
        }, [] 
    )

  return (
    <div className="top-rated-container">
        <h3>Top Rated Movies</h3>
        <div className="top-rated-wrapper">
            {
                topMovies.map(item => <MovieCard 
                    key={item.id} 
                    movie={item} 
                    imgUrl={item.backdrop_path}
                    imgHeight="100px"
                    radius="8px"
                    cardStyle="top-rated-card"
                    />)
            }
        </div>
    </div>
  )
}

export default TopMovies