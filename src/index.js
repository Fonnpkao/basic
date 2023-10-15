import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Register from './component/Register';
import HomePage from './component/Homepage';
import Playlist from './component/PlayList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/HomePage" element={<HomePage/>} />
        <Route path="/Playlist" element={<Playlist/>} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
