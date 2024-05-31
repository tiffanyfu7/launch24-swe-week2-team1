var request = require("request");
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


router.get("/", async (req, res) => {
  try {
    let ret = [];
    const docRef = await getDocs(collection(db, "users"));

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
    res.status(400).json({ error: `Error fetching user data ${e}` });
  }
})

//Get Doc ID
router.put("/query/:query", async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId);
    const q = query(collection(db,"users"), where("userid", "==", userId));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs[0].id);
    if (querySnapshot) {
      res.status(200).json(querySnapshot.docs[0].id);
    } else {
      console.log("Document does not exist 111111111");
    }
  } catch (e) {
    res.status(400).json({error: `Error fetching user data ${e}`})
  }
})

module.exports = router;
