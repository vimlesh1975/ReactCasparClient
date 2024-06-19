
import { useEffect, useState } from 'react';
import { address1 } from '../common'

export default function Home({ ScriptID, title }) {
    const [content, setContent] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${address1}/getContent?ScriptID=${ScriptID}`);
                const data = await res.json();
                setContent(data.Script);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        }

        fetchData();
    }, [ScriptID]);

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(async () => {
            try {
                const res = await fetch('/api/updateContent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: newContent, ScriptID }),
                });
                const data = await res.json();
                console.log(data.message);
            } catch (error) {
                console.error('Error saving content:', error);
            }
        }, 500); // Adjust the delay as needed

        setTimeoutId(newTimeoutId);
    };

    return (
        <div>
            <div style={{ backgroundColor: 'red' }}>
                {title}
            </div>
            <div>
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    rows="20"
                    cols="50"
                    style={{ fontSize: 20 }}
                    disabled
                />
            </div>

        </div>
    );
}