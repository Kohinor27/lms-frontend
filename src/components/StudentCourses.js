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
    <div>
      <h2>My Courses</h2>

      {enrollments.map(enrollment => (
        <div key={enrollment.id}>
          <p>{enrollment.course.title}</p>
          <p>{enrollment.course.description}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentCourses;
