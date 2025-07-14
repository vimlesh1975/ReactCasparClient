'use client';

import { useState } from 'react';

export default function Mongodb() {
    const [items, setItems] = useState([]);
    const [stories, setStories] = useState([]);
    const [runOrders, setRunOrders] = useState([]);

    const getItems = () => {
        fetch('/api/mongodb/items')
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched items:', data.items);
                setItems(data.items || []);
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
    };

    const getStories = () => {
        fetch('/api/mongodb/stories')
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched stories:', data.stories);
                setStories(data.stories || []);
            })
            .catch((error) => {
                console.error('Error fetching stories:', error);
            });
    };

    const getRunOrders = () => {
        fetch('/api/mongodb/runorders')
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched runorders:', data.runorders);
                setRunOrders(data.runorders || []);
            })
            .catch((error) => {
                console.error('Error fetching runorders:', error);
            });
    };

    return (<div>
        <div style={{ padding: 20, display: 'flex', alignItems: 'top' }}>
            <div style={{ borderRight: '1px solid red', paddingRight: 20, marginRight: 20, width: '30%' }}>
                <h3>Run Orders</h3>
                <button onClick={getRunOrders}>Get RunOrders</button>
                <ul>
                    {runOrders.map((ro, i) => (
                        <li key={i}>
                            <strong>{ro.MosId}</strong> — {ro.Name}
                            <button onClick={async () => {
                                try {
                                    const res = await fetch('/api/takeshow', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ showId: ro.MosId })
                                    });
                                    // const data = await res.json();
                                } catch (err) {
                                }
                            }}>Load ro on Studio CG</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ borderRight: '1px solid red', paddingRight: 20, marginRight: 20, width: '30%' }}>
                <h3>Stories</h3>
                <button onClick={getStories}>Get Stories</button>
                <ul>
                    {stories.map((story, i) => (
                        <li key={i}>
                            <strong>{story.storyID}</strong> — {story.storySlug}
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ borderRight: '1px solid red', paddingRight: 20, marginRight: 20, width: '30%' }}>
                <h3>Items</h3>
                <button onClick={getItems}>Get Items</button>
                <ul>
                    {items.map((item, i) => (
                        <li key={i} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
                            <img src={'data:image/png;base64,' + item.Thumbnail} alt={item.Caption} style={{ width: 50, height: 50 }} />

                            <button onClick={async () => {
                                try {
                                    const res = await fetch('/api/takeitem', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ itemId: item.MosId })
                                    });
                                    // const data = await res.json();
                                } catch (err) {
                                }
                            }}>Play on R3Engine Program</button>
                            <strong>{item.MosId}</strong> — {item.Caption} {item.SceneFullName}
                            <button onClick={() => {
                                fetch("/api/timeline", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        project: (item.SceneFullName).split('/')[0],
                                        scene: (item.SceneFullName).split('/')[1],
                                        timeline: "In"
                                    })
                                })
                            }}>
                                Play directly on R3Engine
                            </button>
                        </li>
                    ))}
                </ul>
            </div>



        </div>
    </div>);
}
