import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as fabric from "fabric";
import { generateUniqueId, shadowOptions } from "./common";
import { mousedownandmousemoveevent } from "./Drawing";

import { syncProps, getObjectbyId } from "./theatrejs/WebAnimator";

var currentValue = [];
var temprect;

// define a function that will define what the control does
// this function will be called on every mouse move after a control has been
// clicked and is being dragged.
// The function receive as argument the mouse event, the current trasnform object
// and the current position in canvas coordinate
// transform.target is a reference to the current object being transformed,
function actionHandler(eventData, transform, x, y) {
  var polygon = transform.target,
    currentControl = polygon.controls[polygon.__corner],
    mouseLocalPosition = polygon.toLocalPoint(
      new fabric.Point(x, y),
      "center",
      "center"
    ),
    polygonBaseSize = polygon._getNonTransformedDimensions(),
    size = polygon._getTransformedDimensions(0, 0),
    finalPointPosition = {
      x:
        (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
        polygon.pathOffset.x,
      y:
        (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
        polygon.pathOffset.y,
    };
  polygon.path[currentControl.pointIndex][1] = finalPointPosition.x;
  polygon.path[currentControl.pointIndex][2] = finalPointPosition.y;
  window.dispatch({ type: "CHANGE_PATH1", payload: polygon.path });

  return true;
}
function actionHandler2(eventData, transform, x, y) {
  var polygon = transform.target,
    currentControl = polygon.controls[polygon.__corner],
    mouseLocalPosition = polygon.toLocalPoint(
      new fabric.Point(x, y),
      "center",
      "center"
    ),
    polygonBaseSize = polygon._getNonTransformedDimensions(),
    size = polygon._getTransformedDimensions(0, 0),
    finalPointPosition = {
      x:
        (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
        polygon.pathOffset.x,
      y:
        (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
        polygon.pathOffset.y,
    };
  polygon.path[currentControl.pointIndex][3] = finalPointPosition.x;
  polygon.path[currentControl.pointIndex][4] = finalPointPosition.y;
  window.dispatch({ type: "CHANGE_PATH1", payload: polygon.path });

  return true;
}
function actionHandler3(eventData, transform, x, y) {
  var polygon = transform.target,
    currentControl = polygon.controls[polygon.__corner],
    mouseLocalPosition = polygon.toLocalPoint(
      new fabric.Point(x, y),
      "center",
      "center"
    ),
    polygonBaseSize = polygon._getNonTransformedDimensions(),
    size = polygon._getTransformedDimensions(0, 0),
    finalPointPosition = {
      x:
        (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
        polygon.pathOffset.x,
      y:
        (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
        polygon.pathOffset.y,
    };
  polygon.path[currentControl.pointIndex][5] = finalPointPosition.x;
  polygon.path[currentControl.pointIndex][6] = finalPointPosition.y;
  window.dispatch({ type: "CHANGE_PATH1", payload: polygon.path });

  return true;
}

// define a function that can keep the polygon in the same position when we change its
// width/height/top/left.
function anchorWrapper(anchorIndex, fn, dispatch) {
  return function (eventData, transform, x, y) {
    var fabricObject = transform.target,
      pathObj = fabricObject.path[anchorIndex],
      absolutePoint = fabric.util.transformPoint(
        {
          x: pathObj[1] - fabricObject.pathOffset.x,
          y: pathObj[2] - fabricObject.pathOffset.y,
        },
        fabricObject.calcTransformMatrix()
      ),
      actionPerformed = fn(eventData, transform, x, y),
      /* eslint-disable no-unused-vars */
      newDim = fabricObject._setPath(fabricObject.path),
      /* eslint-disable no-unused-vars */
      polygonBaseSize = fabricObject._getNonTransformedDimensions(),
      newX = (pathObj[1] - fabricObject.pathOffset.x) / polygonBaseSize.x,
      newY = (pathObj[2] - fabricObject.pathOffset.y) / polygonBaseSize.y;
    fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
    dispatch({ type: "CHANGE_PATH1", payload: fabricObject.path });
    if (getObjectbyId(fabricObject.id)) {
      syncProps(fabricObject, getObjectbyId(fabricObject.id));
    }
    return actionPerformed;
  };
}

export function edit(dispatch) {
  // clone what are you copying since you
  // may want copy and paste on different moment.
  // and you do not want the changes happened
  // later to reflect on the copy.
  if (window.editor.canvas.getActiveObjects()[0]?.type === "path") {
    var poly = window.editor.canvas.getActiveObjects()[0];
    window.editor.canvas.setActiveObject(poly);
    poly.edit = !poly.edit;
    if (poly.edit) {
      var lastControl = poly.path.length - 2;
      poly.cornerStyle = "circle";
      poly.cornerColor = "black";
      poly.transparentCorners = false;
      poly.controls = poly.path.reduce(function (acc, point, index) {
        if (index < poly.path.length - 1) {
          acc["p1st" + index] = new fabric.Control({
            positionHandler: polygonPositionHandler,
            actionHandler: anchorWrapper(
              index > 0 ? index - 1 : lastControl,
              actionHandler,
              dispatch
            ),
            actionName: "modifyPolygon",
            pointIndex: index,
            render: renderIcon(`${index + 1}0`, point),
          });
          if (point[0] === "Q" || point[0] === "C") {
            acc["p2nd" + index] = new fabric.Control({
              positionHandler: polygonPositionHandler2,
              actionHandler: anchorWrapper(
                index > 0 ? index - 1 : lastControl,
                actionHandler2,
                dispatch
              ),
              actionName: "modifyPolygon2",
              pointIndex: index,
              render: renderIcon(`${index + 1}1`, point),
            });
          }
          if (point[0] === "C") {
            acc["p3rd" + index] = new fabric.Control({
              positionHandler: polygonPositionHandler3,
              actionHandler: anchorWrapper(
                index > 0 ? index - 1 : lastControl,
                actionHandler3,
                dispatch
              ),
              actionName: "modifyPolygon3",
              pointIndex: index,
              render: renderIcon(`${index + 1}2`, point),
            });
          }
        }
        return acc;
      }, {});
    } else {
      poly.cornerColor = "blue";
      poly.cornerStyle = "rect";
      poly.controls = fabric.FabricObject.prototype.controls;
    }
    poly.hasBorders = !poly.edit;
    window.editor.canvas.requestRenderAll();
  }
}


export const startPath = () => {
  window.editor.canvas.off("mouse:down");
  window.editor.canvas.off("mouse:move");
  currentValue = [];
  window.editor.canvas.on("mouse:down", eventHandlerMouseDown);
  window.editor.canvas.on("mouse:move", eventHandlerMouseMove);
};
const eventHandlerMouseMove = (e) => {
  if (currentValue.length > 0) {
    currentValue.push(["L", e.pointer.x, e.pointer.y]);
    window.editor.canvas.remove(temprect);
    temprect = new fabric.Path(currentValue, {
      shadow: shadowOptions,
      opacity: 1,
      fill: "#ff0000",
      hasRotatingPoint: true,
      objectCaching: false,
      stroke: "#ffff00",
      strokeWidth: 2,
    });
    currentValue.pop();
    window.editor.canvas.add(temprect);
    window.editor.canvas.requestRenderAll();
  }
};

const eventHandlerMouseDown = (e) => {
  if (currentValue.length === 0) {
    currentValue.push(["M", e.pointer.x, e.pointer.y]);
  } else {
    if (currentValue[currentValue.length - 1][0] === "M") {
      currentValue.push([
        "Q",
        (currentValue[currentValue.length - 1][1] + e.pointer.x) / 2,
        (currentValue[currentValue.length - 1][2] + e.pointer.y) / 2,
        e.pointer.x,
        e.pointer.y,
      ]);
    } else {
      currentValue.push([
        "Q",
        (currentValue[currentValue.length - 1][3] + e.pointer.x) / 2,
        (currentValue[currentValue.length - 1][4] + e.pointer.y) / 2,
        e.pointer.x,
        e.pointer.y,
      ]);
    }
  }
  if (currentValue.length > 0) {
    if (currentValue.length > 1) {
      window.editor.canvas.remove(temprect);
    }
    temprect = new fabric.Path(currentValue, {
      shadow: { ...shadowOptions, blur: 0 },
      fill: "#ff0000",
      objectCaching: false,
      stroke: "#ffff00",
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

    if (point[0] === "C" && icon % 10 === 1) {
      ctx.beginPath();
      ctx.moveTo(left, top);
    } else {
      ctx.lineTo(left, top);
      ctx.stroke();
    }

    if (
      (point[0] !== "M" && point[0] === "C" && icon % 10 !== 2) ||
      (point[0] === "Q" && icon % 10 !== 1)
    ) {
      // Draw the circle
      ctx.save();

      ctx.beginPath(); // Begin a new path
      ctx.arc(left, top, 5, 0, 2 * Math.PI); // Define the circle
      ctx.fillStyle = "black"; // Set the fill color
      ctx.fill(); // Fill the circle with the specified color
      ctx.closePath(); // Close the path (optional, but good practice)
      ctx.restore();
    } else {
      // Draw the circle
      ctx.save();
      ctx.beginPath(); // Begin a new path
      ctx.arc(left, top, 5, 0, 2 * Math.PI); // Define the circle
      ctx.fillStyle = "white"; // Set the fill color
      ctx.fill(); // Fill the circle with the specified color
      ctx.closePath(); // Close the path (optional, but good practice)
      ctx.restore();
    }
  };
}

// define a function that can locate the controls.
// this function will be used both for drawing and for interaction.
function polygonPositionHandler(dim, finalMatrix, fabricObject) {
  var pathObj = fabricObject.path[this.pointIndex];
  var x = pathObj[1] - fabricObject.pathOffset.x,
    y = pathObj[2] - fabricObject.pathOffset.y;
  return fabric.util.transformPoint(
    { x: x, y: y },
    fabric.util.multiplyTransformMatrices(
      fabricObject.canvas.viewportTransform,
      fabricObject.calcTransformMatrix()
    )
  );
}
function polygonPositionHandler2(dim, finalMatrix, fabricObject) {
  var pathObj = fabricObject.path[this.pointIndex];
  var x = pathObj[3] - fabricObject.pathOffset.x,
    y = pathObj[4] - fabricObject.pathOffset.y;
  return fabric.util.transformPoint(
    { x: x, y: y },
    fabric.util.multiplyTransformMatrices(
      fabricObject.canvas.viewportTransform,
      fabricObject.calcTransformMatrix()
    )
  );
}
function polygonPositionHandler3(dim, finalMatrix, fabricObject) {
  var pathObj = fabricObject.path[this.pointIndex];
  var x = pathObj[5] - fabricObject.pathOffset.x,
    y = pathObj[6] - fabricObject.pathOffset.y;
  return fabric.util.transformPoint(
    { x: x, y: y },
    fabric.util.multiplyTransformMatrices(
      fabricObject.canvas.viewportTransform,
      fabricObject.calcTransformMatrix()
    )
  );
}
const PathModifier = () => {
  const canvas = useSelector((state) => state.canvasReducer.canvas);
  const path1 = useSelector((state) => state.path1Reducer.path1);
  const dispatch = useDispatch();
  window.dispatch = dispatch;

  const closePath = () => {
    if (currentValue.length !== 0) {
      canvas.remove(temprect);
      currentValue.push([
        "Q",
        (currentValue[currentValue.length - 1][3] + currentValue[0][1]) / 2,
        (currentValue[currentValue.length - 1][4] + currentValue[0][2]) / 2,
        currentValue[0][1],
        currentValue[0][2],
      ]);
      currentValue.push(["z"]);
      const id1 = generateUniqueId({ type: "path" });

      const rect = new fabric.Path(currentValue, {
        id: id1,
        class: id1,
        shadow: shadowOptions,
        opacity: 1,
        fill: "#ff0000",
        objectCaching: false,
        stroke: "#ffff00",
        strokeWidth: 2,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      rect.on("mousedblclick", () => {
        edit(dispatch);
      });
      canvas.requestRenderAll();
    }
    canvas.off("mouse:down");
    canvas.off("mouse:move");
    mousedownandmousemoveevent(canvas);
    currentValue = [];
  };

  window.closePath = closePath;
  window.edit = edit;

  const showpaths = () => {
    if (canvas.getActiveObjects()[0]?.type === "path") {
      const aa1 = canvas?.getActiveObjects()[0]?.path;
      currentValue = aa1;
      dispatch({ type: "CHANGE_PATH1", payload: currentValue });
    }
  };
  const deleteValuePoint = (i) => {
    if (canvas.getActiveObjects()[0]?.type === "path") {
      const updatedPath = path1.filter((val, index1) => {
        return i !== index1;
      });
      currentValue = updatedPath;
      dispatch({ type: "CHANGE_PATH1", payload: updatedPath });
      canvas.getActiveObjects()[0].set({ path: updatedPath });
      canvas?.requestRenderAll();
    }
  };

  const addValuePoint = (index, pointType) => {
    if (canvas.getActiveObjects()[0]?.type === "path") {
      const updatedPath = [...path1];
      var nextIndex;
      var midX;
      var midY;
      if (updatedPath[index + 1][0] === "z") {
        nextIndex = 0;
      } else {
        nextIndex = index + 1;
      }
      if (updatedPath[index][0] === "L" || updatedPath[index][0] === "M") {
        midX = (updatedPath[index][1] + updatedPath[nextIndex][1]) / 2;
        midY = (updatedPath[index][2] + updatedPath[nextIndex][2]) / 2;
      } else if (updatedPath[index][0] === "Q") {
        midX = (updatedPath[index][3] + updatedPath[nextIndex][1]) / 2;
        midY = (updatedPath[index][4] + updatedPath[nextIndex][2]) / 2;
      } else if (updatedPath[index][0] === "C") {
        midX = (updatedPath[index][5] + updatedPath[nextIndex][1]) / 2;
        midY = (updatedPath[index][6] + updatedPath[nextIndex][2]) / 2;
      }

      if (pointType === "L") {
        updatedPath.splice(index + 1, 0, ["L", midX, midY]);
      }
      if (pointType === "Q") {
        updatedPath.splice(index + 1, 0, ["Q", midX, midY, midX, midY]);
      }
      if (pointType === "C") {
        updatedPath.splice(index + 1, 0, [
          "C",
          midX,
          midY,
          midX,
          midY,
          midX,
          midY,
        ]);
      }
      currentValue = updatedPath;
      dispatch({ type: "CHANGE_PATH1", payload: updatedPath });
      canvas.getActiveObjects()[0].set({ path: updatedPath });
      canvas?.requestRenderAll();
      edit(dispatch);
      edit(dispatch);
    }
  };

  const updatePath1 = (i, ii, e) => {
    if (canvas.getActiveObjects()[0]?.type === "path") {
      const updatedPath = path1.map((val, index1) => {
        return i !== index1
          ? val
          : val.map((val1, index2) => {
            return ii !== index2 ? val1 : parseInt(e.target.value);
          });
      });

      dispatch({ type: "CHANGE_PATH1", payload: updatedPath });
      currentValue = updatedPath;
      canvas.getActiveObjects()[0].set({ path: updatedPath });
      canvas?.requestRenderAll();
    }
  };

  // Function to create SVG path string from points
  function createPathString(points) {
    let pathString = "";
    points.forEach((point, index) => {
      const command = index === 0 ? "M" : "L";
      pathString += `${command}${point.x} ${point.y} `;
    });
    return pathString.trim();
  }

  // Function to update the path with new points
  function updatePath(newPoints) {
    canvas.getActiveObjects()[0].set({ path: createPathString(newPoints) });
    canvas?.requestRenderAll();
  }

  // Function to find the closest point on the path to the given click location
  // Function to find the closest point on the path to the given click location
  function findClosestPathPoint(pathSegments, clickX, clickY) {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let closestIndex = -1;

    for (let i = 0; i < pathSegments.length; i++) {
      const [command, ...coordinates] = pathSegments[i];

      if (command === "M") {
        continue; // Skip the 'move' command and consider it in the next segment
      }

      // Extract the coordinates for 'L' (line) command
      const [x1, y1] = coordinates.slice(-2);

      const distance = Math.sqrt((x1 - clickX) ** 2 + (y1 - clickY) ** 2);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    return closestIndex;
  }
  // Event listener for the first operation
  function listener1(options) {
    const { pointer } = options;
    const clickX = pointer.x;
    const clickY = pointer.y;

    // Get the current path data points
    const pathData = canvas.getActiveObjects()[0].path;
    console.log(pathData);

    // Parse the current path data string
    // const pathSegments = fabric.util.parsePath(pathData);
    const pathSegments = pathData; // fabric.util.parsePath(pathData);

    // Find the closest point on the path to the click location
    const closestIndex = findClosestPathPoint(pathSegments, clickX, clickY);

    // Insert the new point after the closest point on the path
    if (closestIndex !== -1) {
      const newPoints = [
        ...pathSegments.slice(0, closestIndex + 1),
        ["L", clickX, clickY], // Use 'L' command to create a line to the new point
        ...pathSegments.slice(closestIndex + 1),
      ];

      updatePath(newPoints);
    }
  }

  return (
    <div>
      <div style={{ paddingBottom: 10 }}>
        <div>
          <button onClick={startPath}>
            Start Drawing Path by clicking on canvas
          </button>
          <button onClick={closePath}>Finish Drawing path</button>
        </div>
        <div>
          <button onClick={showpaths}>
            Initialise path of already made path
          </button>
          <button id="edit" onClick={edit}>
            Toggle editing Path
          </button>
        </div>
        <div
          style={{
            maxHeight: 800,
            border: "1px solid grey",
            overflow: "scroll",
          }}
        >
          {path1?.map((val, i) => {
            return (
              <div
                key={i}
                style={{
                  maxWidth: 800,
                  border: "1px solid grey",
                  marginBottom: 10,
                  paddingBottom: 10,
                }}
              >
                Point {i + 1}/{path1.length}
                {i !== path1.length - 1 && (
                  <>
                    <button onClick={() => deleteValuePoint(i)}>Delete</button>
                    <button onClick={() => addValuePoint(i, "L")}>
                      Add L Point
                    </button>
                    <button onClick={() => addValuePoint(i, "Q")}>
                      Add Q Point
                    </button>
                    <button onClick={() => addValuePoint(i, "C")}>
                      Add C Point
                    </button>
                  </>
                )}
                {val.map((vv, ii) => {
                  return (
                    <div key={ii}>
                      {ii === 0 ? (
                        <>
                          <label style={{ width: 40 }}> {vv}</label>
                        </>
                      ) : (
                        ""
                      )}
                      {ii > 0 ? (
                        <>
                          {ii === 1 && `${i + 1}0x`}
                          {ii === 2 && `${i + 1}0y`}
                          {ii === 3 && `${i + 1}1x`}
                          {ii === 4 && `${i + 1}1y`}
                          {ii === 5 && `${i + 1}2x`}
                          {ii === 6 && `${i + 1}2y`}

                          <input
                            style={{ width: 400 }}
                            onChange={(e) => updatePath1(i, ii, e)}
                            type="range"
                            min={-2000}
                            max={2000}
                            step="1"
                            value={parseInt(vv)}
                          />
                          <input
                            style={{ width: 50 }}
                            onChange={(e) => updatePath1(i, ii, e)}
                            type="number"
                            min={-2000}
                            max={2000}
                            step="1"
                            value={parseInt(vv)?.toFixed(0)}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PathModifier;
