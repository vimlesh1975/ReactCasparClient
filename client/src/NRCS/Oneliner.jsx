import React from 'react'

const Oneliner = ({ slugs, currentStoryNumber }) => {
    return (
        <div>
            Oneliner
            {(slugs[currentStoryNumber]?.OneLinerText)?.split("\n").map((val, i) => <div>Line {i + 1} <input style={{ width: 500 }} disabled type='text' value={val} /></div>)}
        </div>
    )
}

export default Oneliner
