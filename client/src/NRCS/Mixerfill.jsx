import React, { useEffect, useState } from 'react'
import { endpoint } from '../common';

const Mixer = ({ layer }) => {
    const [y, setY] = useState(0.00);

    useEffect(() => {
        endpoint(`mixer ${window.chNumber}-${layer} fill ${0.015} ${y} ${0.97} ${1} `);
    }, [y, layer])
    return (
        <div style={{ border: '1px solid red', margin: 5 }}>
            <div>
                <label>Y: </label> <input max={2} step="0.01" style={{ width: 50 }} type='number' value={y} onChange={e => {
                    setY(e.target.value);
                }
                } />
            </div>



        </div>
    )
}

export default Mixer
