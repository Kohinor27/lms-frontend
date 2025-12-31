import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";

function AddStudent() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    user: 1
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/students/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Student added successfully!");
        } else {
          alert("Error adding student!");
        }
      })
      .catch((error) => console.log("Error:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Add Student
      </Typography>

      <Card sx={{ maxWidth: 500, padding: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
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
              Add Student
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddStudent;
