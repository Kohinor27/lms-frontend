import { useEffect, useState } from "react";

function StudentCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/enrollments/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setEnrollments(data));
  }, []);

  return (
  <div style={{ padding: "24px" }}>
    <h2>My Courses</h2>

    {enrollments.length === 0 ? (
      <p>You are not enrolled in any courses yet.</p>
    ) : (
      enrollments.map((enrollment) => (
        <div
          key={enrollment.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <h3>{enrollment.course.title}</h3>
          <p>{enrollment.course.description}</p>
        </div>
      ))
    )}
  </div>
);

}

export default StudentCourses;
