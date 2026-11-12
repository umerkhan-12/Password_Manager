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
const express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PassMag';

// Only the local frontend may call this API (was: any website).
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '10kb' }));

client.connect();

const isShortString = (value, max = 512) =>
  typeof value === 'string' && value.length > 0 && value.length <= max;

// GET all passwords
app.get('/passwords', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}, { projection: { _id: 0 } }).toArray();
  res.send(findResult);
});

// ADD a new password: store only the expected string fields, never the raw body.
app.post('/add', async (req, res) => {
  const { site, username, password, id } = req.body || {};
  if (![site, username, password, id].every((value) => isShortString(value))) {
    return res.status(400).send({ success: false, error: 'site, username, password and id must be non-empty strings' });
  }
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.insertOne({ site, username, password, id });
  res.send({ success: true, result });
});

// DELETE a password by its id only. Passing the raw body as the filter let a
// caller send {} or operators like {"$ne": ...} and delete arbitrary entries.
app.delete('/delete', async (req, res) => {
  const { id } = req.body || {};
  if (!isShortString(id, 100)) {
    return res.status(400).send({ success: false, error: 'id must be a string' });
  }
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne({ id });
  res.send({ success: true, result });
});

// Listen on localhost only so other devices on the network cannot read the vault.
app.listen(port, '127.0.0.1', () => {
  console.log(`Server listening at http://localhost:${port}`);
});
