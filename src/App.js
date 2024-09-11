
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated for v6
import EnvironmentalDashboard from './components/EnvironmentalDashboard';
import FinanceDashboard from './components/FinanceDashboard';
import HRDashboard from './components/HRDashboard';
import Sidebar from './components/Sidebar';
import './styles.css'; 


function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
        <Route path="/environmental" element={<EnvironmentalDashboard />} />
        <Route path="/finance" element={<FinanceDashboard />} />
        <Route path="/hr" element={<HRDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
