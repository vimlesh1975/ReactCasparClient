import React from 'react'
import { useSelector } from 'react-redux'

const ColorDialog = ({ action1, ref1, property1, onClick1 }) => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const getdirection = cords => {
        if (JSON.stringify(cords) === JSON.stringify({ x1: 0, y1: 0, x2: 1, y2: 0 })) { return ('to right') }
        if (JSON.stringify(cords) === JSON.stringify({ x1: 0, y1: 0, x2: 0, y2: 1 })) { return ('to bottom') }
        if (JSON.stringify(cords) === JSON.stringify({ x1: 0, y1: 0, x2: 1, y2: 1 })) { return ('to bottom right') }
        if (JSON.stringify(cords) === JSON.stringify({ x1: 0, y1: 1, x2: 1, y2: 0 })) { return ('to right top') }
    }
    return (<>
        {(property1?.colorStops) ? <span onClick={onClick1} style={{ display: 'inline-block', marginTop: 6, marginLeft: 7, marginRight: 6, border: '1px solid black', width: 35, height: 12, backgroundImage: `linear-gradient(${getdirection(property1.coords)}, ${property1.colorStops[0].color} 0%, ${property1.colorStops[1].color} ${property1.colorStops[1].offset * 100}%, ${property1.colorStops[2].color} 100%)` }} /> : <input ref={ref1} type="color" value={property1} onChange={e => action1(e, canvas)} />}
    </>
    )
}

export default ColorDialog