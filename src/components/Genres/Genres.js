import React, {useState, useEffect} from 'react'
import './Genres.css'
import axios from 'axios'

function Genres({movieGenres}) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    //state for genres
    const [allGenres, setAllGenres] = useState([])

    //get list of all genres from api
    useEffect(
        ()=>{
            axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
            .then( res => {
                setAllGenres(res.data.genres)
            })
            .catch(err=>console.log(err))
        }, []
    )

    const genreList = () => {
        // walks thru movie genres, find the matches, add to a list to return
        const glist = []
        movieGenres?.map(id => {
            for(let i =0; i < allGenres.length; i++) {
                if(id === allGenres[i].id) {
                    glist.push(allGenres[i].name)
                }
            }
        })
        return glist.join(", ")
    }

  return (
    <div>
        <p>Genres: {genreList()}</p>
    </div>
  )
}

export default Genres