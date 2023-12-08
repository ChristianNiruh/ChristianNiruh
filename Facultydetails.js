import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FacultyDetails = () => {
  const [facultyDetails, setFacultyDetails] = useState({});
  const { schedID } = useParams();

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        if (!schedID) {
          // Handle the case where schedID is undefined
          // You can redirect the user or display an error message
          console.error('Error: Faculty ID is undefined');
          return;
        }
  
        const response = await axios.get(`http://localhost:3001/record/${schedID}`);
        setFacultyDetails(response.data);
      } catch (error) {
        console.error('Error Fetching Faculty Details:', error);
      }
    };
  
    fetchFacultyDetails();
  }, [schedID]);
  

  const fetchData = async () => {
    // Define the fetchData function
    try {
      const response = await axios.get('http://localhost:3001/facultylist');
      setFacultyDetails(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (SchedId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this data?');

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/delete/${SchedId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      
      <h1>Schedule Time</h1>

      <table>
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Laboratory Schedule</th>
            <th>Laboratory Time Start</th>
            <th>Laboratory Time Ends</th>
            <th>Laboratory Room</th>
            <th>Lecture Schedule</th>
            <th>Lecture Time Start</th>
            <th>Lecture Time Ends</th>
            <th>Lecture Room</th>
            <th>Faculty Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr key={facultyDetails.schedID}>
            <td>{facultyDetails.SubjectCode}</td>
            <td>{facultyDetails.LabSchedDay}</td>
            <td>{facultyDetails.LabTimeStart}</td>
            <td>{facultyDetails.LabTimeEnds}</td>
            <td>{facultyDetails.LabRoom}</td>
            <td>{facultyDetails.LecSchedDay}</td>
            <td>{facultyDetails.LectTimeStart}</td>
            <td>{facultyDetails.LecTimeEnds}</td>
            <td>{facultyDetails.LecRoom}</td>
            <td>{facultyDetails.FacultyName}</td>
            <td>
              <button onClick={() => handleDelete(facultyDetails.SchedID)}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FacultyDetails;
