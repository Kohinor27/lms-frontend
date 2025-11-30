import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EnrollmentList from "./components/EnrollmentList";
import AddEnrollment from "./components/AddEnrollment";
import CourseList from "./components/CourseList";

function App() {
  return (
    <Router>
      <div>

        <h1>LMS Frontend</h1>

        <nav>
          <ul> 
          <li><Link to="/students">Student List</Link></li>
          <li><Link to="/add-student">Add Student</Link></li>
          <li><Link to="/enrollment">Enrollment List</Link></li>
          <li><Link to="/add-enrollment">Add Enrollment</Link></li>
          <li><Link to="/courses">Course List</Link></li>
          </ul>
        </nav>

        <Routes>
           <Route path="/students" element={<StudentList />} />
           <Route path="/add-student" element={<AddStudent />} />
           <Route path="/enrollments" element={<EnrollmentList />} />
           <Route path="/add-enrollment" element={<AddEnrollment />} />
           <Route path="/courses" element={<CourseList />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
