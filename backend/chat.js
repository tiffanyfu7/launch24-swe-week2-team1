const express = require("express");
const router = express.Router();

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc, getDoc } = require("firebase/firestore");

router.get("/", async (req, res) => {
    try {
        let ret = [];
        const docRef = await getDocs(collection(db, "chat"));
        // console.log("docRef from chat in backend", docRef);

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
        const docRef = doc(db, "chat", req.params.id);
        console.log("get chat from chatid:", req.params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            res.status(200).json(docSnap.data());
            console.log("data from get chat from chatid:", docSnap.data());
        } else {
            console.log("Document does not exist");
        }
    } catch (e) {
        res.status(400).json({error: `Error fetching user data ${e}`})
    }
})

router.put("/:id", async (req, res) => {
    try {
        const docRef = doc(db, "chat", req.params.id);
        console.log("post chat from chatid:", req.params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            res.status(200).json(docSnap.data());
            console.log("data from get chat from chatid:", docSnap.data());
        } else {
            console.log("Document does not exist");
        }
    } catch (e) {
        res.status(400).json({error: `Error fetching user data ${e}`})
    }
})

// // add post
// app.post("/post", async (req, res) => {
//     try {
//         const chatId = req.body.chatId;
//         const message = req.body.message;

//         const docRef = await addDoc(collection(db, "chat"), {
//             username: username,
//             message: message
//         });
//         res.status(200).json({message: `Successfully added post to firebase with id: ${docRef.id}`});
//     } catch(e) {
//         res.status(400).json({error: `Error adding post with ${e.message} error`})
//     }

// })

module.exports = router;