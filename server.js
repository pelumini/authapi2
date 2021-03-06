const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { mongourl, port } = require('./config/keys');
const userRouter = require('./routes/user');

// Connect to MongoDB
mongoose.connect(mongourl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Essential Middlewares
app.use(cookieParser());
app.use(express.json());

// Routes
app.get('/', (req, res)  => {
    res.send('Welcome to Authentication API v2');
});

app.use('/api/v1/user', userRouter);

app.listen(port || 5000, () => console.log(`Express Server is running on port ${port}`));

