import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';

const programs = [
  {
    id: 1,
    name: '3-Day Beginner Program',
    days: [
      {
        day: 'Day 1 Push (Chest, Shoulders and Triceps)',
        exercises: ['0025', '0047', '0188', '0290', '0192', '1722', '1723'],
      },
      {
        day: 'Day 2 Pull (Back, Rear delt, Biceps)',
        exercises: ['0017', '0007', '0027', '0095', '0204', '0285', '0165', '0031'],
      },
      {
        day: 'Day 3 Legs (Legs, Abs)',
        exercises: ['0043', '0032', '0339', '0108', '1371', '0175', '0006'],
      },
    ],
  },
  {
    id: 2,
    name: '4-Day Intermediate Program',
    days: [
      {
        day: 'Day 1',
        exercises: ['0027'],
      },
    ],
  },
];

function Programs() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (selectedDay && selectedDay.exercises.length > 0) {
      // Fetching exercises by IDs from the backend
      const ids = selectedDay.exercises.join(',');
      axios
        .get(`https://cuddly-memory-jj56px57x475f5vwg-8000.app.github.dev/exercises/by-ids?ids=${ids}`)
        .then((response) => {
          setExercises(response.data);
        })
        .catch((error) => {
          console.error('Error fetching exercises:', error);
        });
    } else {
      setExercises([]);
    }
  }, [selectedDay]);

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setSelectedDay(null);
    setExercises([]);
  };

  const handleDayClick = (day) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Programs
      </Typography>
      <Grid container spacing={2}>
        {programs.map((program) => (
          <Grid item key={program.id} xs={12} sm={6} md={4} lg={3}>
            <Button
              variant={selectedProgram === program ? 'contained' : 'outlined'}
              fullWidth
              onClick={() => handleProgramClick(program)}
            >
              {program.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      {selectedProgram && (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {selectedProgram.name}
            </Typography>
            {selectedProgram.days.map((day) => (
              <Box key={day.day} sx={{ marginTop: 2 }}>
                <Button
                  variant={selectedDay === day ? 'contained' : 'outlined'}
                  fullWidth
                  onClick={() => handleDayClick(day)}
                >
                  {day.day}
                </Button>
                {selectedDay === day && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 3,
                      cursor: 'pointer',
                      marginTop: 2,
                    }}
                  >
                    {day.exercises.map((exerciseId) => {
                      const exercise = exercises.find((ex) => ex.id === exerciseId);
                      if (!exercise) return null;
                      return (
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
                          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <Typography variant="h5" component="h2">
                              {exercise.name}
                            </Typography>
                            <Typography variant="body2" component="p">
                              Body Part: {exercise.bodyPart}
                            </Typography>
                            <Typography variant="body2" component="p">
                              Equipment: {exercise.equipment}
                            </Typography>
                            <Box sx={{ marginTop: 2 }}>
                              <Typography variant="body2" component="p">
                                <strong>Instructions:</strong>
                              </Typography>
                              <Box>
                                {exercise.instructions.map((instruction, index) => (
                                  <Typography key={index} variant="caption" component="p" sx={{ fontSize: '0.8rem', paddingTop: 1 }}>
                                    {index + 1}. {instruction}
                                  </Typography>
                                ))}
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Box>
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default Programs;
