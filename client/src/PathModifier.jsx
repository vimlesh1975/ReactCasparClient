import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as fabric from "fabric";
import { generateUniqueId, shadowOptions } from './common';
import { mousedownandmousemoveevent } from './Drawing';
import { syncProps, getObjectbyId } from './theatrejs/WebAnimator';
import { FaPen, FaCheck, FaSync, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

var currentValue = [];
var temprect;

// define a function that will define what the control does
// this function will be called on every mouse move after a control has been
// clicked and is being dragged.
function actionHandler(eventData, transform, x, y, point1, point2) {
  const polygon = transform.target;
  const currentControl = polygon.controls[polygon.__corner];
  const mouseLocalPosition = new fabric.Point(x, y)
    .transform(fabric.util.invertTransform(polygon.calcTransformMatrix()));
  const finalPointPosition = {
    x: mouseLocalPosition.x + polygon.pathOffset.x,
    y: mouseLocalPosition.y + polygon.pathOffset.y,
  };
  polygon.path[currentControl.pointIndex][point1] = finalPointPosition.x;
  polygon.path[currentControl.pointIndex][point2] = finalPointPosition.y;

  window.dispatch({ type: 'CHANGE_PATH1', payload: polygon.path });

  return true;
}

// define a function that can keep the polygon in the same position when we change its width/height/top/left.
function anchorWrapper(anchorIndex, fn, dispatch) {
  return function (eventData, transform, x, y) {
    const fabricObject = transform.target;
    const pathObj = fabricObject.path[anchorIndex];
    const absolutePoint = new fabric.Point(
      pathObj[1] - fabricObject.pathOffset.x,
      pathObj[2] - fabricObject.pathOffset.y
    ).transform(fabricObject.calcTransformMatrix());
    const actionPerformed = fn(eventData, transform, x, y);
    fabricObject._setPath(fabricObject.path);
    const polygonBaseSize = fabricObject._getNonTransformedDimensions();
    const newX = (pathObj[1] - fabricObject.pathOffset.x) / polygonBaseSize.x;
    const newY = (pathObj[2] - fabricObject.pathOffset.y) / polygonBaseSize.y;
    fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);

    window.dispatch({ type: 'CHANGE_PATH1', payload: fabricObject.path });

    if (getObjectbyId(fabricObject.id)) {
      syncProps(fabricObject, getObjectbyId(fabricObject.id));
    }

    return actionPerformed;
  };
}

export function edit(dispatch) {
  if (window.editor?.canvas?.getActiveObjects()[0]?.type === 'path') {
    var poly = window.editor.canvas.getActiveObjects()[0];
    window.editor.canvas.setActiveObject(poly);
    poly.edit = !poly.edit;
    if (poly.edit) {
      var lastControl = poly.path.length - 2;
      poly.cornerStyle = 'circle';
      poly.cornerColor = 'black';
      poly.transparentCorners = false;
      poly.controls = poly.path.reduce(function (acc, point, index) {
        if (index < poly.path.length - 1) {
          acc['p1st' + index] = new fabric.Control({
            positionHandler: (dim, finalMatrix, fabricObject, currentControl) => polygonPositionHandler(dim, finalMatrix, fabricObject, currentControl, 1, 2),
            actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, (eventData, transform, x, y) => actionHandler(eventData, transform, x, y, 1, 2), dispatch),
            pointIndex: index,
            render: renderIcon(`${index + 1}0`, point)
          });
          if ((point[0] === 'Q') || (point[0] === 'C')) {
            acc['p2nd' + index] = new fabric.Control({
              positionHandler: (dim, finalMatrix, fabricObject, currentControl) => polygonPositionHandler(dim, finalMatrix, fabricObject, currentControl, 3, 4),
              actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, (eventData, transform, x, y) => actionHandler(eventData, transform, x, y, 3, 4), dispatch),
              pointIndex: index,
              render: renderIcon(`${index + 1}1`, point)
            });
          }
          if (point[0] === 'C') {
            acc['p3rd' + index] = new fabric.Control({
              positionHandler: (dim, finalMatrix, fabricObject, currentControl) => polygonPositionHandler(dim, finalMatrix, fabricObject, currentControl, 5, 6),
              actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, (eventData, transform, x, y) => actionHandler(eventData, transform, x, y, 5, 6), dispatch),
              pointIndex: index,
              render: renderIcon(`${index + 1}2`, point)
            });
          }
        }
        return acc;
      }, {});
    } else {
      poly.controls = fabric.controlsUtils.createObjectDefaultControls();
      poly.cornerStyle = 'rect';
      poly.cornerColor = 'white';
      poly.transparentCorners = true;
    }
    poly.hasBorders = !poly.edit;
    poly.setCoords();
    window.editor.canvas.requestRenderAll();
  }
}

export const startPath = () => {
  if (!window.editor?.canvas) return;
  window.editor.canvas.off('mouse:down');
  window.editor.canvas.off('mouse:move');
  currentValue = [];
  window.editor.canvas.on('mouse:down', eventHandlerMouseDown);
  window.editor.canvas.on('mouse:move', eventHandlerMouseMove);
};

const eventHandlerMouseMove = e => {
  if (currentValue.length > 0 && window.editor?.canvas) {
    currentValue.push(['L', e.pointer.x, e.pointer.y]);
    window.editor.canvas.remove(temprect);
    temprect = new fabric.Path(currentValue, {
      shadow: shadowOptions,
      opacity: 1,
      fill: '#ff0000',
      hasRotatingPoint: true,
      objectCaching: false,
      stroke: '#ffff00',
      strokeWidth: 2,
    });
    currentValue.pop();
    window.editor.canvas.add(temprect);
    window.editor.canvas.requestRenderAll();
  }
};

const eventHandlerMouseDown = (e) => {
  if (currentValue.length === 0) {
    currentValue.push(['M', e.pointer.x, e.pointer.y]);
  } else {
    if (currentValue[currentValue.length - 1][0] === 'M') {
      currentValue.push(['Q', (currentValue[currentValue.length - 1][1] + e.pointer.x) / 2, (currentValue[currentValue.length - 1][2] + e.pointer.y) / 2, e.pointer.x, e.pointer.y]);
    } else {
      currentValue.push(['Q', (currentValue[currentValue.length - 1][3] + e.pointer.x) / 2, (currentValue[currentValue.length - 1][4] + e.pointer.y) / 2, e.pointer.x, e.pointer.y]);
    }
  }
  if (currentValue.length > 0 && window.editor?.canvas) {
    if (currentValue.length > 1) {
      window.editor.canvas.remove(temprect);
    }
    temprect = new fabric.Path(currentValue, {
      shadow: { ...shadowOptions, blur: 0 },
      fill: '#ff0000',
      objectCaching: false,
      stroke: '#ffff00',
      strokeWidth: 2,
    });
    window.editor.canvas.add(temprect);
    window.editor.canvas.requestRenderAll();
  }
};

function renderIcon(icon, point) {
  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    ctx.save();
    ctx.font = "35px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(icon, left, top);
    ctx.restore();

    if (point[0] === 'C' && icon % 10 === 1) {
      ctx.beginPath();
      ctx.moveTo(left, top);
    } else {
      ctx.lineTo(left, top);
      ctx.stroke();
    }

    if (
      (point[0] !== 'M' && point[0] === 'C' && icon % 10 !== 2) ||
      (point[0] === 'Q' && icon % 10 !== 1)
    ) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(left, top, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    } else {
      ctx.save();
      ctx.beginPath();
      ctx.arc(left, top, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  };
}

function polygonPositionHandler(dim, finalMatrix, fabricObject, currentControl, point1, point2) {
  var pathObj = fabricObject.path[currentControl.pointIndex];
  if (pathObj) {
    var x = (pathObj[point1] - fabricObject.pathOffset.x);
    var y = (pathObj[point2] - fabricObject.pathOffset.y);
    return new fabric.Point(x, y).transform(
      fabric.util.multiplyTransformMatrices(
        fabricObject.canvas.viewportTransform,
        fabricObject.calcTransformMatrix()
      )
    );
  }
}

const PathModifier = () => {
  const canvas = useSelector(state => state.canvasReducer.canvas);
  const path1 = useSelector(state => state.path1Reducer.path1);
  const dispatch = useDispatch();
  window.dispatch = dispatch;

  const closePath = () => {
    if (currentValue.length !== 0 && canvas) {
      canvas.remove(temprect);
      currentValue.push(['Q', (currentValue[currentValue.length - 1][3] + currentValue[0][1]) / 2, (currentValue[currentValue.length - 1][4] + currentValue[0][2]) / 2, currentValue[0][1], currentValue[0][2]]);
      currentValue.push(['z']);
      const id1 = generateUniqueId({ type: 'path' });

      const rect = new fabric.Path(currentValue, {
        id: id1,
        class: id1,
        shadow: shadowOptions,
        opacity: 1,
        fill: '#ff0000',
        objectCaching: false,
        stroke: '#ffff00',
        strokeWidth: 2,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      rect.on('mousedblclick', () => {
        edit(dispatch);
      });
      canvas.requestRenderAll();
    }
    if (canvas) {
      canvas.off('mouse:down');
      canvas.off('mouse:move');
      mousedownandmousemoveevent(canvas);
    }
    currentValue = [];
  };

  window.closePath = closePath;
  window.edit = edit;

  const showpaths = () => {
    if (canvas?.getActiveObjects()[0]?.type === 'path') {
      const aa1 = canvas?.getActiveObjects()[0]?.path;
      currentValue = aa1;
      dispatch({ type: 'CHANGE_PATH1', payload: currentValue });
    }
  };

  const deleteValuePoint = i => {
    if (canvas?.getActiveObjects()[0]?.type === 'path') {
      const updatedPath = path1.filter((val, index1) => (i !== index1));
      currentValue = updatedPath;
      dispatch({ type: 'CHANGE_PATH1', payload: updatedPath });
      canvas.getActiveObjects()[0].set({ path: updatedPath });
      canvas.getActiveObjects()[0].setCoords();
      canvas?.requestRenderAll();
      edit();
      edit();
    }
  };

  const addValuePoint = (index, pointType) => {
    if (canvas?.getActiveObjects()[0]?.type === 'path') {
      const updatedPath = [...path1];
      var nextIndex;
      var midX;
      var midY;
      if (updatedPath[index + 1][0] === 'z') {
        nextIndex = 0;
      } else {
        nextIndex = (index + 1);
      }
      if (updatedPath[index][0] === 'L' || updatedPath[index][0] === 'M') {
        midX = (updatedPath[index][1] + updatedPath[nextIndex][1]) / 2;
        midY = (updatedPath[index][2] + updatedPath[nextIndex][2]) / 2;
      } else if (updatedPath[index][0] === 'Q') {
        midX = (updatedPath[index][3] + updatedPath[nextIndex][1]) / 2;
        midY = (updatedPath[index][4] + updatedPath[nextIndex][2]) / 2;
      } else if (updatedPath[index][0] === 'C') {
        midX = (updatedPath[index][5] + updatedPath[nextIndex][1]) / 2;
        midY = (updatedPath[index][6] + updatedPath[nextIndex][2]) / 2;
      }

      if (pointType === 'L') {
        updatedPath.splice(index + 1, 0, ['L', midX, midY]);
      }
      if (pointType === 'Q') {
        updatedPath.splice(index + 1, 0, ['Q', midX, midY, midX, midY]);
      }
      if (pointType === 'C') {
        updatedPath.splice(index + 1, 0, ['C', midX, midY, midX, midY, midX, midY]);
      }
      currentValue = updatedPath;
      dispatch({ type: 'CHANGE_PATH1', payload: updatedPath });
      canvas.getActiveObjects()[0].set({ path: updatedPath });
      canvas?.requestRenderAll();
      edit(dispatch);
      edit(dispatch);
    }
  };

  const updatePath1 = (i, ii, e) => {
    if (canvas?.getActiveObjects()[0]?.type === 'path') {
      const updatedPath = path1.map((val, index1) => {
        return (i !== index1) ? val : val.map((val1, index2) => {
          return (ii !== index2) ? val1 : parseInt(e.target.value);
        });
      });

      dispatch({ type: 'CHANGE_PATH1', payload: updatedPath });
      currentValue = updatedPath;
      canvas.getActiveObjects()[0].set({ path: updatedPath });
      canvas.getActiveObjects()[0].setCoords();
      canvas?.requestRenderAll();
    }
  };

  // Modern Styling Tokens
  const cardStyle = {
    backgroundColor: '#1e293b',
    borderRadius: '8px',
    border: '1px solid #334155',
    padding: '12px',
    color: '#f8fafc',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    marginBottom: '12px',
  };

  const btnBase = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '5px',
    border: 'none',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer',
    color: '#ffffff',
    transition: 'all 0.15s ease',
  };

  const pointBtn = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '3px 8px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#ffffff',
  };

  const inputBase = {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '4px',
    color: '#ffffff',
    padding: '3px 6px',
    fontSize: '12px',
    boxSizing: 'border-box',
    textAlign: 'center',
  };

  const getPointLabel = (command) => {
    switch (command) {
      case 'M': return { name: 'Move To', color: '#10b981' };
      case 'L': return { name: 'Line To', color: '#0284c7' };
      case 'Q': return { name: 'Quadratic Curve', color: '#f59e0b' };
      case 'C': return { name: 'Cubic Bezier', color: '#a855f7' };
      case 'z': return { name: 'Close Path', color: '#ec4899' };
      default: return { name: command, color: '#64748b' };
    }
  };

  const getCoordName = (command, index) => {
    if (command === 'M' || command === 'L') {
      if (index === 1) return 'X';
      if (index === 2) return 'Y';
    }
    if (command === 'Q') {
      if (index === 1) return 'Control X';
      if (index === 2) return 'Control Y';
      if (index === 3) return 'End X';
      if (index === 4) return 'End Y';
    }
    if (command === 'C') {
      if (index === 1) return 'Control 1 X';
      if (index === 2) return 'Control 1 Y';
      if (index === 3) return 'Control 2 X';
      if (index === 4) return 'Control 2 Y';
      if (index === 5) return 'End X';
      if (index === 6) return 'End Y';
    }
    return `Param ${index}`;
  };

  return (
    <div style={{ padding: '12px', fontFamily: 'Inter, system-ui, sans-serif', color: '#f8fafc', width: '100%', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto', boxSizing: 'border-box' }}>
      
      {/* Top Toolbar */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8' }}>
              Vector Path Modifier
            </span>
            <span style={{ fontSize: '11px', backgroundColor: '#334155', padding: '2px 8px', borderRadius: '10px', color: '#94a3b8' }}>
              {path1?.length || 0} Path Points
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            style={{ ...btnBase, backgroundColor: '#059669' }}
            onClick={startPath}
            title="Click points on canvas to draw freeform path"
          >
            <FaPen /> Start Drawing Path
          </button>
          <button
            style={{ ...btnBase, backgroundColor: '#0284c7' }}
            onClick={closePath}
            title="Close and finalize the currently drawn path"
          >
            <FaCheck /> Finish Drawing Path
          </button>
          <button
            style={{ ...btnBase, backgroundColor: '#4f46e5' }}
            onClick={showpaths}
            title="Read and initialize the currently selected path on canvas"
          >
            <FaSync /> Initialise Selected Path
          </button>
          <button
            id="edit"
            style={{ ...btnBase, backgroundColor: '#9333ea' }}
            onClick={edit}
            title="Toggle interactive point handles on canvas"
          >
            <FaEdit /> Toggle Edit Mode
          </button>
        </div>
      </div>

      {/* Points Detail Cards List */}
      <div style={cardStyle}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Path Point Nodes & Coordinates</span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Range: -2000px to +2000px</span>
        </div>

        {(!path1 || path1.length === 0) ? (
          <div style={{ backgroundColor: '#0f172a', border: '1px dashed #334155', borderRadius: '6px', padding: '30px', textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: '14px', marginBottom: '6px', color: '#94a3b8' }}>No Path Loaded</div>
            <div style={{ fontSize: '12px' }}>
              Select a path on the canvas and click <b>"Initialise Selected Path"</b>, or click <b>"Start Drawing Path"</b> to create one.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: 'calc(100vh - 250px)', overflowY: 'auto', paddingRight: '4px' }}>
            {path1.map((val, i) => {
              const cmdInfo = getPointLabel(val[0]);
              const isLast = i === path1.length - 1;

              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Point Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#f8fafc' }}>
                        Point {i + 1} <span style={{ color: '#64748b', fontSize: '11px' }}>/ {path1.length}</span>
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: cmdInfo.color + '22', color: cmdInfo.color, border: `1px solid ${cmdInfo.color}66`, padding: '1px 6px', borderRadius: '4px' }}>
                        {val[0]} ({cmdInfo.name})
                      </span>
                    </div>

                    {/* Point Insertion / Deletion Actions */}
                    {!isLast && (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        <button
                          style={{ ...pointBtn, backgroundColor: '#ef4444' }}
                          onClick={() => deleteValuePoint(i)}
                          title="Delete this point node"
                        >
                          <FaTrash size={10} /> Delete
                        </button>
                        <button
                          style={{ ...pointBtn, backgroundColor: '#0284c7' }}
                          onClick={() => addValuePoint(i, 'L')}
                          title="Insert Line Point"
                        >
                          <FaPlus size={9} /> +L
                        </button>
                        <button
                          style={{ ...pointBtn, backgroundColor: '#f59e0b' }}
                          onClick={() => addValuePoint(i, 'Q')}
                          title="Insert Quadratic Curve Point"
                        >
                          <FaPlus size={9} /> +Q
                        </button>
                        <button
                          style={{ ...pointBtn, backgroundColor: '#9333ea' }}
                          onClick={() => addValuePoint(i, 'C')}
                          title="Insert Cubic Bezier Point"
                        >
                          <FaPlus size={9} /> +C
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Coordinate Sliders and Inputs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {val.map((vv, ii) => {
                      if (ii === 0) return null;
                      const paramLabel = getCoordName(val[0], ii);

                      return (
                        <div key={ii} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 65px', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'right' }}>
                            {paramLabel}:
                          </span>
                          <input
                            type="range"
                            min={-2000}
                            max={2000}
                            step="1"
                            value={parseInt(vv) || 0}
                            onChange={e => updatePath1(i, ii, e)}
                            style={{
                              width: '100%',
                              accentColor: '#38bdf8',
                              cursor: 'pointer',
                            }}
                          />
                          <input
                            type="number"
                            min={-2000}
                            max={2000}
                            step="1"
                            value={parseInt(vv) || 0}
                            onChange={e => updatePath1(i, ii, e)}
                            style={{ ...inputBase, width: '100%' }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default PathModifier;