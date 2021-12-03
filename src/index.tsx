import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import App from './App';
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";


ReactDOM.render(
    <BrowserRouter>
        <CssBaseline />
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </BrowserRouter>,
  document.getElementById('root')
);