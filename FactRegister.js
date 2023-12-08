import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  
const [subjectCode, setsubjectCode] = useState("");
const [labschedday, setLabSchedDay] = useState("");
const [labtimestart, setLabTimeStart] = useState("");
const [labtimeends, setLabTimeEnds] = useState("");
const [labroom, setLabRoom] = useState("");
const [lecschedday, setLetSchedDay] = useState("");
const [lectimestart, setLecTimeStart] = useState("");
const [lectimeends, setLecTimeEnds] = useState("");
const [lecroom, setLecRoom] = useState("");
const [facultyname, setFacultyName] = useState("");

const addFactRecord = () => {
  Axios.post("http://localhost:3001/register", {
      subjectCode : subjectCode,
      labschedday : labschedday,
      labtimestart : labtimestart,
      labtimeends : labtimeends,
      labroom : labroom,
      lecschedday : lecschedday,
      lectimestart : lectimestart,
      lectimeends : lectimeends,
      lecroom : lecroom,
      facultyname : facultyname,
      }).then(() => {
        alert("THANK YOU FOR YOUR REGISTRATION");
    });
  };
  return (
    <div className="App">
        <h1>Schedule Form</h1>
        <label>Subject Code</label>
        <input type='text' onChange={(e) => {
          setsubjectCode(e.target.value);
        }}/>
        <label>Laboratory Schedule Day</label>
        <input type='text' onChange={(e) => {
          setLabSchedDay(e.target.value);
        }}/>
        <label>Laboratory Time Start</label>
        <input type='time' onChange={(e) => {
          setLabTimeEnds(e.target.value);
        }}/>
        <label>Laboratory Time Ends</label>
        <input type='time' onChange={(e) => {
          setLabTimeStart(e.target.value);
        }}/>
        <label>Laboratory Room</label>
        <input type='text' onChange={(e) => {
          setLabRoom(e.target.value);
        }}/>
        <label>Lecture Schedule Day</label>
        <input type='text' onChange={(e) => {
          setLetSchedDay(e.target.value);
        }}/>
        <label>Lecture Time Start</label>
        <input type='time' onChange={(e) => {
          setLecTimeStart(e.target.value);
        }}/>
        <label>Lecture Time Ends</label>
        <input type='time' onChange={(e) => {
          setLecTimeEnds(e.target.value);
        }}/>
        <label>Lecture Room</label>
        <input type='text' onChange={(e) => {
          setLecRoom(e.target.value);
        }}/>
        <label>Faculty Name</label>
        <input type='text' onChange={(e) => {
          setFacultyName(e.target.value);
        }}/>

        <button onClick={addFactRecord}>Submit</button>
    </div>
  );
}

export default App;
