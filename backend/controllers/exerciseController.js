const Exercise = require('../models/exerciseModel');

const getAllExercises = async (req, res) => {
  try {
    // Find all exercises in the database and send them
    const exercises = await Exercise.find();
    res.status(200).send(exercises);
  } catch (error) {
    res.status(500).send({ message: 'Error getting exercises', error: error.message });
  }
};

const getExercisesByIds = async (req, res) => {
  const { ids } = req.query; // Expecting an array of IDs in the query parameters
  try {
    const exercises = await Exercise.find({ id: { $in: ids.split(',') } });
    res.status(200).send(exercises);
  } catch (error) {
    res.status(500).send({ message: 'Error getting exercises by IDs', error: error.message });
  }
};

module.exports = {
  getAllExercises,
  getExercisesByIds,
};
