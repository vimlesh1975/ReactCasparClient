import React from 'react'

import { animal } from './shapelib/animal.js'
import { arrow } from './shapelib/arrow.js'
import { basic } from './shapelib/basic.js'
import { dialog_balloon } from './shapelib/dialog_balloon.js'
import { electronics } from './shapelib/electronics.js'
import { flowchart } from './shapelib/flowchart.js'
import { game } from './shapelib/game.js'
import { index } from './shapelib/index'
import { math } from './shapelib/math.js'
import { misc } from './shapelib/misc.js'
import { music } from './shapelib/music.js'
import { object } from './shapelib/object.js'
import { raphael_1 } from './shapelib/raphael_1.js'
import { raphael_2 } from './shapelib/raphael_2.js'
import { symbol } from './shapelib/symbol.js'


import { createShape, } from './DrawingController'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'


const Shapes = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);

    return (
        <div style={{ width: 880, height: 850, overflow: 'scroll' }}>

            {index.lib.map((val, i) => <div key={uuidv4()}>
                <h4 style={{backgroundColor:'yellow' , textAlign:'center'}} >{val.toUpperCase()}</h4>
                {(val === 'basic') && (Object.keys(basic.data)).map((val, i) => <button  key={uuidv4()} onClick={() => createShape(canvas, (Object.values(basic.data))[i])}>{val}<br /><svg style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(basic.data)[i]} />
                </svg> </button>)}
                {(val === 'animal') && (Object.keys(animal.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(animal.data))[i])}>{val} <br /><svg  style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(animal.data)[i]} />
                </svg> </button>)}
                {(val === 'arrow') && (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(arrow.data))[i])}>{val} <br /><svg style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(arrow.data)[i]} />
                </svg> </button>)}
                {(val === 'dialog_balloon') && (Object.keys(dialog_balloon.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(dialog_balloon.data))[i])}>{val}<br /><svg style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(dialog_balloon.data)[i]} />
                </svg>  </button>)}
                {(val === 'electronics') && (Object.keys(electronics.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(electronics.data))[i])}>{val}<br /><svg style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(electronics.data)[i]} />
                </svg>  </button>)}
                {(val === 'flowchart') && (Object.keys(flowchart.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(flowchart.data))[i])}>{val}<br /> <svg style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(flowchart.data)[i]} />
                </svg> </button>)}
                {(val === 'game') && (Object.keys(game.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(game.data))[i])}>{val}<br /><svg  style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(game.data)[i]} />
                </svg>  </button>)}
                {(val === 'math') && (Object.keys(math.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(math.data))[i])}>{val}<br /> <svg style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(math.data)[i]} />
                </svg> </button>)}
                {(val === 'misc') && (Object.keys(misc.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(misc.data))[i])}>{val}<br /><svg style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(misc.data)[i]} />
                </svg>  </button>)}
                {(val === 'music') && (Object.keys(music.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(music.data))[i])}>{val}<br /><svg style={{width:100, height:100}}  viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(music.data)[i]} />
                </svg>  </button>)}
                {(val === 'object') && (Object.keys(object.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(object.data))[i])}>{val}<br /> <svg  style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(object.data)[i]} />
                </svg> </button>)}
                {(val === 'raphael_1') && (Object.keys(raphael_1.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(raphael_1.data))[i], 3)}>{val}<br /> <svg style={{width:40, height:40}} transform='scale(1)'>
                    <path d={Object.values(raphael_1.data)[i]} />
                </svg> </button>)}
                {(val === 'raphael_2') && (Object.keys(raphael_2.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(raphael_2.data))[i], 3)}>{val}<br /> <svg style={{width:40, height:40}} transform='scale(1)'>
                    <path d={Object.values(raphael_2.data)[i]} />
                </svg>  </button>)}
                {(val === 'symbol') && (Object.keys(symbol.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(symbol.data))[i])}>{val}<br /><svg  style={{width:100, height:100}} viewBox='0 0 400 400' transform='scale(0.50)'>
                    <path d={Object.values(symbol.data)[i]} />
                </svg>  </button>)}

            </div>)}


            {/* <p>Basic</p>{(Object.keys(basic.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(basic.data))[i])}>{val}</button>)}
            <p>Objects</p>{(Object.keys(object.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(object.data))[i])}>{val}</button>)} */}

        </div>
    )
}

export default Shapes
