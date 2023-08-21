import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home';
import Wizardhome from './components/wizard/wizardhome';
import { Toaster } from 'react-hot-toast';
import Sucess from './components/sucess';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster />
        {/* Any common components or layout you want to include on all pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wizardhome" element={< Wizardhome/>} /> 
          <Route path="/success" element={< Sucess/>} /> 

          {/* Additional routes for other pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
