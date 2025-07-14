"use client";

import { useState } from "react";

export default function RedisTestPage() {
    const [loading, setLoading] = useState(false);
    const [keys, setKeys] = useState(null);
    const [error, setError] = useState(null);

    const fetchKeys = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/redis-test");
            if (!res.ok) {
                throw new Error(`Request failed: ${res.status}`);
            }
            const data = await res.json();
            setKeys(data.allKeys || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>🔑 Redis Test Page</h1>

            <button
                onClick={fetchKeys}
                style={{
                    background: "#0070f3",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Load Redis Keys
            </button>

            {loading && <p>Loading...</p>}

            {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}

            {keys && (
                <>
                    <h2>All Redis Keys:</h2>
                    <ul>
                        {keys.length > 0 ? (
                            keys.map((key, idx) => <li key={idx}>{key}</li>)
                        ) : (
                            <p>No keys found.</p>
                        )}
                    </ul>
                </>
            )}
        </main>
    );
}
