import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Typography, Box } from "@mui/material";

function Login() {
  const [role, setRole] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleLogin = () => {
    if (!role) return;

    login(role);

    if (role === "admin") {
      navigate("/students");
    } else {
    navigate("/courses");
    }
  };

  return (
    <Box sx={{ padding: "40px" }}>
      <Typography variant="h4" gutterBottom>
        LMS Login
      </Typography>

      <Button
        variant="contained"
        sx={{ mr: 2 }}
        onClick={() => setRole("student")}
      >
        Login as Student
      </Button>

      <Button
        variant="contained"
        sx={{ mr: 2 }}
        onClick={() => setRole("teacher")}
      >
        Login as Teacher
      </Button>

      <Button
        variant="contained"
        onClick={() => setRole("admin")}
      >
        Login as Admin
      </Button>

      <Box sx={{ mt: 3 }}>
        <Button
          color="success"
          variant="outlined"
          onClick={handleLogin}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
