import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      // theme="light"
      transition={Bounce}
    />
    <App />
  </React.StrictMode>,
)
