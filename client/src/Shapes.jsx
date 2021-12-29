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
        <div>

            {index.lib.map((val, i) => <div key={uuidv4()}>
                <span >{val}</span><br />
                {(val === 'basic') ? (Object.keys(basic.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(basic.data))[i])}>{val} </button>) : ''}
                {(val === 'animal') ? (Object.keys(animal.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(animal.data))[i])}>{val} </button>) : ''}
                {(val === 'arrow') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(arrow.data))[i])}>{val} </button>) : ''}
                {(val === 'dialog_balloon') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(dialog_balloon.data))[i])}>{val} </button>) : ''}
                {(val === 'electronics') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(electronics.data))[i])}>{val} </button>) : ''}
                {(val === 'flowchart') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(flowchart.data))[i])}>{val} </button>) : ''}
                {(val === 'game') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(game.data))[i])}>{val} </button>) : ''}
                {(val === 'math') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(math.data))[i])}>{val} </button>) : ''}
                {(val === 'misc') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(misc.data))[i])}>{val} </button>) : ''}
                {(val === 'music') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(music.data))[i])}>{val} </button>) : ''}
                {(val === 'object') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(object.data))[i])}>{val} </button>) : ''}
                {(val === 'raphael_1') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(raphael_1.data))[i])}>{val} </button>) : ''}
                {(val === 'raphael_2') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(raphael_2.data))[i])}>{val} </button>) : ''}
                {(val === 'symbol') ? (Object.keys(arrow.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(symbol.data))[i])}>{val} </button>) : ''}

            </div>)}


            {/* <p>Basic</p>{(Object.keys(basic.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(basic.data))[i])}>{val}</button>)}
            <p>Objects</p>{(Object.keys(object.data)).map((val, i) => <button key={uuidv4()} onClick={() => createShape(canvas, (Object.values(object.data))[i])}>{val}</button>)} */}

        </div>
    )
}

export default Shapes
