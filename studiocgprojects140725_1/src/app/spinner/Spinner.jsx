import React from "react";
import "./Spinner.css"; // Add CSS styles here or use inline styling

const Spinner = ({ message = "Processing, please wait..." }) => {
    return (
        <div className="spinner-overlay">
            <div className="spinner-content">
                <div className="spinner" />
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Spinner;