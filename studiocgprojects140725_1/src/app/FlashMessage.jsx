import React, { useState } from "react";

const FlashMessage = ({ message, duration = 3000 }) => {
    const [visible, setVisible] = useState(true);

    // Automatically hide the message after the specified duration
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    }, [duration]);

    if (!visible) return null; // Don't render anything if not visible

    return (
        <div style={styles.flashMessage}>
            {message}
        </div>
    );
};

const styles = {
    flashMessage: {
        position: "fixed",
        top: "100px",
        left: "1300px",
        padding: "10px 20px",
        backgroundColor: "#4caf50",
        color: "#fff",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
    },
};

export default FlashMessage;