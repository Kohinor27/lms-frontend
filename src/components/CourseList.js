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
  const { token, isTeacher } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const loadCourses = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/courses/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        console.log("COURSES RAW:", data);

        const list =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.results)
            ? data.results
            : [];

        if (alive) setCourses(list);
      } catch (err) {
        console.error("COURSES ERROR:", err);
        if (alive) setCourses([]);
      } finally {
        if (alive) setLoading(false);
      }
    };

    loadCourses();
    return () => {
      alive = false;
    };
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Course List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : courses.length === 0 ? (
        <Typography color="text.secondary">
          {isTeacher
            ? "You don’t have any courses assigned yet."
            : "No courses available."}
        </Typography>
      ) : (
        courses.map((c) => (
          <Card key={c.id} style={{ marginBottom: "15px" }}>
            <CardContent>
              <Typography variant="h6">
                {typeof c.name === "string"
                  ? c.name
                  : JSON.stringify(c.name)}
              </Typography>

              <Typography color="text.secondary" gutterBottom>
                Description:{" "}
                {typeof c.description === "string"
                  ? c.description
                  : "No description"}
              </Typography>

              {isTeacher && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => alert("Edit course coming soon")}
                >
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
