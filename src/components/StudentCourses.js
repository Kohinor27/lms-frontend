import { useEffect, useState } from "react";

function StudentCourses() {
  const [enrolments, setEnrolments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/enrollments/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setEnrolments(data));
  }, []);

  return (
    <div>
      <h2>My Courses</h2>

      {enrolments.map(enrolment => (
        <div key={enrolment.id}>
          <p>{enrolment.course.title}</p>
          <p>{enrolment.course.description}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentCourses;
