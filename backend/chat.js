const express = require("express");
const router = express.Router();

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc, getDoc } = require("firebase/firestore");

router.get("/", async (req, res) => {
    try {
        let ret = [];
        const docRef = await getDocs(collection(db, "chat"));
        console.log("docRef from chat in backend", docRef);

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
        //const docRef = db.collection('chat').doc(req.params.id);
        
        const docRef = doc(db, "chat", req.params.id);
        console.log(docRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // Document data
            res.status(200).json(docSnap.data());
        } else {
            console.log("Document does not exist");
        }
    } catch (e) {
        res.status(400).json({error: `Error fetching user data ${e}`})
    }
})

module.exports = router;