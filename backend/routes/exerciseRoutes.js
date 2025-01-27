const express = require('express');
const router = express.Router();
const { getAllExercises, getExercisesByIds } = require('../controllers/exerciseController');

router.get('/', getAllExercises);
router.get('/by-ids', getExercisesByIds);

module.exports = router;