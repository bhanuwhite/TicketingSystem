const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser')
const authRoute = require('./routers/router');
const cookieParser = require('cookie-parser');
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(express.static('public'));
require('./db/connections');

app.use('/api', authRoute);
const ipAddress = '192.168.0.240';


app.listen(PORT, ipAddress, () => {
  console.log(`Server is running on the port ${PORT}`);
}) 