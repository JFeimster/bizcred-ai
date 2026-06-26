import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './styles/tokens.css';
import './styles/dashboard.css';
import './styles/cards.css';
import './styles/forms.css';
import './styles/tables.css';
import './styles/badges.css';
import './styles/alerts.css';
import './styles/print.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
