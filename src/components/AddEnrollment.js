import React, { useState } from "react";

function AddEnrollment() {
    const [enrollment, setEnrollment] = useState({
        student_id: "",
        course_id: "",
    });

    const handleChange = (e) => {
        setEnrollment({
         ...enrollment,
         [e.target.name]: e.target.value
    });
  };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/api/enrollments/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(enrollment),
        })
            .then((response) => {
              if (response.ok) {
                alert("Enrollment added successfully!");
              } else {
                alert("Error adding enrollment.");
              }
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
      <div>
        <h2>Add Enrollment</h2>
        <form onSubmit={handleSubmit}>
            <input
              name="student_id"
              placeholder="Student ID"
              onChange={handleChange}
              />
            <input
               name="course_id"
               placeholder="Course ID"
               onChange={handleChange}
               />
            <button type="submit">Add Enrollment</button>
        </form>
      </div>
    );
}

export default AddEnrollment;