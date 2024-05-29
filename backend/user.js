var request = require('request');
const express = require("express");
const router = express.Router();

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } = require("firebase/firestore");

var client_id = process.env.CLIENT_ID; // your clientId
var client_secret = process.env.CLIENT_SECRET; // Your secret

async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
    },
  });
  
  return await response.json();
}
  
async function getTrackInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },
    });
    // console.log(response.json())
  
    return await response.json();
}

getToken().then(response => {
  getTrackInfo(response.access_token).then(profile => {
    console.log(profile)
  })
});
// getToken().then(response => {
//     getTrackInfo(resp)
// })

// async function getUserInfo(access_token) {
//     const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
//       method: 'GET',
//       headers: { 'Authorization': 'Bearer ' + access_token },
//     });

  
//     return await response.json();
// }



// const getTrackInfo = async () => {
//     const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
//       method: 'GET',
//       headers: { 'Authorization': 'Bearer ' + accessToken },
//     });

//     console.log(response.body);
// }

// getToken().then(response => {
//     getTrackInfo(response.access_token).then(profile)
// })


  router.post("/", async (req, res) => {
    try {
        let profileInfo = null;
        getToken().then(response => {
            getTrackInfo(response.access_token).then(profile => {
              profileInfo = profile
            })
          });

        const docRef = await addDoc(collection(db, "users"), {
            username: "name",
        });
        console.log(docRef.data());

        res.status(200).json({message: "profileInfo"})
        
    } catch (e) {
        res.status(400).json({error: `Error setting user data ${e}`})
    }
  })
 



router.get("/", async (req, res) => {
    try {
        let ret = [];
        const docRef = await getDocs(collection(db, "users"));
        console.log("docRef in get", docRef);

        docRef.forEach((doc) => {
            ret.push({
                id: doc.id,
                ...doc.data()
            })
        }) 

        res.status(200).json(ret)
    } catch(e) {
        res.status(400).json({error: `Error fetching user data ${e}`})
    }
})


module.exports = router;