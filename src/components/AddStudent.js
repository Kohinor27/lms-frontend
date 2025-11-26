import React, { useState } from "react":

function AddStudent() {
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    const newStudent = {
        full_name,
        email: email,
        user: 1  // temporary user ID
    };

    fetch("http://127.0.0.1:8000/api/students/", {
        method: "POST",
        headers: { "Content type": "application/json" },
        body: JSON.stringify(newStudent),
    })

    .then((response) => response.json(()
    .then((data) => {
        alert("Student added!");
        setFullName("");
        setEmail("");
    });

    };

    return (
        <div>
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                required
                />

                <label>Email</label>
                <input
                value={email}
                onChange={(e) => setEmail.apply(e.target.value)}
                required
                />

                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

export default AddStudent;