import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/students/`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setStudents(data);
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
        students.map((s) => (
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

