import React, { useState } from "react";

function AddStudent() {
    const [formData, setFormData] = useState({
        first_name:"",
        last_name:"",
        email:""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/api/students/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Student added successfully!");
                } else {
                    alert("Error adding student!");
                }
            })
            .catch((error) => console.log("Error:", error));
    };

    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

export default AddStudent;