import React, { useEffect, useState } from "react";

function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/courses/")
        .then((response) => response.json())
        .then((data) => setCourses(data));
    }, []);

    return (
     <div>
        <h2>Courses</h2>
        <ul>
            {courses.map((course) => (
            <li key={course.id}>
                <strong>{course.title}</strong>: {course.description}
            </li>
            ))}
        </ul>
     </div>
    );
}

export default CourseList;