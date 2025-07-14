import React from 'react'

const Oneliner = ({ slugs, currentStoryNumber }) => {
    const newdatabase = true;
    return (
        <div>
            Oneliner
            {(slugs[currentStoryNumber]?.OneLinerText)?.split(newdatabase ? "$$$" : "\n").map((val, i) => <div key={i}>Line {i + 1} <input style={{ width: 400 }} disabled type='text' value={val} /></div>)}
        </div>
    )
}

export default Oneliner