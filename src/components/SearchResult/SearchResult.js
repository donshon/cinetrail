import React, {useState} from 'react'
import './SearchResult.css'
import noImage from '../../assets/no-image.png'


function SearchResult({movie}) {
    const [imgError, setImgError] = useState(false);

  return (
    <a href={`/moviedetails/${movie?.id}`} className="search-link">
        <img onError={()=>setImgError(true)}
            src={imgError? noImage : `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
        />
        <p>{movie?.title}</p>
    </a>
  )
}

export default SearchResult