const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'deita123',
    database: 'dbenroll_deita',
});

app.post("/register", (req, res) => {
    const subjectCode  = req.body.subjectCode;
    const LabSchedDay = req.body.labschedday;
    const LabTimeStart = req.body.labtimestart;
    const LabTimeEnds = req.body.labtimeends;
    const LabRoom = req.body.labroom;
    const LecSchedDay = req.body.lecschedday;
    const LecTimeStart = req.body.lectimestart;
    const LecTimeEnds = req.body.lectimeends;
    const LecRoom = req.body.lecroom;
    const FacultyName = req.body.facultyname;

    db.query(
        'INSERT INTO tblsched_deita (SubjectCode, LabSchedDay, LabTimeStart, LabTimeEnds, LabRoom, LecSchedDay, LecTimeStart, LecTimeEnds, LecRoom, FacultyName) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [subjectCode, LabSchedDay, LabTimeStart, LabTimeEnds, LabRoom, LecSchedDay, LecTimeStart, LecTimeEnds, LecRoom, FacultyName], 
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    );
});

app.get('/facultylist', (req, res) => {
    const facultylistQuery = 'SELECT * FROM tblsched_deita';
    db.query(facultylistQuery, (err, result) => {
      if (err) {
        console.error('Error fetching faculty list:', err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    });
  });

// Update the backend endpoint to handle individual record
app.get('/record/:id', (req, res) => {
    const schedId = req.params.id;
    const recordQuery = 'SELECT * FROM tblsched_deita WHERE SchedID = ?';
  
    db.query(recordQuery, [schedId], (err, result) => {
      if (err) {
        console.error('Error fetching faculty record:', err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Check if a record was found
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ error: 'Record not found' });
        }
      }
    });
  });
  
  
  app.delete('/delete/:id', (req, res) => {
    const schedId = req.params.id;
    const deleteQuery = 'DELETE FROM tblsched_deita WHERE SchedID = ?';
  
    db.query(deleteQuery, [schedId], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Data not found' });
      }
      res.status(200).json({ message: 'Data Deleted' });
    });
  });

app.listen(3001, () => {
    console.log("Stress na akong bangs!!!");
});