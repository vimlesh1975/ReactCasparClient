
'use client'
import React, { useState } from 'react';

export default function Npmmosclient() {
    const [output, setOutput] = useState('');

    const call = async (endpoint, body = {}) => {
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const text = await res.text();
            setOutput(prev => prev + text + '\n');
        } catch (err) {
            setOutput(prev => prev + '❌ Error: ' + err.message + '\n');
        }
    };

    return (
        <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
            <h1>MOS Client Control</h1>
            <div style={{ marginBottom: '1rem' }}>
                <button onClick={() => call('/api/ro/connect')}>🔌 Connect</button>
                <button onClick={() => call('/api/ro/create')}>📤 Create RO</button>
                <button onClick={() => call('/api/ro/delete')}>🗑️ Delete RO</button>
                <button onClick={() => call('/api/ro/sendMosObject')}>🗑️ sendMosObject</button>
                <button onClick={() => call('/api/ro/sendRequestAllRunningOrders')}>🗑️ sendRequestAllRunningOrders</button>
                <button onClick={() => call('/api/ro/sendRequestRunningOrder')}>🗑️ sendRequestRunningOrder</button>
                <button onClick={() => call('/api/ro/requestMachineInfo')}>🗑️ requestMachineInfo</button>
                <button onClick={() => call('/api/ro/sendReadyToAir')}>🗑️ sendReadyToAir</button>
                <button onClick={() => call('/api/ro/sendReplaceRunningOrder')}>🗑️ sendReplaceRunningOrder</button>
                <button
                    onClick={() =>
                        call('/api/ro/insertStoryAfter', {
                            roID: 'RO001',
                            newStoryID: 'STORY001',
                            slug: 'Story inserted by browser'
                        })
                    }
                >
                    ➕ Insert Story After
                </button>
                <button onClick={() => call('/api/ro/sendROInsertItems')}>sendROInsertItems</button>
            </div>

            <div style={{ maxWidth: '100%', background: '#f5f5f5', padding: '1rem', whiteSpace: 'pre-wrap' }}>
                <h3>Output</h3>
                <pre>{output}</pre>
            </div>
        </div>
    );
}
