const axios = require('axios');
const Exercise = require('../models/exerciseModel');
require('dotenv').config();

const fetchExercisesFromAPI = async () => {
  const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises',
    params: {limit: '200'},
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from API:', error);
  }
};

const saveExercisesToDatabase = async () => {
  try {
    // Fetch exercises from the API
    const exercisesData = await fetchExercisesFromAPI();

    // Save exercises to MongoDB if they don't already exist
    for (const exerciseData of exercisesData) {
      const existingExercise = await Exercise.findOne({ id: exerciseData.id });
      if (!existingExercise) {
        await Exercise.create(exerciseData);
      }
    }

    console.log('Exercises saved to database successfully.');
  } catch (error) {
    console.error('Error saving exercises to database:', error);
  }
};

// Call the function to save exercises to the database
// saveExercisesToDatabase();

module.exports = saveExercisesToDatabase;