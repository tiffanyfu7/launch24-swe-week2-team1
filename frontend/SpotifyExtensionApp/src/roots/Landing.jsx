import React from 'react'
import NavBar from '../components/NavBar.jsx';

const Landing = () => {
  return (
    <>
      <NavBar />
      <div> 
        <a href="http://localhost:8000/login"> 
            <button> Log in with spotify </button>
        </a>
      </div>
    </>
  )
}

export default Landing