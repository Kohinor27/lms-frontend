import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    CircularProgress
} from "@mui/material";

function CourseList() {
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
            <Typography color="text.secondary">
              Description: {c.description}
            </Typography>
          </CardContent>
        </Card>
      ))
    )}
  </div>
);

}

export default CourseList;