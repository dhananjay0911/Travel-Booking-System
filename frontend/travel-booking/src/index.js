import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import client from "./apolloClient";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
            <ToastContainer 
                position="top-center" // Toast appears in the middle of the page
                autoClose={2000} // Closes after 2 seconds
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
            />
        </BrowserRouter>
    </ApolloProvider>
);
