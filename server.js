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
const User = require('./models/User.js');

//test the server
app.get('/', (request, response) => {
  response.send('hello from the test, root/home');
});

// seed the database with some items so we can retrieve them
// create routes and callbacks

// eslint-disable-next-line no-unused-vars
const firstUser = new User({
  email: 'kassie.r.bradshaw@gmail.com',
  books: [
    { name: 'Harry Potter',
      description: 'Magical stuff',
      status: 'some status'},
    { name: 'Green eggs and ham',
      description: 'Dr Seuss',
      status: 'Some status'},
    { name: 'Ghost Boy',
      description: 'An albino boy runs away and joins the circus to teach elephants how to play baseball',
      status: 'Read'},
  ]
});
// eslint-disable-next-line no-unused-vars
const secondUser = new User({
  email: 'lorenzo.antonio.090@gmail.com',
  books: [
    { name: 'One Fish, Two Fish, Red Fish, Blue Fish',
      description: 'More Dr Seuss',
      status: 'Lorenzos favorite book'},
    { name: 'Why Evolution Is True',
      description: 'Because it is',
      status: 'Read it'},
    { name: 'Selfish Gene',
      description: 'Genetics Evolution',
      status: 'Read'},
  ]
});
// save the Seeded Data
// firstUser.save();
// secondUser.save(function (err) {
//   if (err) console.log(err);
//   else console.log('books are cool', firstUser);
// });

app.get('/users', (request, response) => {
  console.log(User.find({}));
  User.find((err, userResults) => {
    console.log(userResults);
    response.send(userResults);
  });
});

const getBooks = ((request, response) => {
  User.find({email: request.query.email}, (err, bookResults) => {
    if(err) return console.error(err);
    else response.status(200).send(bookResults);
    console.log('my RSPN',bookResults);
  });
});
// why does app.get need to go after getBooks function?
app.get('/books', getBooks);

app.listen(PORT, ()=> console.log(`server listens on PORT:${PORT}`));
