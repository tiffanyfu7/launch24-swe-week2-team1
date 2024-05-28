require("dotenv").config();
//console.log(process.env)

const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } = require("firebase/firestore");

const cors = require("cors");
app.use(cors());

const postsRouter = require("./posts");
const userRouter = require("./user");
const chatmessagesRouter = require("./chatmessages");

app.use("/posts", postsRouter);
app.use("/users", userRouter);
app.use("/chatmessages", chatmessagesRouter);

app.listen(port, () => {console.log(`successfully connected to port ${port}`)})

