import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box } from "@mui/material";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    setError("");

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/courses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      navigate("/courses");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add Course
      </Typography>

      <TextField
        label="Course Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Create Course
      </Button>
    </Box>
  );
}

export default AddCourse;
