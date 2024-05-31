const express = require("express");
const router = express.Router();

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc, getDoc } = require("firebase/firestore");

router.get("/", async (req, res) => {
    try {
        let ret = [];
        const docRef = await getDocs(collection(db, "messages"));
        console.log("docRef from messages in backend", docRef);

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
        const docRef = doc(db, "messages", req.params.id);
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

router.post("/:id", async (req, res) => {
    try {
        const chatId = req.body.chatId;
        const date = req.body.date;
        const message = req.body.message;
        const senderId = req.body.senderId;

        const docRef = await addDoc(collection(db, "messages"), {
            chatId: chatId,
            date: date,
            message: message,
            senderId: senderId
        });

        // Retrieve the existing chat document
        const chatDocRef = doc(db, "chat", "hTec14wd5pSZxNQwanR7");
        const chatDocSnapshot = await getDoc(chatDocRef);
        console.log("chat doc snapshot", chatDocSnapshot.data());
        
        if (!chatDocSnapshot.exists()) {
            return res.status(404).json({ error: "Chat document not found" });
        }

        // Get the current messages array
        const currentMessages = chatDocSnapshot.data().messages || [];

        console.log("current messages", currentMessages);

        currentMessages.push(docRef.id);
        console.log("new current messages", currentMessages);

        // await updateDoc(chatDocRef, {
        //     messages: currentMessages,
        // })

        res.status(200).json({message: `Successfully added message to firebase with id: ${docRef.id}`});
    } catch(e) {
        res.status(400).json({error: `Error adding message with ${e.message} error`})
    }
})

module.exports = router;