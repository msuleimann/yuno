import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyListing from './pages/PropertyListing';
import PropertyDetails from './pages/PropertyDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertyListing />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
