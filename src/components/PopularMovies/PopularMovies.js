import React from 'react'
import './PopularMovies.css'
import axios from 'axios'
import MovieCard from './../MovieCard/MovieCard';

function PopularMovies() {
    //using api key from .env
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imgBase = process.env.REACT_APP_IMG_BASE;

    //create state to hold movies
    const [popularMovies, setPopularMovies] = React.useState([])

    //what's the API endpoint? https://api.themoviedb.org/3/movie/popular?api_key=4b5e5dfe2a22d13362c4b73eb09a74c6&page=1
    React.useEffect(
        ()=>{
            //get upcoming movie data
            axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${1}`)
            .then( res => {
                //console.log(res.data.results)
                //store data in state
                setPopularMovies(res.data.results)
            })
            .catch(err=>console.log(err))
        }, [] 
    )


  return (
    <div className="popular-conatiner">
        <h3>Popular Movies</h3>
        <div className="popular-wrapper">
            {
                popularMovies.map(item=> <MovieCard 
                    key={item.id} 
                    movie={item} 
                    imgUrl={item.poster_path}
                    imgHeight="300px"
                    radius="16px"
                    cardStyle="popular-card"
                    />)
            }
        </div>
        <div className="page-numbers">

        </div>
    </div>
  )
}

export default PopularMovies