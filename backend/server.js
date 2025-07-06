// const { parse } = require('dotenv');
// const express = require('express')
// require('dotenv').config()
// const { MongoClient } = require('mongodb');
// const bodyparser = require('body-parser')
// const cors = require("cors");

// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// const port = 3000
// const app = express()
// app.use(cors())

// // Database Name
// const dbName = 'PassMag';
// client.connect();
// app.use(bodyparser.json())


// //get all password
// app.get('/', async (req, res) => {
//   const db = client.db(dbName);
//   const collection = db.collection('documents');
//   const findResult = await collection.find({}).toArray();
//   res.send(findResult)

// })

// //save all password
// app.post('/', async (req, res) => {
//   const password = req.body
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const findResult = await collection.insertOne(password);
//   res.send({success: true ,find : findResult} )

// })
// //delete password
// app.post('/', async (req, res) => {
//   const password = req.body
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const findResult = await collection.deleteOne(password);
//   res.send({success: true ,find : findResult} )

// })

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })
const express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PassMag';

app.use(cors());
app.use(bodyParser.json());

client.connect();

// GET all passwords
app.get('/passwords', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
});

// ADD a new password
app.post('/add', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.insertOne(password);
  res.send({ success: true, result });
});

// DELETE a password (example: by _id or some field)
app.delete('/delete', async (req, res) => {
  const password = req.body; // e.g., { _id: "..." } or { site: "gmail" }
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne(password);
  res.send({ success: true, result });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
