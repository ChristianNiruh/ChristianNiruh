import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FactList = () => {
  const [faculty, setFaculty] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/facultylist');
        const data = await response.json();
        console.log('Data:', data);  // Log the data to the console
        setFaculty(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, []);

  const handleView = (schedID) => {
    navigate(`/View/${schedID}`);
  };
  

  const handlePrint = async (schedID) => {
    try {
      // Add logic to update PrintStatus to 0 for the given schedID
      // ... (make a fetch request to update PrintStatus to 0 for the specific record)

      // After updating PrintStatus, trigger the print functionality
      window.print();
    } catch (error) {
      console.error('Error handling print:', error);
    }
  };

  return (
    <div>
      <h1>Schedule List</h1>

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
          {faculty.map((facultyItem) => (
            <tr key={facultyItem.SchedID}>
              <td>{facultyItem.SubjectCode}</td>
              <td>{facultyItem.LabSchedDay}</td>
              <td>{facultyItem.LabTimeStart}</td>
              <td>{facultyItem.LabTimeEnds}</td>
              <td>{facultyItem.LabRoom}</td>
              <td>{facultyItem.LecSchedDay}</td>
              <td>{facultyItem.LectTimeStart}</td>
              <td>{facultyItem.LecTimeEnds}</td>
              <td>{facultyItem.LecRoom}</td>
              <td>{facultyItem.FacultyName}</td>
              <td>
                <Link to={`/View/${facultyItem.SchedID}`}>
                  <button onClick={() => handleView(facultyItem.SchedID)}>View</button>
                </Link>
              </td>
              <td>
                {facultyItem.PrintStatus === 1 && (
                  <button onClick={() => handlePrint(facultyItem.SchedID)}>Print</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FactList;
