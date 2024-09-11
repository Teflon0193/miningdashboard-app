import React from 'react';
import { Link } from 'react-router-dom';



const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <Link to="/finance">Finance Dashboard</Link>
      <Link to="/hr">HR Dashboard</Link>
      <Link to="/supply-chain">Supply Chain Management</Link>
      <Link to="/production">Production</Link>
      <Link to="/environmental">Environmental Management</Link>
      <Link to="/project">Project Management</Link>
    </div>
  );
};

export default Sidebar;
