
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

async function getUser(access_token) {
  const response = await fetch("https://api.spotify.com/v1/users/2i3jv3jp56h1tburma5d38v98", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token },
  });

  return await response.json();
}

getToken().then(response => {
    getUser(response.access_token).then(profile => {
        addDoc(collection(db, "users"), profile);
  })
});


  router.post("/", async (req, res) => {
    try {
        let profileInfo = null;
        getToken().then(response => {
            getTrackInfo(response.access_token).then(profile => {
              profileInfo = profile
              console.log("profile", profile);
              console.log("profileInfo", profileInfo);
            })
          });

        const docRef = await addDoc(collection(db, "users"), profileInfo);
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