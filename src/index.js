import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom/';
import AuthContextProvider from './Store/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <BrowserRouter basename='/MAIL-BOX-CLIENT'>
    <App />
    </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
  
);

