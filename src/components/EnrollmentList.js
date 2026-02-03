import React, { useEffect, useState} from "react"
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

function EnrollmentList() {
    const { token, user } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  let url = `${process.env.REACT_APP_API_BASE_URL}/api/enrollments/`;

  // If NOT admin, only fetch this student's enrollments
  if (!user.groups?.includes("admin")) {
    url = `${process.env.REACT_APP_API_BASE_URL}/api/enrollments/?student=${user.id}`;
  }

  fetch(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setEnrollments(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching enrollments:", error);
      setLoading(false);
    });
}, [user, token]);


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