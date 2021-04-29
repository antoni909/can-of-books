'use strict';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3001;
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

// requiring the model AFTER running mongoose.connect -- connect to the DB before dealing with the things
const User = require('./models/User');

app.get('/', (request, response) => {
  response.send('hello from the test, root/home');
});

// seed the database with some items so we can retrieve them
// create routes and callbacks

const firstUser = new User({
  
})

app.listen(PORT, ()=> console.log(`server listens on PORT:${PORT}`));
