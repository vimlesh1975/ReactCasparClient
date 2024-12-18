import React from 'react'
var splitter = "\n";
splitter = "$$$";
const Oneliner = ({ slugs, currentStoryNumber }) => {
    return (
        <div>
            Oneliner
            {(slugs[currentStoryNumber]?.OneLinerText)?.split(splitter).map((val, i) => <div key={i}>Line {i + 1} <input style={{ width: 400 }} disabled type='text' value={val} /></div>)}
        </div>
    )
}

export default Oneliner
