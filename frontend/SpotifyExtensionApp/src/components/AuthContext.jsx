import { createContext, useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children, location }) => {
	// const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [refreshToken, setRefreshToken] = useState(null);
	
	// can't useLocation() because it is only allowed for Router components
	//const location = useLocation();

	useEffect(() => {
		const hash = location.hash;
		// for when user first logs in, since tokens are present in URL after hash
		if (hash) {
		  const params = new URLSearchParams(hash.slice(1));
		  const _accessToken = params.get('access_token');
		  const _refreshToken = params.get('refresh_token');
		  if (_accessToken && _refreshToken) {
			setAccessToken(_accessToken);
			setRefreshToken(_refreshToken);
			window.location.hash = ''; // removing hash from the URL
			localStorage.setItem('access_token', _accessToken);
			localStorage.setItem('refresh_token', _refreshToken);
		  }
		}
		/* when user goes to different pages of website and location URL changes, 
		this makes sure the tokens are still retrieved and set to keep user logged in */
		else {
		  const storedAccessToken = localStorage.getItem('access_token');
		  const storedRefreshToken = localStorage.getItem('refresh_token');
		  if (storedAccessToken && storedRefreshToken) {
			setAccessToken(storedAccessToken);
			setRefreshToken(storedRefreshToken);
		  }
		}
	  }, [location]);

	  const handleLogout = () => {
		setAccessToken(null);
		setRefreshToken(null);
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	  }

	  return (
		<AuthContext.Provider value={{ accessToken, refreshToken, handleLogout }}> 
			{children}
		</AuthContext.Provider>
	  )

	// const login = (userData) => {
	// 	setUser(userData);
	// };

	// const logout = () => {
	// 	setUser(null);
	// };

	// return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };