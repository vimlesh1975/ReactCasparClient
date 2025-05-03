import React from 'react'
import Client from './Client'
import Server from './Server'

const Mos = () => {
    return (<div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ border: '1px solid red', width: '50%', height: '100vh' }}>
                <Server />
            </div>
            <div style={{ border: '1px solid blue', width: '50%', height: '100vh' }}>
                <Client />
            </div>
        </div>
    </div>)
}

export default Mos