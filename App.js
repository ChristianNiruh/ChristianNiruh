// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FacultyRegistration from './FactRegister';
import FactList from './FacultyList';
import FacultyDetails from './Facultydetails';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/FactRegister">Registration</Link></li>
          <li><Link to="/FacultyList">View Records</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/FactRegister" element={<FacultyRegistration />} />
        <Route path="/FacultyList" element={<FactList />} />
        <Route path="/View/:schedID" element={<FacultyDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
