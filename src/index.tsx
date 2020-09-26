import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGrimace, faHeart, faBug, faBox } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'styled-components';
import './index.css';
import App from './components/App';

library.add(faGrimace, faHeart, faBug, faBox);

const theme = {
    accent: '#29cacf',
    text: '#0f0f0f',
    white: '#fff',
    grey: '#ddd',
};

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root'),
);
