import React, { useEffect, useState} from "react"
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
} from "@mui/material";

function EnrollmentList() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/enrollments/")
        .then((response) => response.json())
.then((data) => {
    setEnrollments(data);
    setLoading(false);
})
        .catch((error) => console.error("Error fetching enrollments:", error));
    }, []);

    return (
  <div style={{ padding: "20px" }}>
    <Typography variant="h4" gutterBottom>
      Enrollment List
    </Typography>

    {loading ? (
      <CircularProgress />
    ) : (
      enrollments.map((e) => (
        <Card key={e.id} style={{ marginBottom: "15px" }}>
          <CardContent>
            <Typography variant="h6">
              Student ID: {e.student}
            </Typography>
            <Typography color="text.secondary">
              Course ID: {e.course}
            </Typography>
          </CardContent>
        </Card>
      ))
    )}
  </div>
);

}

export default EnrollmentList;