import React, {useState} from 'react'
import './SearchResult.css'
import noImage from '../../assets/no-image.png'
import { Link } from 'react-router-dom';


function SearchResult({movie, query}) {
    const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/moviedetails/${movie?.id}`} className="search-link" onClick={()=>query('')}>
        <img onError={()=>setImgError(true)}
            src={imgError? noImage : `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
            alt={`${movie?.title}`}
        />
        <p>{movie?.title}</p>
    </Link>
  )
}

export default SearchResult