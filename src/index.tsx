import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {StateProvider} from './context-api/Provider'
import reportWebVitals from './reportWebVitals';
import reducer, { initialState } from './context-api/reducer';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette:{
      type:"light"
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <React.StrictMode>
      <CssBaseline/>
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
