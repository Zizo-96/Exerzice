const express = require("express");
const cors = require("cors");
const connectDB = require('./connection');
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const saveExercisesToDatabase = require('./services/exerciseService');

const app = express();
require('dotenv').config();
const port = process.env.PORT_NUMBER || 8000;

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/exercise', exerciseRoutes);

connectDB();
// saveExercisesToDatabase();

app.listen (port, ()=>{
    console.log(`App is listening on ${port}`)
});