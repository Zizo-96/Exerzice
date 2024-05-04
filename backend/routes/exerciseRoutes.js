const express = require('express');
const router = express.Router();
const getAllExercises = require('../controllers/exerciseController');

// Route to get all exercises
router.get('/', getAllExercises);

module.exports = router;