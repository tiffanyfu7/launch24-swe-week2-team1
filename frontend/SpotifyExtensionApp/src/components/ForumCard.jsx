import React from 'react'
import '../styles/forum.css'

const ForumCard = ({data, handleForumCardClick}) => {
  return (
    <button className="forum-card-container" onClick={() => handleForumCardClick(forum.id)}>
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
            <FaArrowRight color="white" size={45} />
        </div> 
    </button>
  )
}

export default ForumCard