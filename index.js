require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static('public'));
app.use(express.json());

app.use('/api', require('./router/upload'));

app.listen(process.env.PORT, () => {
  console.log(`The server is running in port ${process.env.PORT}`);
});
