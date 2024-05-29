import React from 'react'
import '../styles/forum.css'

const ForumCard = ({data}) => {
  return (
    <div className="forum-card-container">
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
        </div> 
    </div>
  )
}

export default ForumCard