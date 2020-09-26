import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import './index.css';
import App from './components/App';

const theme = {
    accent: '#29cacf',
    text: '#0f0f0f',
    white: '#fff',
    grey: '#ddd',
};

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    , document.getElementById('root'),
);
