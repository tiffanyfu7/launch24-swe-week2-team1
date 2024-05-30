import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

// import NavBar from '../components/NavBar.jsx';

const Landing = () => {
  
  const { accessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/Discover');
    }
  }, [accessToken, navigate])


  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/login';
  };

  return (
    <div  className="landingpage-container">
      <h1> Welcome Back </h1>
      <h3> Find your Groove </h3>
      {!accessToken && (
        <button onClick={handleLogin}>Log in with Spotify</button>
      )} 
      {/* : (
         <div>
           <h2>Logged in</h2>
           <button onClick={handleLogout}> Logout </button>
         </div>
       ) */}
    </div>
  );
  
}

export default Landing