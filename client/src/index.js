import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette:{
    primary: {
      main: '#144272'
    },
    secondary: {
      main: '#7366FF',
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
