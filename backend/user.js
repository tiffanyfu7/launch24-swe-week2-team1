
var request = require("request");
const express = require("express");
const router = express.Router();

const db = require("./firebase");
const {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} = require("firebase/firestore");

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
  
    return await response.json();
}

async function getUserTopAllTimeTracks(access_token) {
  const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term", {
    method: "GET",
    headers: { Authorization: "Bearer " + access_token },
  });

  return await response.json();
}

async function getUserTopAllTimeTracks(access_token) {
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term", {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    });
  
    return await response.json();
  }

// get user info
getToken().then((response) => {
  getUserInfo(response.access_token).then((profile) => {
    addDoc(collection(db, "users"), {
      username: profile.display_name,
      profilepic: profile.images[1].url,
      followercount: profile.followers.total,
      userid: profile.id,
    });
  });
});

// get all time top
getToken().then((response) => {
    getUserTopAllTimeTracks(response.access_token).then((topTracks) => {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("userid", "==", "2i3jv3jp56h1tburma5d38v98")
    );

    const querySnapshot = getDocs(q);
    const userToUpdate = querySnapshot[0].id;

    updateDoc(doc(db, "users", userToUpdate), {
        topSongs: topTracks.items
    });
  });
});



router.get("/", async (req, res) => {
  try {
    let ret = [];
    const docRef = await getDocs(collection(db, "users"));
    console.log("docRef in get", docRef);

    docRef.forEach((doc) => {
      ret.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(ret);
  } catch (e) {
    res.status(400).json({ error: `Error fetching user data ${e}` });
  }
});

module.exports = router;
