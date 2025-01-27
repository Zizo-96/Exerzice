const axios = require('axios');
const Exercise = require('../models/exerciseModel');
require('dotenv').config();

const fetchExercisesFromAPI = async () => {
  const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises',
    params: {limit: '600'},
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

    // Save or update exercises in the database
    for (const exerciseData of exercisesData) {
      const existingExercise = await Exercise.findOne({ id: exerciseData.id });
      
      if (!existingExercise) {
        // If exercise doesn't exist, create a new one
        await Exercise.create(exerciseData);
      } else {
        // If exercise exists, check if the GIF has changed
        if (existingExercise.gifUrl !== exerciseData.gifUrl) {
          // If the GIF URL is different, update the record with the new GIF URL
          existingExercise.gifUrl = exerciseData.gifUrl;
          await existingExercise.save();
          console.log(`Exercise with id ${exerciseData.id} updated with new GIF URL.`);
        }
      }
    }

    console.log('Exercises saved/updated successfully.');
  } catch (error) {
    console.error('Error saving/updating exercises to database:', error);
  }
};

// Call the function to save exercises to the database
// saveExercisesToDatabase();

module.exports = saveExercisesToDatabase;
