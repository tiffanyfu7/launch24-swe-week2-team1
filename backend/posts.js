// require(“dotenv”).config()

const express = require("express");
const router = express.Router;

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } = require("firebase/firestore");

// router.get("/", (req, res) => {
//     const s
// })




module.exports = router;