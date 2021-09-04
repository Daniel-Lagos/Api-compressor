require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());


app.listen(process.env.PORT, () => {
  console.log(`The server is running in port ${process.env.PORT}`);
});
