const express = require('express');
const app = express();
const connectDB = require('./src/db');
const trackerRouter = require('./src/routes/tracker');
const trackRouter = require('./src/routes/track');
require('dotenv').config();

connectDB();

app.use(express.static('public'));

app.use(trackerRouter);

app.use('/track', trackRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));