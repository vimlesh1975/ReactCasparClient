
import { useEffect, useState } from 'react';
import { addressmysql } from '../common'

export default function Home({ ScriptID, title, currentSlugSlugName }) {
    const [content, setContent] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${addressmysql()}/getContent?ScriptID=${ScriptID}&NewsId=${title}`);
                try {
                    const data = await res.json();
                    setContent(data.Script);
                } catch (error) {
                    setContent('');
                }

            } catch (error) {
                console.error('Error fetching content:', error);
            }
        }
        fetchData();
    }, [ScriptID, title]);

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(async () => {
            try {
                await fetch(addressmysql + '/updateContent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: newContent, ScriptID, NewsId: title }),
                });
                // const data = await res.json();
                // console.log(data.message);
            } catch (error) {
                console.error('Error saving content:', error);
            }
        }, 500); // Adjust the delay as needed

        setTimeoutId(newTimeoutId);
    };

    return (
        <div>
            <div style={{ backgroundColor: 'blue', color: 'white' }}>
                {title + " " + currentSlugSlugName}
            </div>
            <div>
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    rows="25"
                    cols="37"
                    style={{ fontSize: 20 }}

                />
            </div>

        </div>
    );
}