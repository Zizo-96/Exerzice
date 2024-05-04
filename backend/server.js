const express = require("express");
const cors = require("cors");
const connectDB = require('./connection');
const userRoutes = require('./routes/userRoutes');
const app = express();
require('dotenv').config();
const port = process.env.PORT_NUMBER || 8000;

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

connectDB();

app.listen (port, ()=>{
    console.log(`App is listening on ${port}`)
});