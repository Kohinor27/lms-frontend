import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import Login from "./components/Login";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EnrollmentList from "./components/EnrollmentList";
import AddEnrollment from "./components/AddEnrollment";
import CourseList from "./components/CourseList";
import RoleRoute from "./components/RoleRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

const theme = createTheme({
  palette: {
    primary: { main: "#4e73df" },
    secondary: { main: "#1cc88a" },
  },
  shape: {
    borderRadius: 10,
  },
});

function NavBar() {
  const { user, logout } = useAuth();

  if (!user) return null;
  console.log(user)

  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ gap: "20px" }}>
        <Button color="inherit" component={Link} to="/courses">
          Courses
        </Button>

        {user.groups?.includes("admin") && (
          <>
            <Button color="inherit" component={Link} to="/students">
              Students
            </Button>
            <Button color="inherit" component={Link} to="/add-student">
              Add Student
            </Button>
            <Button color="inherit" component={Link} to="/enrollments">
              Enrollments
            </Button>
            <Button color="inherit" component={Link} to="/add-enrollment">
              Add Enrollment
            </Button>
          </>
        )}

        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <NavBar />

          <Routes>
            {/* PUBLIC */}
            <Route path="/login" element={<Login />} />

            {/* PROTECTED */}
            <Route
              path="/courses"
              element={
                <RoleRoute allowedRoles={["student", "teacher", "admin"]}>
                  <CourseList />
                </RoleRoute>
              }
            />

            <Route
              path="/students"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <StudentList />
                </RoleRoute>
              }
            />

            <Route
              path="/add-student"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <AddStudent />
                </RoleRoute>
              }
            />

            <Route
              path="/enrollments"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <EnrollmentList />
                </RoleRoute>
              }
            />

            <Route
              path="/add-enrollment"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <AddEnrollment />
                </RoleRoute>
              }
            />

            {/* DEFAULT */}
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


