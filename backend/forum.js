const express = require("express");
const router = express.Router();

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc, getDoc } = require("firebase/firestore");

router.get("/", async (req, res) => {
    try {
        let ret = [];
        const docRef = await getDocs(collection(db, "forum"));
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

router.get("/:id", async (req, res) => {
    try {
        const docRef = doc(db, "forum", req.params.id);
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

// like a discussion post
router.put("/:id", async (req, res) => {
    try {
        const forumId = req.params.id;
        const currentLikes = req.body.currentLikes;
        console.log(req)
        console.log(forumId)
        console.log(currentLikes);
        await updateDoc(doc(db, "forum", forumId), {
            likes: currentLikes + 1,
        });
        res.status(200).json({ message: "success" });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;