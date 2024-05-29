// import {createContext} from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children}) => {
//     const [accessToken, setAccessToken] = useState(null);

//     var client_id = process.env.CLIENT_ID; // your clientId
//     var client_secret = process.env.CLIENT_SECRET; // Your secret

//     async function getToken() {
//         const response = await fetch('https://accounts.spotify.com/api/token', {
//           method: 'POST',
//           body: new URLSearchParams({
//             'grant_type': 'client_credentials',
//           }),
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
//           },
//         });

//         console.log(response);

//         setAccessToken(response.json());
      
//         // return await response.json();

//         return <AuthContext.Provider value={{ accessToken }}>{children}</AuthContext.Provider>;
//       }
// }

// export { AuthContext };
