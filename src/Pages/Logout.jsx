import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // Redirect to sign in page after countdown
        if (countdown === 0) {
            navigate('/');
        }

        return () => clearInterval(timer);
    }, [countdown, navigate]);

    const styles = {
        logoutPage: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#060b26",
            color: "white",
        },
        logoutBox: {
            background: "red",
            padding: "40px",
            borderRadius: "10px",
            textAlign: "center",
        },
        message: {
            marginBottom: "20px",
        },
        countdown: {
            fontSize: "24px",
            color: "gold",
        }
    };

    return (
        <div style={styles.logoutPage}>
            <div style={styles.logoutBox}>
                <h1 style={styles.message}>Logging Out...</h1>
                <p>You will be redirected to sign in page in</p>
                <p style={styles.countdown}>{countdown}</p>
            </div>
        </div>
    );
}

export default Logout;