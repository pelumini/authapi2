const express = require('express');
const app = express();

const { mongourl, port } = require('./config/keys');

app.listen(port || 5000, () => console.log(`Express Server is running on port ${port}`));

