const Exercise = require('../models/Exercise');

const getAllExercises = async (req, res) => {
  try {
    // Find all exercises in the database and send them
    const exercises = await Exercise.find();
    res.status(200).send(exercises);
  } catch (error) {
    res.status(500).send({ message: 'Error getting exercises', error: error.message });
  }
};

module.exports = { getAllExercises };