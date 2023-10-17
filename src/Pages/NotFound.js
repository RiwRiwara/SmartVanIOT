import { Button } from '@mui/material';
import * as React from 'react';

function NotFound() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <p style={{ fontSize: "3em", fontWeight: "bold" }}>404 Not Found!</p>
            <Button variant="contained" href="/" style={{ backgroundColor: "#829BDD", color: "white" }}>Back to Home</Button>
        </div>
    )
}

export default NotFound;
