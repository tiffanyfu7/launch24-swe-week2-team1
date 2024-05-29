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
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });

  return await response.json();
}

async function getUserInfo(access_token) {
  const response = await fetch(
    "https://api.spotify.com/v1/users/2i3jv3jp56h1tburma5d38v98",
    {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    }
  );

  return await response.json();
}

async function getUserTopTracks(access_token) {
  const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    method: "GET",
    headers: { Authorization: "Bearer " + access_token },
  });

  return await response.json();
}

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

getToken().then((response) => {
  getUserTopTracks(response.access_token).then((topTracks) => {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("userid", "==", "2i3jv3jp56h1tburma5d38v98")
    );

    const querySnapshot = getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });

    updateDoc(doc(db, "users"), {
        topTracks
    });
  });
});

getToken().then((response) => {
    getUserTopTracks(response.access_token).then((topTracks) => {
      console.log(topTracks);
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
