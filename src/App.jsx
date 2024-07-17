import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import IdentifyName from './Components/IdentifyName';
import IdentifyEmotion from './Components/IdentifyEmotions';
import NavBar from './Components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/identify-name" element={<IdentifyName  />} />
        <Route path="/identify-object" element={<div>Identify Object Component</div>} />
        <Route path="/identify-emotion" element={<IdentifyEmotion />} />
      </Routes>
    </Router>
  );
};

export default App;
