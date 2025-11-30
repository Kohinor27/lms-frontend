import React, { useEffect, useState} from "react"

function EnrollmentList() {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/enrollments/")
        .then((response) => response.json())
        .then((data) => setEnrollments(data))
        .catch((error) => console.error("Error fetching enrollments:", error));
    }, []);

    return (
        <div>
            <h2>Enrollments</h2>
            <ul>
                {enrollments.map((e) => (
                 <li key={e.id}>
                   Student: {enrollments.student_name} - Course: {enrollments.course_name}
                 </li>
                ))}
            </ul>
        </div>
    );
}

export default EnrollmentList;