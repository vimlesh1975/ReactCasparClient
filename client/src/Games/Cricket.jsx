import React from 'react'
import { useState } from 'react'

const Cricket = () => {
    const [run, setRun] = useState(125);
    const [wicket, setWicket] = useState(3);
    const [over, setOver] = useState(3);

    return (
        <div>
            Run: <input value={run} style={{ width: 50 }} onChange={e => setRun(e.target.value)} /> <button onClick={() => setRun(val => parseInt(val) + 1)}> +</button>
            Wicket:  <input value={wicket} style={{ width: 50 }} onChange={e => setRun(e.target.value)} /> <button onClick={() => setWicket(val => parseInt(val) + 1)}> +</button>
            Over:  <input value={over} style={{ width: 50 }} onChange={e => setOver(e.target.value)} /> <button onClick={() => {
                if (over % 1 === 0.5) {
                    setOver(val => (parseFloat(val) + 0.5).toFixed(1));
                }
                else {
                    setOver(val => (parseFloat(val) + 0.1).toFixed(1));
                }

            }}> +</button>
        </div>
    )
}

export default Cricket