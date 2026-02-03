import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

function AddEnrollment() {
    const { token } = useAuth();
    const [enrollment, setEnrollment] = useState({
        student_id: "",
        course_id: "",
    });

    const handleChange = (e) => {
        setEnrollment({
         ...enrollment,
         [e.target.name]: e.target.value
    });
  };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/enrollments/`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
            Authorization: `Token ${token}`,
             },
            body: JSON.stringify(enrollment),
        })
            .then((response) => {
              if (response.ok) {
                alert("Enrollment added successfully!");
              } else {
                alert("Error adding enrollment.");
              }
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Add Enrollment
        </Typography>

        <Card sx={{ maxWidth: 500, padding: 2 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Student ID"
                name="student_id"
                value={enrollment.student_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Course ID"
                name="course_id"
                value={enrollment.course_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Add Enrollment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
}

export default AddEnrollment;