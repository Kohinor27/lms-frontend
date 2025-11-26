import React, { useEffect, useState } from "react";

function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/students/")
        .then((response) => response.json(()
        .then((data) => setStudents((data);
    }, []);

return (
    <div>
       <h2>Students</h2>
       <ul>
        {students.map((s) => (
            <li> key={s.id}>
            <strong>{s.full_name}</strong> - {s.email}
            </li>
        ))}
       </ul>
       </div>
);
}

export default StudentList;

