import React from 'react'

const ReplyBox = ({setClickReply}) => {
    return (
        <>
            <button onClick={() => setClickReply(false)}>x</button>
            <input placeholder="Type a Reply...."></input>
            <button>Post</button>
        </>
    )
}

export default ReplyBox