import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EnrollmentList from "./components/EnrollmentList";
import AddEnrollment from "./components/AddEnrollment";
import CourseList from "./components/CourseList";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4e73df",
    },
    secondary: {
      main: "#1cc88a",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

function App() {



  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <h1>LMS Frontend</h1>
          <AppBar position="static" color="primary">
            <Toolbar style={{ gap: "20px" }}>
              <Button color="inherit" component={Link} to="/students">Student List</Button>
              <Button color="inherit" component={Link} to="/add-student">Add Student</Button>
              <Button color="inherit" component={Link} to="/enrollments">Enrollment List</Button>
              <Button color="inherit" component={Link} to="/add-enrollment">Add Enrollment</Button>
              <Button color="inherit" component={Link} to="/courses">Course List</Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/students" element={<StudentList />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/enrollments" element={<EnrollmentList />} />
            <Route path="/add-enrollment" element={<AddEnrollment />} />
            <Route path="/courses" element={<CourseList />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
