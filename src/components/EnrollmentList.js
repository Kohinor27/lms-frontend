import React, { useEffect, useState} from "react"

function EnrollmentList() {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/enrollments/")
        .then((response) => response.json(()
        .then((data) => setEnrollments(data));
    }, []);

    return (
        <div>
            <h2>Enrollments</h2>
            <ul>
                {enrollments.map((e) => (
                 <li> key={e.id}>
                   Student ID: {e.student} - Course ID: {e.course} - Date: {e.date_enrolled}
                 </li>
                ))}
            </ul>
        </div>
    );
}

export default EnrollmentList;