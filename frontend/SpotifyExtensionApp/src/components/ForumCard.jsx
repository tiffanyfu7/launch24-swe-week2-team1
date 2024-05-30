import React from 'react'
import '../styles/forum.css'
import { FaArrowRight } from 'react-icons/fa'

const ForumCard = ({data, handleForumCardClick}) => {
  return (
    <button className="forum-card-container" onClick={() => handleForumCardClick(data.id)}>
        <img className="album-cover" src={data.albumcover} />
        <h2 className="album-name"> {data.albumname} </h2>
         <div className="right-side"> 
            <div className="quick-info">
                <h5>{data.likes}</h5>
                <h5>Likes</h5>
            </div>
            <div className="quick-info"> 
                <h5>{data.replies.length}</h5>
                  <h5>Replies</h5>  
            </div>
            <FaArrowRight className="enter-forum-icon" color="white" size={45} />
        </div> 
    </button>
  )
}

export default ForumCard