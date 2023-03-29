import React, {useState} from 'react'
import avatar from '../../assets/no-image.png'
import './Review.css'
//import error

function Review({review}) {
    const imgBase = process.env.REACT_APP_IMG_BASE;

    //create state for image error
    const [imgError, setImgError] = useState(false)

    //state for more/less text
    const [seeMore, setSeeMore] = useState(false)
  return (
    <div className="review">
        <div className="avatar-container">
            <img className="avatar" 
            onError = {()=>setImgError(true)}
            src={ imgError? avatar:
                `${imgBase}${review?.author_details.avatar_path}`} 
            alt="avatar"
            />
            <p>{review?.author}</p>
        </div>
        <div className="review-text">
            {
                !seeMore?
                <p>{review?.content.slice(0, 250)}
                <span onClick={()=>setSeeMore(true)}>...see more</span></p>
                :
                <p>{review?.content}
                <span onClick={()=>setSeeMore(false)}>...see less</span></p>
            }
        </div>
    </div>
  )
}

export default Review