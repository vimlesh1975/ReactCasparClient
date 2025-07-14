'use client';

import { useState } from 'react';

export default function Mosapi() {
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [itemId, setitemId] = useState('item_1');
    const [showId, setShowId] = useState('DDNRCS_RO');



    const callApi = async (url, fetchData = {}) => {
        setLoading(true);
        setOutput(null);

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fetchData)
            });
            const data = await res.json();
            setOutput(data);
        } catch (err) {
            setOutput({ error: err.message });
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>🛰MOS API</h1>
            <div>
                ItemID: <input
                    onChange={(e) => setitemId(e.target.value)}
                    type="text"
                    value={itemId} />

                <button
                    onClick={() => callApi('/api/takeitem', { itemId })}

                >
                    🔄 Send Take Command
                </button>
            </div>
            <div>
                ShowId: <input
                    onChange={(e) => setShowId(e.target.value)}
                    type="text"
                    value={showId} />
                <button
                    onClick={() => callApi('/api/takeshow', { showId })}

                >
                    🔄Load show in Studio CG
                </button>
            </div>





            {loading && <p>⏳ Sending request...</p>}

            {output && (
                <pre
                    style={{
                        backgroundColor: '#f4f4f4',
                        padding: '1rem',
                        marginTop: '1rem',
                        borderRadius: '4px',
                        maxWidth: '700px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                    }}
                >
                    {JSON.stringify(output, null, 2)}
                </pre>
            )}
        </div>
    );
}
