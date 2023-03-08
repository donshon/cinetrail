import React, {useState, useEffect, useContext} from 'react'
import './MyFavorites.css'
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios'
import MovieCard from './../../components/MovieCard/MovieCard';

function MyFavorites() {
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const {user, setUser, token, setToken} = useContext(UserContext)
    const [movies, setMovies] = useState([])

    //show all user's fav when page loads
    useEffect (
        () => {
            //call api to get favs
            axios.get(`${serverUrl}/favoriteMovies/user/${user?._id}`)
            .then( res => {
                //console.log(res.data.favorites)
                setMovies(res.data.favorites)
            })
            .catch(err=>console.log(err))
        }, [user]
    )

  return (
    <div className="favorites-container">
        {
            token?
            movies.map(item =>
                <MovieCard 
                key={item.movie[0]._id}
                movie={item.movie[0]}
                imageUrl={item.movie[0].poster_path}
                imgHeight="300px" 
                radius="16px" 
                cardStyle="popular-card" />)
            :
            <p>Sign in to save movies</p>
        }
    </div>
  )
}

export default MyFavorites