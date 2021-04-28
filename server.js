'use strict';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3001;
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

app.listen(PORT, ()=> console.log(`server listens on PORT:${PORT}`));
