const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { mongourl, port } = require('./config/keys');

// Connect to MongoDB
mongoose.connect(mongourl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Essential Middlewares
app.use(cookieParser());
app.use(express.json());

app.listen(port || 5000, () => console.log(`Express Server is running on port ${port}`));

