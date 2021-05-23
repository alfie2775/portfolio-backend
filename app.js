const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
dotenv.config();
var db;
const app = express();
const client = new MongoClient(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).connect();

client.then((client) => {
  console.log("Connected to database");
  db = client.db("Mails");
});
app.use(cors());
app.use(express.json());
app.post("/send-message", (req, res) => {
  db.collection("mails")
    .insertOne({ ...req.body })
    .then(() => res.send({ success: true }))
    .catch((err) => res.send({ success: false, err }));
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
);
