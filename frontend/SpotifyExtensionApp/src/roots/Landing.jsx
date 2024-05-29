import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import NavBar from '../components/NavBar.jsx';

const Landing = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.slice(1));
      const _accessToken = params.get('access_token');
      const _refreshToken = params.get('refresh_token');
      if (_accessToken && _refreshToken) {
        setAccessToken(_accessToken);
        setRefreshToken(_refreshToken);
        window.location.hash = ''; // Remove the hash from the URL
      }
    }
  }, [location]);

  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/login';
  };

  return (
    <div>
      {/* <NavBar /> */}
      <h1>Spotify Authentication</h1>
      {!accessToken ? (
        <button onClick={handleLogin}>Log in with Spotify</button>
      ) : (
        <div>
          <h2>Logged in</h2>
          <p>Access Token: {accessToken}</p>
          <p>Refresh Token: {refreshToken}</p>
        </div>
      )}
    </div>
  );
  
}

export default Landing