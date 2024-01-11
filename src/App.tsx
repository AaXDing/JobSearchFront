import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./scripts/Login";
import Register from "./scripts/Register";
import Favorite from "./scripts/Favorite";
import SearchJob from './scripts/Search';
import RecommendJob from './scripts/Recommend';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/search" element={<SearchJob />} />
          <Route path="/recommend" element={<RecommendJob />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;