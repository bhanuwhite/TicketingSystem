const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const authRoute = require('./routers/router');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/uploads', express.static('uploads'))

require('./db/connections');

app.use('/api',authRoute);
// const ipAddress = '192.168.0.103'; 
 const ipAddress = '192.168.0.103'; 


app.listen(PORT ,ipAddress, ()=>{
    console.log(`Server is running on the port ${PORT}`);
}) 