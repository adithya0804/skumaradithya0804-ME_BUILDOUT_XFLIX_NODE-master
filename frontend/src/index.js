import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import{ BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import dark from "./theme";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
    <ThemeProvider theme={dark}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider
            maxSnack={1}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            preventDuplicate
          >
          <App />
        </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>,
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
