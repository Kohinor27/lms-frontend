import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Button
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

function CourseList() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/courses/`)
        .then((response) => response.json())
        .then((data) => setCourses(data))
        .finally(() => setLoading(false));
    }, []);

    return (
  <div style={{ padding: "20px" }}>
    <Typography variant="h4" gutterBottom>
      Course List
    </Typography>

    {loading ? (
      <CircularProgress />
    ) : (
      courses.map((c) => (
        <Card key={c.id} style={{ marginBottom: "15px" }}>
          <CardContent>
  <Typography variant="h6">{c.name}</Typography>

  <Typography color="text.secondary" gutterBottom>
    Description: {c.description}
  </Typography>

  {(user?.role === "teacher" || user?.role === "admin") && (
    <Button>
      variant="outlined"
      size="small"
      sx={{ mt: 1 }}
      onClick={() => alert("Edit course coming soon")}
    
      Edit Course
    </Button>
  )}
</CardContent>


        </Card>
      ))
    )}
  </div>
);

}

export default CourseList;