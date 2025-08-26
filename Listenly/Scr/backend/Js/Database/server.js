/* teste conexão de dados

import mongoose from "mongoose";

const mongoose = require("mongoose");

const connectToDatabase = require("./database")

connectToDatabase();

mongoose.connect("mongodb+srv://flow:uni9@dorokiw.xvrlqme.mongodb.net/?retryWrites=true&w=majority&appName=Dorokiw", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error (error));
db.open("open"), () => console.log("📦 connect to the datebase")

*/
