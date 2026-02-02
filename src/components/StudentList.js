import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function StudentList() {
    const { token } = useAuth();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/students/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setStudents(Array.isArray(data) ? data :(data.results || []));
            setLoading(false);
        });
}, []);

return (
    <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
            Student List
        </Typography>

        {loading ? (
            <CircularProgress />
        ) : (
        (Array.isArray(students) ? students : []).map((s) => (
            <Card key={s.id} style={{ marginBottom: "15px" }}>
             <CardContent>
                <Typography variant="h6">{s.full_name}</Typography>
                <Typography color="text.seconday">Email: {s.email}</Typography>
             </CardContent>
            </Card>
        ))
        )}
        </div>
    );
}

export default StudentList;

