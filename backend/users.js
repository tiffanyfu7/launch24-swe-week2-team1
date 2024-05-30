var request = require('request');
const express = require("express");
const db = require("./firebase");
const {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  query,
  where,
} = require("firebase/firestore");
const router = express.Router();


// router.post("/", async (req, res) => {
//   try {
//     let profileInfo = null;
//     getToken().then(response => {
//       getTrackInfo(response.access_token).then(profile => {
//               profileInfo = profile
//             })
//           });

//         const docRef = await addDoc(collection(db, "users"), {
//             username: "name",
//         });
//         // console.log(docRef.data());

//         res.status(200).json({message: "profileInfo"})
        
//     } catch (e) {
//         res.status(400).json({error: `Error setting user data ${e}`})
//     }
// })

router.get("/", async (req, res) => {
  try {
        let ret = [];
        const docRef = await getDocs(collection(db, "users"));

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

router.get("/:id", async (req, res) => {
  try {
    const docRef = doc(db, "users", req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.status(200).json(docSnap.data());
    } else {
      console.log("Document does not exist");
    }
  } catch (e) {
    res.status(400).json({error: `Error fetching user data ${e}`})
  }
})

router.put("/query/:query", async (req, res) => {
  try {
    const userId = req.body.userId;
    const q = query(collection(db,"users"), where("userid", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot) {
      res.status(200).json(querySnapshot.docs[0].id);
    } else {
      console.log("Document does not exist");
    }
  } catch (e) {
    res.status(400).json({error: `Error fetching user data ${e}`})
  }
})

module.exports = router;