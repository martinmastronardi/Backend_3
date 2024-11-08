require('dotenv').config();
const express = require('express');
const connectDB = require('./database/connection');
const mocksRouter = require('./routes/mocks.router');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/mocks', mocksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
