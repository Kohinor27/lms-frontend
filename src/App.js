import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import CourseList from "./components/CourseList";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EnrollmentList from "./components/EnrollmentList";
import AddEnrollment from "./components/AddEnrollment";

// ---------------- THEME ----------------
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

// ---------------- NAV BAR ----------------
function NavBar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ gap: "20px" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          LMS Frontend
        </Typography>

        {/* Everyone logged in can see courses */}
        <Button color="inherit" component={Link} to="/courses">
          Courses
        </Button>

        {/* Admin only */}
        {user.role === "admin" && (
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

// ---------------- APP ----------------
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <NavBar />

          <Routes>
            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Courses (all logged-in users) */}
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <CourseList />
                </ProtectedRoute>
              }
            />

            {/* Admin-only routes */}
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

            {/* Default redirect */}
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

