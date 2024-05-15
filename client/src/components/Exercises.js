import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

function Exercise() {
  const [exercises, setExercises] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [
    'Chest',
    'Back',
    'Waist',
    'Shoulders',
    'Upper Arms',
    'Lower Arms',
    'Upper Legs',
    'Lower Legs',
    'Cardio'
  ];
  const exercisesPerPage = 9;

  useEffect(() => {
    // Fetching exercises from the backend API
    axios
      .get('https://cuddly-memory-jj56px57x475f5vwg-8000.app.github.dev/exercises')
      .then((response) => {
        setExercises(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error);
      });
  }, []);

  const handlePageChange = (event, value) => {
    setPageIndex(value - 1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setPageIndex(0); // Reset pageIndex when selecting a new category
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPageIndex(0); // Reset pageIndex when performing a search
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.bodyPart.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleExercises = selectedCategory
    ? filteredExercises.filter((exercise) => exercise.bodyPart.toLowerCase() === selectedCategory.toLowerCase())
    : filteredExercises.slice(pageIndex * exercisesPerPage, (pageIndex + 1) * exercisesPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <TextField
          label="Search Exercise"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ margin: 3 , width: 600 }}
        />
      </Box>
      <Grid container justifyContent="center" spacing={2} mb={2}>
        {categories.map((category) => (
          <Grid item key={category}>
            <Button
              variant={selectedCategory === category ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
        {visibleExercises.map((exercise) => (
          <Card
            key={exercise.id}
            sx={{
              width: 400,
              height: 400,
              background: `url(${exercise.gifUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              margin: 1,
              transition: 'transform 0.3s, border-color 0.3s',
              border: '2px solid transparent',
              '&:hover': {
                transform: 'scale(1.05)',
                borderColor: 'primary.main',
              },
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <Typography variant="h5" component="h2">
                  {exercise.name}
                </Typography>
                <Typography variant="body2" component="p">
                  Body Part: {exercise.bodyPart}
                </Typography>
                <Typography variant="body2" component="p">
                  Equipment: {exercise.equipment}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Instructions:</strong>
                </Typography>
              </div>
              <div>
                {exercise.instructions.map((instruction, index) => (
                  <Typography key={index} variant="caption" component="p" sx={{ fontSize: '0.8rem', paddingTop: 1 }}>
                    {index + 1}. {instruction}
                  </Typography>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(filteredExercises.length / exercisesPerPage)}
          color="primary"
          onChange={handlePageChange}
          page={pageIndex + 1}
          sx={{ margin: 2 }}
          shape='rounded'
        />
      </Box>
    </Box>
  );
}

export default Exercise;
