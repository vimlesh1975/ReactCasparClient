import axios from "axios";
import { animation } from "./animation.js";
import * as fabric from "fabric";
import _ from "lodash";
import * as d from "@theatre/dataverse";

export const buildDate = "261024_1";

export const importSvgCode = (ss, canvas) => {
  if (ss) {
    fabric.loadSVGFromString(ss).then((output) => {
      parseSvg(output, canvas);
    });
    canvas.requestRenderAll();
  }
};

export const parseSvg = (output, canvas) => {
  console.log(output);
  // eslint-disable-next-line
  const { objects, elements, options, allElements } = output;

  // Find extraproperty tags
  const extrapropertyTags = allElements.filter(
    (svgTag) => svgTag.tagName === "extraproperty"
  );

  if (extrapropertyTags.length === 0) {
    console.log("No extraproperty tags found. Using default values.");
  }

  var textNumber = 0;
  objects.forEach((obj, index) => {
    const id = generateUniqueId({ type: "id" });
    obj.set({
      id: obj.id ?? id,
      class: obj.id ?? id,
      objectCaching: false,
      shadow: obj.shadow ?? { ...shadowOptions, blur: 5 },
    });

    if (obj.type === "path") {
      obj.on("mousedblclick", () => {
        window.edit(window.dispatch);
      });
    }

    if (obj.type === "text") {
      // Set default values if no extraproperty tags found
      let width = 200;
      let textAlign = "left";

      if (extrapropertyTags.length > 0) {
        // Use extraproperty tag values if available
        width = extrapropertyTags[textNumber]?.getAttribute("width") || width;
        textAlign =
          extrapropertyTags[textNumber]?.getAttribute("textAlign") || textAlign;
        textNumber++;
      }

      console.log(width, textAlign);

      const currentElement = elements[index];

      // Concatenate all the tspans into one text with newline characters
      let combinedText = "";
      Array.from(currentElement.children).forEach((tspan) => {
        combinedText += tspan.innerHTML + "\n"; // Adds each tspan's text and a newline
      });

      combinedText = combinedText.trimEnd();

      const tspan = currentElement.children[0];
      const { x, y } = tspan.attributes;

      let leftPosition = obj.left;

      // Adjust the x position based on alignment
      if (textAlign === "center") {
        leftPosition = obj.left - (parseInt(width) * obj.scaleX) / 2;
      } else if (textAlign === "right") {
        leftPosition = obj.left - (parseInt(width) * obj.scaleX) / 2;
      } else {
        leftPosition = obj.left + Number(x.value);
      }

      // Create a new Textbox with combined tspan text
      const text = new fabric.Textbox(combinedText, {
        ...obj,
        left: leftPosition,
        top: obj.top + Number(y.value),
        textAlign: textAlign,
        width: parseInt(width),
      });

      // Add the text to the canvas
      return canvas.add(text);
    } else {
      // Add non-text objects directly to the canvas
      canvas.add(obj);
    }
  });
};

export const setPrimitivePropAsSequenced = (object, propsPrimitive) => {
  const studioPrivate = window.__TheatreJS_StudioBundle._studio;
  studioPrivate.transaction(({ stateEditors }) => {
    const pathToProp = d.getPointerParts(propsPrimitive).path;
    const propAddress = { ...object.address, pathToProp };
    stateEditors.coreByProject.historic.sheetsById.sequence.setPrimitivePropAsSequenced(
      propAddress
    );
  });
};

fabric.FabricObject.prototype.toObject = (function (toObject) {
  return function (propertiesToInclude) {
    propertiesToInclude = (propertiesToInclude || []).concat([
      "id",
      "class",
      "selectable",
    ]);
    return toObject.call(this, propertiesToInclude);
  };
})(fabric.FabricObject.prototype.toObject);

export const loopDirection = ["normal", "reverse", "alternate", "AR"];

export const defaultImageSrc =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wD/AP+";
export const generateUniqueNumber = () => {
  return Math.random().toString(36).slice(2, 11);
};

export const generateUniqueId = (object) => {
  return object.type + "_" + Number(Math.floor(Math.random() * 900) + 100); // Generates a number between 100 and 999
};

export const animate = (canvas, sss) => {
  var ss1 = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  sss.set({
    text: ss1,
  });
  canvas.requestRenderAll();
};

export const addRoundedCornerImage = (canvas, imageName1) => {
  const id = generateUniqueId({ type: "rect" });

  fabric.util.loadImage(imageName1, (myImg) => {
    if (myImg == null) {
      alert("Error!");
    } else {
      var rect = new fabric.Rect({
        id: id,
        class: id,
        left: 630,
        top: 10,
        stroke: "#000000",
        strokeWidth: 3,
        rx: 30,
        objectCaching: false,
        shadow: shadowOptions,
        ry: 30,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);

      rect.set({
        width: myImg.width,
        height: myImg.height,
        fill: new fabric.Pattern({ source: myImg, repeat: "no-repeat" }),
      });
      canvas.renderAll();
    }
  });
};

export const Uploaddropedfile2 = (file0, canvas, x, y) => {
  console.log(file0);
  const id = generateUniqueId({ type: "dropped" });
  if (file0) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = async function () {
        var image = new fabric.Image(imgObj);
        image.set({
          id: id,
          class: id,
          shadow: shadowOptions,
          strokeUniform: true,
          objectCaching: false,
          left: x,
          top: y,
          fill: "#ff0000",
          stroke: "#00ff00",
        });
        // .scale(0.5);
        canvas.add(image);
        canvas.setActiveObject(image);
      };
    };
    reader.readAsDataURL(file0);
  }
};

export const Uploaddropedfile = async (file0, canvas, x, y) => {
  console.log(file0);
  const id = generateUniqueId({ type: "dropped" });
  if (file0) {
    const reader = new FileReader();
    reader.onload = async function (event) {
      try {
        fabric.FabricImage.fromURL(event.target.result).then((img) => {
          img.set({
            id: id,
            class: id,
            shadow: shadowOptions,
            strokeUniform: true,
            objectCaching: false,
            left: x,
            top: y,
            fill: "#ff0000",
            stroke: "#00ff00",
          });
          canvas.add(img);
          canvas.setActiveObject(img);
        });
        canvas.requestRenderAll();
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    reader.readAsDataURL(file0);
  }
};

export const Upload = (e, canvas, id = generateUniqueId({ type: "image" })) => {
  return new Promise((resolve, reject) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((element) => {
        var reader = new FileReader();
        reader.onload = function (event) {
          var imgObj = new Image();
          imgObj.src = event.target.result;
          imgObj.onload = function () {
            fabric.FabricImage.fromURL(event.target.result).then((image) => {
              image.set({
                left: 300,
                top: 300,
                id: id,
                class: id,
                shadow: shadowOptions,
                strokeUniform: true,
                objectCaching: false,
                fill: "#ff0000",
                stroke: "#00ff00",
                src: imgObj.src,
              });
              // .scale(0.5);

              canvas.add(image);
              canvas.setActiveObject(image);
              resolve();
            });
          };
        };
        reader.readAsDataURL(element);
      });
    }
  });
};

export const addImage = (canvas, id = generateUniqueId({ type: "image" })) => {
  return new Promise((resolve) => {
    var fInput = document.createElement("input"); //hidden input to open filedialog
    fInput.setAttribute("type", "file"); //opens files
    fInput.setAttribute("accept", "image/*"); ////only useful for inspector debugging
    // fInput.setAttribute("multiple", "false"); ////only useful for inspector debugging
    fInput.removeAttribute("multiple");

    fInput.click();
    fInput.onchange = (e) => {
      Upload(e, canvas, id).then(() => {
        resolve();
      });
    };
  });
};

export const createTextBox = (
  canvas,
  id = generateUniqueId({ type: "textbox" })
) => {
  const text = new fabric.Textbox(id, {
    shadow: shadowOptions,
    id: id,
    class: id,
    left: 103 * 1.87,
    top: 200,
    width: 480 * 1.87,
    fill: "#ffffff",
    fontFamily: options.currentFont,
    fontWeight: "bold",
    fontSize: options.currentFontSize,
    editable: true,
    objectCaching: false,
    textAlign: "left",
    stroke: "#000000",
    strokeWidth: 0,
  });
  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.requestRenderAll();
};

export const createIText = (canvas) => {
  const id = generateUniqueId({ type: "itext" });
  const text = new fabric.IText(
    "अगला प्रशिक्षण 01 अगस्त 2022 से है| Next Training is from 01 August 2022.",
    {
      shadow: shadowOptions,
      id: id,
      class: id,
      left: 1000,
      top: 150,
      width: 480,
      fill: options.currentColor,
      fontFamily: options.currentFont,
      fontWeight: "bold",
      fontSize: options.currentFontSize,
      editable: true,
      objectCaching: false,
      textAlign: "left",
      stroke: options.stroke,
      strokeWidth: options.strokeWidth,
    }
  );
  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
};

export const createText = (canvas) => {
  const id = generateUniqueId({ type: "text" });

  const text = new fabric.FabricText(
    "अगला प्रशिक्षण 01 अगस्त 2022 से है| Timeline has been shifted from main tab to below tab.",
    {
      id: id,
      class: id,
      shadow: shadowOptions,
      left: 800,
      top: 50,
      width: 480 * 1.87,
      fill: options.currentColor,
      fontFamily: options.currentFont,
      fontWeight: "bold",
      fontSize: options.currentFontSize,
      editable: true,
      objectCaching: false,
      textAlign: "left",
      stroke: options.stroke,
      strokeWidth: options.strokeWidth,
    }
  );

  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
};

export const addUpTimer = (canvas) => {
  const id = generateUniqueId({ type: "textbox" });

  const sss = new fabric.Textbox("", {
    shadow: shadowOptions,
    left: 700,
    top: 78,
    width: 100 * 1.87,
    fill: "#ffffff",
    backgroundColor: options.backgroundColor,
    fontFamily: options.currentFont,
    fontWeight: "bold",
    fontSize: options.currentFontSize,
    editable: true,
    objectCaching: false,
    textAlign: "center",
    stroke: "#000000",
    strokeWidth: 0,
    id: "uptimer1",
    class: id,
  });

  canvas.add(sss);
  canvas.setActiveObject(sss);
  canvas.requestRenderAll();
  var startTime = new Date();
  setInterval(() => {
    var diff = new Date().getTime() - startTime.getTime();
    var date_diff = new Date(diff - 30 * 60 * 1000);
    var ss1 =
      date_diff.toLocaleString("en-US", {
        minute: "2-digit",
        second: "2-digit",
      }) +
      ":" +
      String(date_diff.getMilliseconds()).padStart(3, "0");
    sss.set({
      text: ss1,
    });
    canvas.requestRenderAll();
  }, 40);
};

export const addClock = (canvas) => {
  const id = generateUniqueId({ type: "textbox" });

  const sss = new fabric.Textbox("", {
    shadow: shadowOptions,
    left: 600,
    top: 85,
    width: 100 * 1.87,
    fill: "#ffffff",
    backgroundColor: options.backgroundColor,
    fontFamily: options.currentFont,
    fontWeight: "bold",
    fontSize: options.currentFontSize,
    editable: true,
    objectCaching: false,
    textAlign: "center",
    stroke: "#000000",
    strokeWidth: 0,
    id: "clock1",
    class: id,
  });

  canvas.add(sss);
  canvas.setActiveObject(sss);
  canvas.requestRenderAll();
  setInterval(() => {
    animate(canvas, sss);
  }, 1000);
};

export const gradient = new fabric.Gradient({
  type: "linear",
  // gradientUnits: 'pixels', // or 'percentage'
  gradientUnits: "percentage", // or 'percentage'
  coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
  colorStops: [
    { offset: 0, color: "red" },
    { offset: 0.2, color: "orange" },
    { offset: 0.4, color: "yellow" },
    { offset: 0.6, color: "green" },
    { offset: 0.8, color: "blue" },
    { offset: 1, color: "purple" },
  ],
});

export const createTextBoxforDragedText = (canvas, dragedText, x, y) => {
  const id = generateUniqueId({ type: "textbox" });

  const text = new fabric.Textbox(dragedText, {
    shadow: shadowOptions,
    id: id,
    class: id,
    left: x,
    top: y,
    width: 480 * 1.87,
    fill: "#ffffff",
    fontFamily: options.currentFont,
    fontWeight: "bold",
    fontSize: options.currentFontSize,
    editable: true,
    objectCaching: false,
    textAlign: "left",
    stroke: "#000000",
    strokeWidth: 0,
  });

  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
};

export const pasteClipboard = async (canvas) => {
  try {
    const clipboardContents = await navigator.clipboard.read();
    if (clipboardContents) {
      for (const item of clipboardContents) {
        if (item.types.includes("text/plain")) {
          createTextBoxforDragedText(
            canvas,
            await navigator.clipboard.readText(),
            Math.random() * 1920,
            Math.random() * 1080
          );
        }
        if (item.types.includes("image/png")) {
          const id = generateUniqueId({ type: "image" });

          const blob = await item.getType("image/png");
          base64EncodeBlob(blob).then((base64) => {
            fabric.FabricImage.fromURL("data:image/png;base64," + base64).then(
              (image) => {
                image.set({
                  id: id,
                  class: id,
                  shadow: shadowOptions,
                  strokeUniform: true,
                  objectCaching: false,
                  fill: "#ff0000",
                  stroke: "#00ff00",
                });
                canvas.add(image);
                canvas.requestRenderAll();
              }
            );
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const STEP = 5;
export const Direction = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
};

export const moveSelected = (direction) => {
  var activeObject = window.editor.canvas.getActiveObject();
  if (activeObject) {
    switch (direction) {
      case Direction.LEFT:
        activeObject.set({ left: activeObject.left - STEP });
        break;
      case Direction.UP:
        activeObject.set({ top: activeObject.top - STEP });
        break;
      case Direction.RIGHT:
        activeObject.set({ left: activeObject.left + STEP });
        break;
      case Direction.DOWN:
        activeObject.set({ top: activeObject.top + STEP });
        break;
      default:
      //nothing
    }
    activeObject.setCoords();
    window.editor.canvas.renderAll();
  }
};

export const replaceWithImage = (canvas) => {
  const element = canvas.getActiveObjects()[0];
  if (element?.type === "image") {
    var reader = new FileReader();
    var fInput = document.createElement("input"); //hidden input to open filedialog
    fInput.setAttribute("type", "file");
    fInput.setAttribute("accept", "image/*");
    fInput.click();
    fInput.onchange = (e) => {
      reader.onloadend = () => {
        fabric.FabricImage.fromURL(reader.result).then((img) => {
          img.set({
            scaleX: element.width / img.width,
            scaleY: element.height / img.height,
          });
          element.setSrc(img.cloneAsImage().getSrc()).then(() => {
            element.set({ visible: true });
            canvas.requestRenderAll();
          });
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    };
  }
};
const finalPosition = (element, canvas) => {
  if (canvas.getActiveObjects().length > 1) {
    var activeSelection = canvas.getActiveObject();
    var matrix = activeSelection.calcTransformMatrix();
    var objectPosition = { x: element.left, y: element.top };
    var finalPosition = fabric.util.transformPoint(objectPosition, matrix);
    return finalPosition;
  } else {
    finalPosition = { x: element.left, y: element.top };
    return finalPosition;
  }
};
export const cloneAsImage = (canvas) => {
  const id = generateUniqueId({ type: "id" });

  canvas.getActiveObjects().forEach(async (element) => {
    const preshadow = element.shadow;

    element.set("shadow", null);
    const dataURL = element.toDataURL({
      format: "png",
      multiplier: 1, // Adjust multiplier for higher resolution
    });

    const clone = await fabric.FabricImage.fromURL(dataURL);
    clone.set({
      left: finalPosition(element, canvas).x + 10,
      top: finalPosition(element, canvas).y + 10,
      id: id,
      class: id,
      shadow: {
        color: "black",
        blur: 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: false,
      },
    });
    canvas.add(clone);
    canvas.requestRenderAll();
    element.shadow = preshadow;
  });
};

export const createRandomeStrip = (canvas) => {
  const id = generateUniqueId({ type: "path" });

  function generateRandomStyledPathWithSpiral(width, height) {
    const startX = Math.random() * (width - 1700);
    const startY = Math.random() * (height - 200);
    const endX = startX + 1700;
    const endY = startY + 200;
    // Control points for curves
    const controlX1 = startX + Math.random() * 100;
    const controlY1 = startY + Math.random() * 100;

    const topCurveX = startX + 850; // X-coordinate for the top middle curve
    const topCurveY = startY - 50; // Y-coordinate for the top middle curve

    const controlX2 = endX - Math.random() * 100;
    const controlY2 = startY + Math.random() * 100;

    const bottomCurveX = startX + 850; // X-coordinate for the bottom middle curve
    const bottomCurveY = endY + 50; // Y-coordinate for the bottom middle curve

    const controlX3 = endX - Math.random() * 100;
    const controlY3 = endY - Math.random() * 100;

    const controlX4 = startX + Math.random() * 100;
    const controlY4 = endY - Math.random() * 100;

    return [
      ["M", startX, startY],
      [
        "C",
        controlX1,
        controlY1,
        topCurveX,
        topCurveY,
        startX + 200,
        startY + 50,
      ],
      [
        "C",
        controlX2,
        controlY2,
        endX - 200,
        startY + 50,
        endX - 200,
        startY + 50,
      ],
      [
        "C",
        controlX3,
        controlY3,
        bottomCurveX,
        bottomCurveY,
        endX - 200,
        endY - 50,
      ],
      [
        "C",
        controlX4,
        controlY4,
        startX + 200,
        endY - 50,
        startX + 200,
        endY - 50,
      ],
      ["Z"],
    ];
  }

  var randomStyledPathWithSpiral = generateRandomStyledPathWithSpiral(
    1920,
    1080
  );
  var pathObject = new fabric.Path(randomStyledPathWithSpiral, {
    id: id,
    class: id,
    shadow: shadowOptions,
    left: 200,
    top: 300,
    fill: "#ff00ff",
    stroke: options.stroke,
    hasRotatingPoint: true,
    objectCaching: false,
    strokeWidth: 5,
    strokeUniform: true,
  });

  pathObject.on("mousedblclick", () => {
    if (window.edit) {
      window.edit(window.dispatch);
    }
  });
  canvas.add(pathObject);
  canvas.setActiveObject(pathObject);
};

export const createPentagon = (canvas) => {
  const id = generateUniqueId({ type: "polygon" });

  const rect = new fabric.Polygon(
    [
      { x: 290, y: 124 },
      { x: 390, y: 190 },
      { x: 354, y: 297 },
      { x: 226, y: 297 },
      { x: 192, y: 190 },
    ],
    {
      id: id,
      class: id,
      shadow: shadowOptions,
      top: 300,
      left: 80,
      rx: 50,
      ry: 80,
      opacity: 0.9,
      fill: "#0000ff",
      hasRotatingPoint: true,
      objectCaching: false,
      stroke: options.stroke,
      strokeWidth: 3,
      strokeUniform: true,
    }
  );
  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.requestRenderAll();
};

export const createRect = (canvas) => {
  const id = generateUniqueId({ type: "rect" });
  const rect = new fabric.Rect({
    id: id,
    class: id,
    shadow: shadowOptions,
    top: 200,
    left: 650,
    width: 500 * 1.87,
    height: 40 * 1.87,
    opacity: 0.9,
    fill: "#051b7d",
    hasRotatingPoint: true,
    objectCaching: false,
    stroke: options.stroke,
    strokeWidth: 1,
    strokeUniform: true,
    rx: 10,
    ry: 10,
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
  // canvas.requestRenderAll();
  canvas.renderAll();
};

export const removeShadow = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("shadow", { ...shadowOptions, blur: 0 });
  });
  canvas.requestRenderAll();
};

export const removeFill = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("fill", "");
  });
  canvas.requestRenderAll();
};

export const removeStroke = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("strokeWidth", 0);
    element.set("stroke", "");
  });
  canvas.requestRenderAll();
};

export const createCircle = (canvas) => {
  const id = generateUniqueId({ type: "circle" });

  const circle = new fabric.Circle({
    id: id,
    class: id,
    shadow: shadowOptions,
    top: 0,
    left: 550,
    radius: 50,
    fill: "#0000ff",
    objectCaching: false,
    stroke: options.stroke,
    strokeWidth: 3,
    strokeUniform: true,
  });
  canvas.add(circle);
  canvas.setActiveObject(circle);
  canvas.requestRenderAll();
};

export const createHLine = (canvas) => {
  const id = generateUniqueId({ type: "path" });
  const rect = new fabric.Path("M 0 0 L 500 1", {
    id: id,
    class: id,
    shadow: { ...shadowOptions, Blur: 10 },
    top: 500,
    left: 710,
    fill: "#0000ff",
    objectCaching: false,
    stroke: "#ff0000",
    strokeWidth: 3,
    strokeUniform: true,
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.requestRenderAll();
};
export const createTriangle = (canvas) => {
  const id = generateUniqueId({ type: "triangle" });
  const triangle = new fabric.Triangle({
    id: id,
    class: id,
    shadow: shadowOptions,
    top: 50,
    left: 350,
    width: 100,
    height: 100,
    fill: "#ff00ff",
    cornerSize: 7,
    objectCaching: false,
    hasRotatingPoint: true,
    stroke: options.stroke,
    strokeWidth: 3,
    strokeUniform: true,
  });

  canvas.add(triangle);
  canvas.setActiveObject(triangle);
  canvas.requestRenderAll();
};

export const groupObjects = (canvas, shouldGroup) => {
  const id = generateUniqueId({ type: "group" });
  if (shouldGroup) {
    if (!canvas.getActiveObject()) {
      return;
    }
    if (canvas.getActiveObject().type !== "activeselection") {
      return;
    }
    const objects = canvas.getActiveObjects();
    canvas.discardActiveObject();
    const group = new fabric.Group(objects, {
      interactive: true,
      subTargetCheck: true,
    });
    group.set({
      shadow: { ...shadowOptions, blur: 0 },
      id: id,
      class: id,
      fill: "#ff0000",
    });
    canvas.add(group);
    canvas.setActiveObject(group);
    objects.forEach((element) => {
      canvas.remove(element);
    });
  } else {
    if (!canvas.getActiveObject()) {
      return;
    }
    if (canvas.getActiveObject().type !== "group") {
      return;
    }
    const group = canvas.getActiveObject();
    const objects = group && group.removeAll();
    canvas.discardActiveObject();
    canvas.remove(group);
    canvas.add(...objects);
  }
  canvas.requestRenderAll();
};

export const removeBg = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("backgroundColor", "");
  });
  canvas.requestRenderAll();
};
export const textNormal = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("fontWeight", "normal");
  });
};
export const txtBold = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set(
      "fontWeight",
      element.fontWeight === "normal" ? "bold" : "normal"
    );
  });
  canvas.requestRenderAll();
};
export const textItalic = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("fontStyle", element.fontStyle === "italic" ? "" : "italic");
  });
  canvas.requestRenderAll();
};

export const textLineThrough = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("linethrough", !element.linethrough);
  });
  canvas.requestRenderAll();
};
export const textUnderline = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("underline", !element.underline);
  });
  canvas.requestRenderAll();
};

export const alignCenter = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("textAlign", "center");
  });
  canvas.requestRenderAll();
};
export const alignRight = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("textAlign", "right");
  });
  canvas.requestRenderAll();
};
export const alignLeft = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    element.set("textAlign", "left");
  });
  canvas.requestRenderAll();
};
export const unlockAll = (canvas) => {
  canvas.forEachObject((element) => (element.selectable = true));
};

export const lock = (canvas) => {
  canvas.getActiveObjects().forEach((element) => (element.selectable = false));
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};
export const undo2 = (canvas) => {
  canvas.undo();
  canvas.getObjects().forEach((element) => {
    element.set({ objectCaching: false });
  });
  canvas.requestRenderAll();
};
const history = [];
export const saveCanvasState = (canvas) => {
  const json = canvas.toJSON();
  history.push(json);
};
export const undo = (canvas) => {
  if (history.length <= 1) return; // Do nothing if no more undo steps are available
  history.pop(); // Remove the last state
  const previousState = history[history.length - 1]; // Get the previous state
  canvas.getObjects().forEach((obj) => {
    canvas.remove(obj);
  });

  fabric.util.enlivenObjects(previousState.objects).then((objects) => {
    objects.forEach((obj) => {
      canvas.add(obj); // Add each object to the canvas
    });
    canvas.renderAll(); // Re-render the canvas
  });
};

export var _clipboard;

export const copy = (canvas) => {
  const activeObject = canvas?.getActiveObject();
  if (activeObject) {
    // Store the JSON representation instead of cloning the object
    _clipboard = _.cloneDeep(
      activeObject.toObject(["id", "class", "selectable"])
    );
  }
};

export const paste = async (canvas) => {
  if (_clipboard) {
    let objectsToSelect = [];
    let left = 0;
    let top = 0;
    try {
      const objects = await fabric.util.enlivenObjects([_clipboard]);
      let aa = [];
      const objectType = _clipboard.type;

      if (objectType === "ActiveSelection") {
        aa = objects[0]._objects;
      } else {
        aa = objects;
      }
      aa.forEach((object) => {
        left += 100;
        top += 100;
        var id = generateUniqueId({ type: object.type.toLowerCase() });
        while (findElementWithId(canvas, id)) {
          id = generateUniqueId({ type: object.type.toLowerCase() });
        }
        object.set({
          left: left,
          top: top,
          id: id,
          class: id,
          objectCaching: false,
          evented: true,
        });
        object.on("mousedblclick", () => {
          window.edit(window.dispatch);
        });
        canvas.add(object);
        objectsToSelect.push(object);
      });
      if (objectsToSelect.length > 1) {
        const selection = new fabric.ActiveSelection(objectsToSelect, {
          canvas: canvas,
        });
        canvas.setActiveObject(selection);
      } else if (objectsToSelect.length === 1) {
        canvas.setActiveObject(objectsToSelect[0]);
      }

      canvas.requestRenderAll();
    } catch (error) {
      console.error("Error during paste operation:", error);
    }
  } else {
    console.log("Clipboard is empty, nothing to paste");
  }
};

export const createShape = (canvas, shape, size = 0.4) => {
  const id = generateUniqueId({ type: "path" });

  const rect = new fabric.Path(shape, {
    id: id,
    class: id,
    shadow: shadowOptions,
    top: 250,
    left: Math.random() * 1000,
    scaleX: size,
    scaleY: size,
    opacity: 0.9,
    fill: "#051b7d",
    objectCaching: false,
    stroke: options.stroke,
    strokeWidth: 2,
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
  rect.on("mousedblclick", () => {
    window.edit(window.dispatch);
  });
  rect.setCoords();

  canvas.requestRenderAll();
};

export const selectAll = (canvas) => {
  canvas.discardActiveObject();
  var sel = new fabric.ActiveSelection(canvas.getObjects(), {
    canvas: canvas,
  });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
};
export const deSelectAll = (canvas) => {
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

var clipPath1 = null;
export const setasClipPath = (canvas) => {
  clipPath1 = canvas.getActiveObjects();
};
export const cliptoPath = (canvas) => {
  var img = canvas.getActiveObjects();
  if (clipPath1.length > 0 && img.length > 0) {
    clipPath1[0].set({
      shadow: { ...shadowOptions, blur: 0 },
      absolutePositioned: true,
    });
    canvas.sendToBack(clipPath1[0]);
    img[0].set("clipPath", clipPath1[0]);
    clipPath1 = null;
    canvas.requestRenderAll();
  }
};

export const setGradientColor = (canvas) => {
  canvas.getActiveObjects().forEach((element) => (element.fill = gradient));
  canvas.requestRenderAll();
};
export const gradient2 = () => {
  return new fabric.Gradient({
    type: "linear",
    gradientUnits: "percentage",
    coords: { x1: 0, y1: 0, x2: 0, y2: 1 },
    colorStops: [
      {
        offset: 0,
        color:
          "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6),
        opacity: 0.2,
      },
      {
        offset: 0.5,
        color:
          "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6),
        opacity: 1,
      },
      {
        offset: 1,
        color:
          "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6),
        opacity: 0.2,
      },
    ],
  });
};
export const createVLine = (canvas) => {
  const id = generateUniqueId({ type: "path" });

  const rect = new fabric.Path("M 0 0 L 1 500", {
    id: id,
    class: id,
    shadow: { ...shadowOptions, Blur: 10 },
    top: 300,
    left: 475,
    fill: "#0000ff",
    objectCaching: false,
    stroke: "#ffff00",
    strokeWidth: 3,
    strokeUniform: true,
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.requestRenderAll();
};

export const resizeTextWidth = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    if (
      element.type === "text" ||
      element.type === "i-text" ||
      element.type === "textbox"
    ) {
      element.set({ width: element.__lineWidths[0] + 10 });
    }
  });
  canvas.requestRenderAll();
};

export const sameWidth = (canvas) => {
  const arr = [];
  canvas.getActiveObjects().forEach((element) => {
    arr.push(element.width);
  });

  const max = Math.max(...arr);

  canvas.getActiveObjects().forEach((element) => {
    if (
      element.type === "text" ||
      element.type === "i-text" ||
      element.type === "textbox"
    ) {
      element.set({ width: max });
    }
  });
  canvas.requestRenderAll();
};
export const sameWidthIMG = (canvas) => {
  const arr = [];
  canvas.getActiveObjects().forEach((element) => {
    arr.push(element.width * element.scaleX);
  });
  const max = Math.max(...arr);
  canvas.getActiveObjects().forEach((element) => {
    if (element.type === "rect" || element.type === "image") {
      element.set({ scaleX: max / element.width });
    }
  });
  canvas.requestRenderAll();
};
export const sameHeightIMG = (canvas) => {
  const arr = [];
  canvas.getActiveObjects().forEach((element) => {
    arr.push(element.height * element.scaleY);
  });
  const max = Math.max(...arr);
  canvas.getActiveObjects().forEach((element) => {
    if (element.type === "rect" || element.type === "image") {
      element.set({ scaleY: max / element.height });
    }
  });
  canvas.requestRenderAll();
};
export const sameSizeIMG = (canvas) => {
  sameWidthIMG(canvas);
  sameHeightIMG(canvas);
};
export const swapFaceandStrokeColors = (canvas) => {
  canvas.getActiveObjects().forEach((element) => {
    var oldFill = element.fill;
    var oldStroke = element.stroke;
    element.fill = oldStroke;
    element.stroke = oldFill;
  });
  canvas.requestRenderAll();
};
export const deleteAll = (canvas) => {
  const aa = canvas.getObjects();
  aa.forEach((element) => {
    canvas.remove(element);
  });
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const putatCenter = (canvas) => {
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  selectAll(canvas);
  canvas.centerObject(canvas.getActiveObject());
  canvas.requestRenderAll();
};
export const selectedatCenter = (canvas) => {
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  const selectedItems = canvas.getActiveObjects();
  canvas.discardActiveObject();
  selectedItems.forEach((item) => {
    // Center horizontally
    item.set({
      left: (canvas.width - item.width) / 2,
    });
    // Center vertically
    item.set({
      top: (canvas.height - item.height) / 2,
    });
  });
  var sel = new fabric.ActiveSelection(selectedItems, { canvas: canvas });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
};
export const selectedatCenterH = (canvas) => {
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  const selectedItems = canvas.getActiveObjects();
  canvas.discardActiveObject();
  selectedItems.forEach((item) => {
    // Center horizontally
    item.set({
      left: (canvas.width - item.width) / 2,
    });
  });
  var sel = new fabric.ActiveSelection(selectedItems, { canvas: canvas });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
};

export const selectedatCenterV = (canvas) => {
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  const selectedItems = canvas.getActiveObjects();
  canvas.discardActiveObject();
  selectedItems.forEach((item) => {
    // Center vertically
    item.set({
      top: (canvas.height - item.height) / 2,
    });
  });
  var sel = new fabric.ActiveSelection(selectedItems, { canvas: canvas });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
};
export const alignAllLeft = (canvas) => {
  const arr = [];
  canvas.getActiveObjects().forEach((item) => {
    arr.push(item.left);
  });
  const min = Math.min(...arr);
  canvas.getActiveObjects().forEach((item) => {
    item.left = min;
  });
  canvas.requestRenderAll();
};
export const alignAllTop = (canvas) => {
  const arr = [];
  canvas.getActiveObjects().forEach((item) => {
    arr.push(item.top);
  });
  const min = Math.min(...arr);
  canvas.getActiveObjects().forEach((item) => {
    item.top = min;
  });
  canvas.requestRenderAll();
};

export const alignAllRight = (canvas) => {
  const arr = [];
  canvas.getActiveObjects().forEach((item) => {
    arr.push(item.left + item.width * item.scaleX);
  });
  const max = Math.max(...arr);
  canvas.getActiveObjects().forEach((item) => {
    item.left = max - item.width * item.scaleX;
  });
  canvas.requestRenderAll();
};
export const alignAllButtom = (canvas) => {
  const arr = [];
  canvas.getActiveObjects().forEach((item) => {
    arr.push(item.top + item.height * item.scaleY);
  });
  const max = Math.max(...arr);
  canvas.getActiveObjects().forEach((item) => {
    item.top = max - item.height * item.scaleY;
  });
  canvas.requestRenderAll();
};
export const makeVerticalEquidistant = (canvas) => {
  var arr = [];
  canvas.getActiveObjects().forEach((item) => {
    arr.push(item.top);
  });
  arr = arr.sort((a, b) => {
    return a - b;
  });
  const difference1 = arr[1] - arr[0];
  canvas.getActiveObjects().forEach((item, i) => {
    if (i < 2) {
      item.top = arr[i];
    } else {
      item.top = arr[1] + difference1 * (i - 1);
    }
  });
  canvas.requestRenderAll();
};

export const makeHorizontalEquidistant = (canvas) => {
  var arr = [];
  canvas.getActiveObjects().forEach((item) => {
    arr.push(item.left);
  });
  arr = arr.sort((a, b) => {
    return a - b;
  });
  const difference1 = arr[1] - arr[0];
  canvas.getActiveObjects().forEach((item, i) => {
    if (i < 2) {
      item.left = arr[i];
    } else {
      item.left = arr[1] + difference1 * (i - 1);
    }
  });
  canvas.requestRenderAll();
};

export const startGraphics = (canvas, layerNumber, currentscreenSize) => {
  executeScript(`document.getElementById('divid_${layerNumber}')?.remove();`);

  var inAnimation;
  if (window.inAnimationMethod === "mix") {
    inAnimation = `@keyframes example {from {opacity:0} to {opacity:1}} div {animation-name: example;  animation-duration: .5s; }`;
  } else if (
    animation
      .map((val) => val.name)
      .findIndex((val) => val === window.inAnimationMethod) !== -1
  ) {
    inAnimation =
      animation[
        animation
          .map((val) => val.name)
          .findIndex((val) => val === window.inAnimationMethod)
      ].value;
  } else if (window.inAnimationMethod === "lefttoright") {
    inAnimation = ``;
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    endpoint(
      `mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`
    );

    setTimeout(() => {
      endpoint(
        `play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`
      );
    }, 250);

    const script = `
                                                                                  var bb = document.createElement('div');
                                                                                  bb.style.perspective='1920px';
                                                                                  bb.style.transformStyle='preserve-3d';
                                                                                  document.body.appendChild(bb);
                                                                                  var aa = document.createElement('div');
                                                                                  aa.style.position='absolute';
                                                                                  aa.setAttribute('id','divid_' + '${layerNumber}');
                                                                                  aa.style.zIndex = ${layerNumber};
                                                                                  aa.innerHTML=\`${canvas
        .toSVG()
        .replaceAll(
          '"',
          '\\"'
        )
        .replaceAll(
          "`",
          "\\`"
        )
        .replaceAll(
          "$",
          "\\$"
        )}\`;
                                                                                  bb.appendChild(aa);
                                                                                  document.body.style.margin='0';
                                                                                  document.body.style.padding='0';
                                                                                  aa.style.zoom=(${currentscreenSize *
      100
      }/1920)+'%';
                                                                                  document.body.style.overflow='hidden';
                                                                                  var style = document.createElement('style');
                                                                                  style.textContent = '${inAnimation}';
                                                                                  document.head.appendChild(style);
                                                                                  `;
    executeScript(script);
    setTimeout(() => {
      endpoint(`call ${window.chNumber}-${layerNumber} "
              ${script}
          "`);
    }, 300);

    setTimeout(() => {
      endpoint(
        `mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`
      );
    }, 800);
    setTimeout(() => {
      updateGraphics(canvas, layerNumber);
    }, 1100);
    return;
  }

  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  endpoint(
    `play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`
  );

  const scriptforhtml = `
                                                                                  var bb = document.createElement('div');
                                                                                  bb.style.perspective='1920px';
                                                                                  bb.style.transformStyle='preserve-3d';
                                                                                  document.body.appendChild(bb);
                                                                                  var aa = document.createElement('div');
                                                                                  aa.style.position='absolute';
                                                                                  aa.setAttribute('id','divid_' + '${layerNumber}');
                                                                                  aa.style.zIndex = ${layerNumber};
                                                                                  aa.innerHTML=\`${canvas
      .toSVG()
      .replaceAll(
        '"',
        '\\"'
      )
      .replaceAll(
        "`",
        "\\`"
      )
      .replaceAll(
        "$",
        "\\$"
      )}\`;
                                                                                  bb.appendChild(aa);
                                                                                  document.body.style.margin='0';
                                                                                  document.body.style.padding='0';
                                                                                  aa.style.zoom=(${currentscreenSize *
    100
    }/1920)+'%';
                                                                                  document.body.style.overflow='hidden';
                                                                                  var style = document.createElement('style');
                                                                                  style.textContent = '${inAnimation}';
                                                                                  document.head.appendChild(style);
                                                                                  `;
  executeScript(scriptforhtml);

  const scriptforcaspar = `
                                                                                  var bb = document.createElement('div');
                                                                                  bb.style.perspective='1920px';
                                                                                  bb.style.transformStyle='preserve-3d';
                                                                                  document.body.appendChild(bb);
                                                                                  var aa = document.createElement('div');
                                                                                  aa.style.position='absolute';
                                                                                  aa.setAttribute('id','divid_' + '${layerNumber}');
                                                                                  aa.style.zIndex = ${layerNumber};
                                                                                  aa.innerHTML=\`${canvas
      .toSVG()
      .replaceAll(
        '"',
        '\\"'
      )
      .replaceAll(
        "`",
        "\\\\`"
      )
      .replaceAll(
        "$",
        "\\\\$"
      )}\`;
                                                                                  bb.appendChild(aa);
                                                                                  document.body.style.margin='0';
                                                                                  document.body.style.padding='0';
                                                                                  aa.style.zoom=(${currentscreenSize *
    100
    }/1920)+'%';
                                                                                  document.body.style.overflow='hidden';
                                                                                  var style = document.createElement('style');
                                                                                  style.textContent = '${inAnimation}';
                                                                                  document.head.appendChild(style);
                                                                                  `;

  setTimeout(() => {
    endpoint(`call ${window.chNumber}-${layerNumber} "
     ${scriptforcaspar}
          "`);
  }, 100);
  setTimeout(() => {
    updateGraphics(canvas, layerNumber);
  }, 1200);
};

export const playtoGsapCaspar = (
  canvas,
  layerNumber,
  currentscreenSize,
  duration = 1,
  ease = "back.inOut",
  stagger = 0.03
) => {
  const content = JSON.stringify(canvas.toJSON(["id", "class", "selectable"]));

  const contentforHtml = content
    .replaceAll('"', '\\"')
    .replaceAll("\\n", "\\\\n");
  const contentforcasparcg = content
    .replaceAll('"', '\\"')
    .replaceAll("\\n", " \\\\n");

  endpoint(
    `play ${window.chNumber}-${layerNumber} [html] "https://localhost:10000/ReactCasparClient/CanvasPlayer"`
  );
  const script = `
  var aa = document.createElement('div');
  aa.style.position='absolute';
  aa.setAttribute('id','divid_' + '${layerNumber}');
  document.body.style.opacity = 0;
  document.body.style.overflow='hidden';
  document.body.style.zoom=(${currentscreenSize * 100}/1920)+'%';
  aa.innerHTML += \`<canvas id='canvas' width='1920' height='1080'></canvas>;\`;
  document.body.appendChild(aa);
  var canvas = new fabric.Canvas('canvas');
  window.canvas=canvas;
  canvas.loadFromJSON(${contentforcasparcg}).then(() => {
      window.sortedElements = Array.from(canvas.getObjects()).sort(function (a, b) { return a.top - b.top; });
      tl.pause();
      tl.from(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas.requestRenderAll(); } });
          setTimeout(() => {
              document.body.style.opacity = 1;
              tl.play();
          }, 100);
  });
  `;
  setTimeout(() => {
    endpoint(`call ${window.chNumber}-${layerNumber} "${script}"`);
  }, 100);

  const scriptforHtml = `
  document.getElementById('divid_${layerNumber}')?.remove();
  var aa = document.createElement('div');
  aa.style.position='absolute';
  aa.setAttribute('id','divid_' + '${layerNumber}');
  document.body.style.opacity = 1;
  document.body.style.overflow='hidden';
  document.body.style.zoom=(${currentscreenSize * 100}/1920)+'%';
  aa.innerHTML += \`<canvas id='canvas_${layerNumber}' width='1920' height='1080'></canvas>;\`;
  document.body.appendChild(aa);
  window.canvas_${layerNumber} = new fabric.Canvas('canvas_${layerNumber}');
 
  var content =\`${contentforHtml}\`;
  tl.pause();

  canvas_${layerNumber}.loadFromJSON(content).then(() => {
      const sortedElements = Array.from(canvas_${layerNumber}.getObjects()).sort(function (a, b) { return a.top - b.top; });
      tl.from(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas_${layerNumber}.requestRenderAll(); } });
      setTimeout(() => {
          document.body.style.opacity = 1;
          tl.play();
      }, 100);
  })
  `;
  executeScript(scriptforHtml);
};

export const stopGsapLayer = (
  layerNumber,
  duration = 1,
  ease = "back.inOut",
  stagger = 0.03
) => {
  const scriptforhtml = `
  const sortedElements = Array.from(canvas_${layerNumber}.getObjects()).sort(function (a, b) { return a.top - b.top; });
  tl.to(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas_${layerNumber}.requestRenderAll(); } });
      tl.play();
  `;
  executeScript(scriptforhtml);

  const scriptforCasparcg = `
  const sortedElements = Array.from(canvas.getObjects()).sort(function (a, b) { return a.top - b.top; });
  tl.to(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas.requestRenderAll(); } });
      tl.play();
  `;

  endpoint(`call ${window.chNumber}-${layerNumber} "
  ${scriptforCasparcg}
  "`);
};

export const getGdd = (canvas, designerSoftware) => {
  const allObjects = canvas.getObjects().reduce((acc, object) => {
    if (object.id.startsWith("ccg")) {
      if (object.type === "textbox" || object.type === "image") {
        let gddType = "single-line";
        let default1 = "default";

        if (object.type === "textbox") {
          if (object.textLines.length > 1) {
            gddType = "multi-line";
          } else {
            gddType = "single-line";
          }
          default1 = object.text;
        } else if (object.type === "image") {
          gddType = "file-path/image-path";
          default1 = defaultImageSrc;
        }
        acc[object.id] = {
          type: "string",
          label: "label",
          description: object.type,
          default: default1,
          gddType: gddType,
          pattern: "",
        };
      }
    }
    return acc;
  }, {});

  return `<script name="graphics-data-definition" type="application/json+gdd">
    {"$schema": "https://superflytv.github.io/GraphicsDataDefinition/gdd-meta-schema/v1/schema.json",
    "designerSoftware":"${designerSoftware}",
    "type": "object",
    "properties": ${JSON.stringify(allObjects)}
  }
  </script>
  <script type="text/javascript">
  document.addEventListener("DOMContentLoaded", function() {
    window.gddSchema = JSON.parse(document.querySelector('head > script[name="graphics-data-definition"]').innerHTML);
  });
</script>
`;
};

export const setclipPathWhileImporting = (canvas) => {
  const id = generateUniqueId({ type: "id" });

  var objects = canvas.getObjects();
  objects.forEach((object) => {
    object.set({
      id: object.id ? object.id : id,
      class: object.class ? object.class : id,
      shadow: object.shadow ? object.shadow : shadowOptions,
      objectCaching: false,
    });
    if (object.clipPath) {
      const clipPathObject = objects.find(
        (element) => element.id === object.clipPath.id
      );
      clipPathObject.set({ absolutePositioned: true });
      object.set({ clipPath: clipPathObject });
    }
  });
  canvas.requestRenderAll();
};

export const updateText = (canvas, layerNumber) => {
  canvas.getObjects().forEach((element, i) => {
    if (element.type === "textbox") {
      endpoint(
        `call ${window.chNumber}-${layerNumber} "canvas.getObjects()[${i}].set({text:\\"${element.text}\\"});canvas.requestRenderAll();"`
      );
      executeScript(`canvas_${layerNumber}.getObjects()[${i}].set({text:"${element.text}"});
      canvas_${layerNumber}.requestRenderAll();
      `);
    }
  });
};

export const getModifiedObject = (path1) => {
  const aa = {};
  path1.path.forEach((element, i) => {
    const newi = i + 1;

    const originalArray = element;
    const myObject = { ...originalArray };

    // Create a new object with modified keys
    const modifiedObject = {};
    for (const key in myObject) {
      if (key === "1") {
        modifiedObject[newi * 10 + "x"] = myObject[key];
      } else if (key === "2") {
        modifiedObject[newi * 10 + "y"] = myObject[key];
      } else if (key === "3") {
        modifiedObject[newi * 10 + 1 + "x"] = myObject[key];
      } else if (key === "4") {
        modifiedObject[newi * 10 + 1 + "y"] = myObject[key];
      } else if (key === "5") {
        modifiedObject[newi * 10 + 2 + "x"] = myObject[key];
      } else if (key === "6") {
        modifiedObject[newi * 10 + 2 + "y"] = myObject[key];
      } else {
        modifiedObject[key] = myObject[key];
      }
    }

    aa["Point" + newi] = modifiedObject;
  });
  return aa;
};

export const lockUnlock = (canvas, i, dispatch) => {
  canvas.getObjects().forEach((element, ii) => {
    if (i === ii) {
      element.selectable = !element.selectable;
    }
  });
  canvas.requestRenderAll();
  dispatch({ type: "CHANGE_CANVAS", payload: canvas });
};
export const lockUnlock1 = (canvas, i, dispatch) => {
  const element = canvas.item(i);
  element.set({
    lockMovementX: !element.lockMovementX,
    lockMovementY: !element.lockMovementY,

    lockScalingX: !element.lockScalingX,
    lockScalingY: !element.lockScalingY,
    lockRotation: !element.lockRotation,
  });
  element.selectable = !element.selectable;
  canvas.requestRenderAll();
  dispatch({ type: "CHANGE_CANVAS", payload: canvas });
};
export const visibleInVisible = (canvas, i, dispatch) => {
  canvas.getObjects().forEach((element, ii) => {
    if (i === ii) {
      element.visible = !element.visible;
    }
  });
  canvas.requestRenderAll();
  dispatch({ type: "CHANGE_CANVAS", payload: canvas });
};

export const saveFile = async (options, data, fileHandle = null) => {
  if (window.showSaveFilePicker) {
    try {
      const handle = fileHandle || (await window.showSaveFilePicker(options));
      const writable = await handle.createWritable();
      await writable.write(data);
      await writable.close();
      console.log("File saved successfully!", handle.name);
      return handle; // Return the FileHandle object
    } catch (error) {
      console.error("Error saving the file:", error);
    }
  } else {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(data);

    var retVal = prompt(
      "Enter  file name to save : ",
      generalFileName() + "_FileName"
    );
    if (retVal !== null) {
      element.download = retVal + (options.fileExtension ?? ".txt");
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  }
};
export const generalFileName = () => {
  return new Date().toLocaleTimeString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

export const listglobalCompositeOperation = [
  "source-over",
  "source-atop",
  "source-in",
  "source-out",
  "destination-over",
  "destination-atop",
  "destination-in",
  "destination-out",
  "lighter",
  "copy",
  "xor",
  "darker",
  "multiply",
  "screen",
];

export const moveElement = (
  sourceIndex,
  destinationIndex,
  kf,
  xpositions,
  dispatch
) => {
  const updatedkf = [...kf];
  updatedkf.splice(destinationIndex, 0, updatedkf.splice(sourceIndex, 1)[0]);
  dispatch({ type: "CHANGE_KF", payload: updatedkf });

  const updatedxpositions = [...xpositions];
  updatedxpositions.splice(
    destinationIndex,
    0,
    updatedxpositions.splice(sourceIndex, 1)[0]
  );
  dispatch({ type: "CHANGE_XPOSITIONS", payload: updatedxpositions });
};

export const deleteItemfromtimeline = (kf, xpositions, dispatch) => {
  const updatedkf = [...kf];
  const updatedxpositions = [...xpositions];
  window.editor.canvas?.getActiveObjects().forEach((element) => {
    const index1 = window.editor.canvas?.getObjects().indexOf(element);
    window.editor.canvas?.remove(element);
    updatedkf.splice(index1, 1);
    updatedxpositions.splice(index1, 1);
  });
  dispatch({ type: "CHANGE_KF", payload: updatedkf });
  dispatch({ type: "CHANGE_XPOSITIONS", payload: updatedxpositions });
  window.editor.canvas?.discardActiveObject();
  window.editor.canvas?.requestRenderAll();
};
window.deleteItemfromtimeline = deleteItemfromtimeline;

export const sendToBack = (canvas, kf, xpositions, dispatch) => {
  canvas.getActiveObjects().forEach((element) => {
    const sourceIndex = canvas.getObjects().indexOf(element);
    const destinationIndex = 0;
    moveElement(sourceIndex, destinationIndex, kf, xpositions, dispatch);
    canvas.sendObjectToBack(element);
  });
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const bringToFront = (canvas, kf, xpositions, dispatch) => {
  canvas.getActiveObjects().forEach((element) => {
    const sourceIndex = canvas.getObjects().indexOf(element);
    const destinationIndex = canvas.getObjects().length - 1;
    moveElement(sourceIndex, destinationIndex, kf, xpositions, dispatch);
    canvas.bringObjectToFront(element);
  });
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const bringForward = (canvas, kf, xpositions, dispatch) => {
  const element = canvas.getActiveObjects()[0];
  const sourceIndex = canvas.getObjects().indexOf(element);
  if (sourceIndex !== canvas.getObjects().length - 1) {
    const destinationIndex = sourceIndex + 1;
    moveElement(sourceIndex, destinationIndex, kf, xpositions, dispatch);
    canvas.bringObjectForward(element);
  }
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const sendBackward = (canvas, kf, xpositions, dispatch) => {
  const element = canvas.getActiveObjects()[0];
  const sourceIndex = canvas.getObjects().indexOf(element);
  if (sourceIndex !== 0) {
    const destinationIndex = sourceIndex - 1;
    moveElement(sourceIndex, destinationIndex, kf, xpositions, dispatch);
    canvas.sendObjectBackwards(element);
  }
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const findElementWithId = (group, id) => {
  if (group) {
    const objects = group.getObjects();
    for (let i = 0; i < objects.length; i++) {
      const element = objects[i];
      if (element.type === "group") {
        const result = findElementWithId(element, id);
        if (result) {
          return result;
        }
      } else if (element.id === id) {
        return element;
      }
    }
  }

  return null;
};

export function rgbStringToHex(rgbString) {
  // Extract the numeric values from the rgb() string
  if (rgbString === "") {
    rgbString = "rgb(0, 0, 0)";
  }
  const rgbValues = rgbString.match(/\d+/g).map(Number); // Extracts [r, g, b]

  // Convert the RGB values to hexadecimal
  return rgbToHex(...rgbValues);
}

export function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export const hexToRGB = (hex) => {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  return { r: red / 255, g: green / 255, b: blue / 255, a: 1 }; // return an object
};

export const rgbaObjectToHex = (rgba) => {
  let r = Math.round(rgba.r * 255)
    .toString(16)
    .padStart(2, "0");
  let g = Math.round(rgba.g * 255)
    .toString(16)
    .padStart(2, "0");
  let b = Math.round(rgba.b * 255)
    .toString(16)
    .padStart(2, "0");
  let hex = "#" + r + g + b;
  return hex;
};

export const checkIdUniqueness = (canvas) => {
  var objects = canvas.getObjects(),
    ids = [];

  for (var i = 0, len = objects.length; i < len; i++) {
    var object = objects[i];
    if (ids.indexOf(object.id) !== -1) {
      return false;
    }
    ids.push(object.id);
  }
  return true;
};
export const rgbaCol = (color, opacity) =>
  "rgba(" +
  parseInt(color.slice(-6, -4), 16) +
  "," +
  parseInt(color.slice(-4, -2), 16) +
  "," +
  parseInt(color.slice(-2), 16) +
  "," +
  opacity +
  ")";

export var address1 = "https://" + window.location.host.split(":")[0] + ":9000";
export const screenSizes = [1024, 1280, 1920, 2048, 3840, 4096];

export const clieentPublicFolder = () => {
  if (window.location.host === "localhost:10000") {
    return "https://localhost:10000/ReactCasparClient";
  } else {
    return "https://vimlesh1975.github.io/ReactCasparClient";
  }
};

export const getFormattedDatetimeNumber = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
};

export const videoLayers = [1, 2, 3, 10000, 5];

export const templateLayers = {
  imgSequenceLayer1: 10,
  imgSequenceLayer2: 15,
  GenerativeArts: 93,
  Tsparticles1: 94,
  patternLayer: 95,
  solidCaption1: 96,
  animationLayer: 96,
  savePannelPlayer: 105,
  solidCaption2: 115,
  solidCaption3: 120,
  logo: 125,
  locationBand: 130,
  verticalScroll: 135,
  horizontalScroll: 140,
  scroll1_strip: 141,
  horizontalScroll2: 145,
  scroll2_strip: 146,
  clock: 150,
  countUpTimer: 155,
  tennisScore: 156,
  kabaddiScore: 157,
  customClient: 158,
  cricketScore: 159,
  gameTimer: 160,
  gameTimer2: 163,
  LBand: 166,
  twoliner: 165,
  theatrejs: 166,
  gsap: 167,
  data: 170,

  hockeygenerallayer: 500,
  hockeyscoreLayer: 501,
  hockeyclockLayer: 502,

  breakingneslayer: 550,
};
export const theatreLayers = [171, 172, 173, 174, 175];

export const stopAllTheatreLayes = () => {
  // setMypage('');
  theatreLayers.forEach((layerNumber) => {
    endpoint(
      ` call 1-${layerNumber} window.sheet.sequence.play({ direction: 'reverse' }); `
    );
    setTimeout(() => {
      endpoint(`stop 1-${layerNumber}`);
    }, 1000);

    executeScript(
      `window.sheet_${layerNumber}.sequence.play({ direction: 'reverse' });`
    );
    setTimeout(() => {
      executeScript(
        ` document.getElementById('divid_${layerNumber}')?.remove(); `
      );
    }, 1000);
  });
};

export const endpoint = (string) => {
  const data = { string: string };
  axios
    .post(address1 + "/endpoint", data)
    .then((aa) => { })
    .catch((aa) => {
      // console.log("Error", aa);
    });
};

export const htmlAddress = () => {
  if (window.location.origin === "https://vimlesh1975.github.io") {
    return "https://octopus-app-gzws3.ondigitalocean.app/html";
  } else {
    return address1 + "/html";
  }
};

export const openaiAddress = () => {
  if (window.location.origin === "https://vimlesh1975.github.io") {
    return "https://octopus-app-gzws3.ondigitalocean.app/";
  } else {
    return address1;
  }
};

export const socketAddress = () => {
  if (window.location.origin === "https://vimlesh1975.github.io") {
    return "https://octopus-app-gzws3.ondigitalocean.app";
  } else {
    return address1;
  }
};

export const streamingAddress = () => {
  if (window.location.origin === "https://vimlesh1975.github.io") {
    return "https://octopus-app-gzws3.ondigitalocean.app";
  } else {
    return "http://" + window.location.host.split(":")[0] + ":8000";
  }
};
export const sendtohtml = (canvas, layerNumber) => {
  axios
    .post(htmlAddress(), {
      data1: `<div id='divid_${layerNumber}'>${canvas.toSVG()}</div>`,
      clientId: window.clientId,
    })
    .then((aa) => { })
    .catch((aa) => {
      console.log("Error", aa);
    });
};
export const clearHtml = (layerNumber) => {
  // axios.post(htmlAddress(), { data1: '', clientId: window.clientId }).then((aa) => {
  // }).catch((aa) => { console.log('Error', aa) });
  executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);
};

export const executeScript = (str) => {
  if (window.location.origin === "https://vimlesh1975.github.io") {
    axios
      .post("https://octopus-app-gzws3.ondigitalocean.app/executeScript", {
        data1: str,
        clientId: window.clientId,
      })
      .then((aa) => { })
      .catch((aa) => {
        console.log("Error", aa);
      });
  } else {
    axios
      .post(address1 + "/executeScript", {
        data1: str,
        clientId: window.clientId,
      })
      .then((aa) => { })
      .catch((aa) => {
        console.log("Error", aa);
      });
  }
};

export const chatScript = (str, clientId) => {
  if (window.location.origin === "https://vimlesh1975.github.io") {
    axios
      .post("https://octopus-app-gzws3.ondigitalocean.app/chat", {
        data1: str,
        clientId: clientId,
      })
      .then((aa) => { })
      .catch((aa) => {
        console.log("Error", aa);
      });
  } else {
    axios
      .post(address1 + "/chat", {
        data1: str,
        clientId: clientId,
      })
      .then((aa) => { })
      .catch((aa) => {
        console.log("Error", aa);
      });
  }
};

export function tempAlert(msg, duration, style) {
  var el = document.createElement("div");
  el.setAttribute("style", style);
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

export const updateGraphics = (canvas, layerNumber) => {
  // sendtohtml(canvas, layerNumber)
  // canvas.requestRenderAll();

  executeScript(
    `document.getElementById('divid_${layerNumber}')?document.getElementById('divid_${layerNumber}').innerHTML=\`${canvas
      .toSVG()
      .replaceAll("`", "\\`")
      .replaceAll("$", "\\$")}\`:''`
  );

  endpoint(
    `call ${window.chNumber}-${layerNumber} "aa.innerHTML=\`${canvas
      .toSVG()
      .replaceAll('"', '\\"')
      .replaceAll("`", "\\\\`")
      .replaceAll("$", "\\\\$")}\`"`
  );
};

export const stopGraphics1 = (layerNumber) => {
  endpoint(
    ` call ${window.chNumber}-${layerNumber} "window.sheet.sequence.play({ direction: 'reverse' }).then(()=>document.getElementById('divid_${layerNumber}')?.remove());" `
  );
  executeScript(
    `window.sheet_${layerNumber}?.sequence.play({ direction: 'reverse' }).then(()=>document.getElementById('divid_${layerNumber}')?.remove());`
  );
};

export const stopGraphics = (layerNumber) => {
  clearHtml(layerNumber);
  if (window.animationMethod === "mix") {
    endpoint(`mixer ${window.chNumber}-${layerNumber} opacity 0 12`);
  } else {
    endpoint(
      `mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`
    );
  }

  setTimeout(() => {
    endpoint(
      `call ${window.chNumber}-${layerNumber} "document.getElementById('divid_${layerNumber}')\\?.remove()"`
    );
  }, 1000);
  setTimeout(() => {
    endpoint(`mixer ${window.chNumber}-${layerNumber} clear`);
  }, 1500);
};
export const options = {
  currentMode: "",
  currentColor: "#ffffff",
  currentFont: "Arial",
  currentFontSize: 45,
  backgroundColor: "#50037c",
  // currentWidth: 5,
  group: {},
  stroke: "#ffffff",
  strokeWidth: 1,
};
export const shadowOptions = {
  color: "#000000",
  blur: 30,
  offsetX: 0,
  offsetY: 0,
  affectStroke: false,
};
export const changeShadowCurrentColor = (e, canvas) => {
  shadowOptions.color = e.target.value;
  canvas.getActiveObjects().forEach((item) => {
    if (item.shadow) {
      item.shadow.color = e.target.value;
    }
  });
  canvas.requestRenderAll();
};
export const changeStrokeCurrentColor = (e, canvas) => {
  options.stroke = e.target.value;
  // canvas.freeDrawingBrush.color = e.target.value;
  fabric.BaseBrush.color = e.target.value;
  fabric.PencilBrush.color = e.target.value;

  canvas.getActiveObjects().forEach((item) => (item.stroke = e.target.value));
  canvas.requestRenderAll();
};
export const changeCurrentColor = (e, canvas) => {
  options.currentColor = e.target.value;
  canvas.getActiveObjects().forEach((item) => (item.fill = e.target.value));
  canvas.requestRenderAll();
};
export const changeBackGroundColor = (e, canvas) => {
  options.backgroundColor = e.target.value;
  canvas
    .getActiveObjects()
    .forEach((item) => (item.backgroundColor = e.target.value));
  canvas.requestRenderAll();
};

const base64EncodeBlob = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      const binaryString = String.fromCharCode.apply(
        null,
        new Uint8Array(arrayBuffer)
      );
      const base64String = btoa(binaryString);
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};

export const recallPage = (
  layerNumber,
  pageName,
  data,
  canvasList,
  canvas,
  currentscreenSize
) => {
  const index = canvasList.findIndex((val) => val.pageName === pageName);
  if (index !== -1) {
    const data1 = data;
    canvas.loadFromJSON(canvasList[index].pageValue).then(() => {
      data1.forEach((data2) => {
        canvas.getObjects().forEach((element) => {
          element.set({ selectable: false, strokeUniform: false });
          try {
            if (element.id === data2.key) {
              if (data2.type === "text") {
                const originalWidth = element.width;
                element.set({
                  objectCaching: false,
                  text: data2.value.toString(),
                });
                if (element.textLines.length > 1) {
                  do {
                    element.set({ width: element.width + 5 });
                  } while (element.textLines.length > 1);
                  element.set({ scaleX: originalWidth / element.width });
                }
              } else if (data2.type === "image") {
                var i = new Image();
                i.onload = function () {
                  const originalWidth = element.width * element.scaleX;
                  const originalHeight = element.height * element.scaleY;
                  element.set({
                    objectCaching: false,
                    scaleX: originalWidth / i.width,
                    scaleY: originalHeight / i.height,
                  });
                  if (element.type === "image") {
                    element.setSrc(data2.value);
                  } else if (element.type === "rect") {
                    element.set({
                      width: i.width,
                      height: i.height,
                      fill: new fabric.Pattern({
                        source: data2.value,
                        repeat: "no-repeat",
                      }),
                    });
                  }
                };
                i.src = data2.value;
              } else if (data2.type === "shadow") {
                element.set({ shadow: { ...element.shadow, ...data2.value } });
              } else {
                element.set({ [data2.type]: data2.value });
              }
            }
          } catch (error) { }
        });
      });
      canvas.requestRenderAll();
      sendToCasparcg(layerNumber, canvas, currentscreenSize);
    });
  } else {
    tempAlert("Pagename not avalaible", 1000);
  }
};
export const sendToCasparcg = (layerNumber, canvas, currentscreenSize) => {
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

  executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

  endpoint(
    `mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`
  );
  setTimeout(() => {
    endpoint(
      `play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`
    );
  }, 250);
  const scriptforhtml = `
    var aa = document.createElement('div');
    aa.style.position='absolute';
    aa.setAttribute('id','divid_' + '${layerNumber}');
    aa.style.zIndex = ${layerNumber};
    aa.innerHTML=\`${canvas
      .toSVG()
      .replaceAll('"', '\\"')
      .replaceAll("`", "\\`")
      .replaceAll("$", "\\$")}\`;
    document.body.appendChild(aa);
    document.body.style.margin='0';
    document.body.style.padding='0';
    aa.style.zoom=(${currentscreenSize * 100}/${1920})+'%';
    document.body.style.overflow='hidden';
    `;
  executeScript(scriptforhtml);

  const scriptforcaspar = `
    var aa = document.createElement('div');
    aa.style.position='absolute';
    aa.setAttribute('id','divid_' + '${layerNumber}');
    aa.style.zIndex = ${layerNumber};
    aa.innerHTML=\`${canvas
      .toSVG()
      .replaceAll('"', '\\"')
      .replaceAll("`", "\\`")
      .replaceAll("$", "\\\\$")}\`;
    document.body.appendChild(aa);
    document.body.style.margin='0';
    document.body.style.padding='0';
    aa.style.zoom=(${currentscreenSize * 100}/${1920})+'%';
    document.body.style.overflow='hidden';
    `;
  setTimeout(() => {
    endpoint(`call ${window.chNumber}-${layerNumber} "
        ${scriptforcaspar}
        "`);
  }, 300);
  setTimeout(() => {
    endpoint(
      `mixer ${window.chNumber}-${layerNumber} fill 0 0 1 1 10 ${window.animationMethod}`
    );
  }, 800);

  setTimeout(() => {
    updateGraphics(canvas, layerNumber);
  }, 1100);
};

export const updateData = (layerNumber, pageName, data, canvasList, canvas) => {
  const index = canvasList.findIndex((val) => val.pageName === pageName);
  if (index !== -1) {
    const data1 = data;
    canvas.loadFromJSON(canvasList[index].pageValue).then(() => {
      data1.forEach((data2) => {
        canvas.getObjects().forEach((element) => {
          element.set({ selectable: false, strokeUniform: false });
          try {
            if (element.id === data2.key) {
              if (data2.type === "text") {
                const originalWidth = element.width;
                element.set({
                  objectCaching: false,
                  text: data2.value.toString(),
                });
                if (element.textLines.length > 1) {
                  do {
                    element.set({ width: element.width + 5 });
                  } while (element.textLines.length > 1);
                  element.set({ scaleX: originalWidth / element.width });
                }
              } else if (data2.type === "image") {
                var i = new Image();
                i.onload = function () {
                  const originalWidth = element.width * element.scaleX;
                  const originalHeight = element.height * element.scaleY;
                  element.set({
                    objectCaching: false,
                    scaleX: originalWidth / i.width,
                    scaleY: originalHeight / i.height,
                  });
                  if (element.type === "image") {
                    element.setSrc(data2.value);
                  } else if (element.type === "rect") {
                    element.set({
                      width: i.width,
                      height: i.height,
                      fill: new fabric.Pattern({
                        source: data2.value,
                        repeat: "no-repeat",
                      }),
                    });
                  }
                };
                i.src = data2.value;
              } else if (data2.type === "shadow") {
                element.set({ shadow: { ...element.shadow, ...data2.value } });
              } else {
                element.set({ [data2.type]: data2.value });
              }
            }
          } catch (error) { }
        });
      });

      canvas.requestRenderAll();
      setTimeout(() => {
        updateGraphics(canvas, layerNumber);
      }, 300);
    });
  }
};

export const fontLists = [
  "Madhubala",
  "Dhurjati",
  "Aaradhana",
  "Ajantha",
  "GowthamiBold",
  "Suranna",
  "Gidugu",
  "Gurajada",
  "Mallanna",
  "Mandali",
  "NATS",
  "NTR",
  "Peddana",
  "Potti Sreeramulu",
  "Ramabhadra",
  "Ramaraja",
  "Sree Krushnadevaraya",
  "Suranna",
  "Suravaram",
  "Syamala Ramana",
  "TenaliRamakrishna",
  "Timmana",
  "AADevAksharReg",
  "AADevApsBil",
  "AADevApsReg",
  "AADevChitralekhaReg",
  "AADevIndicaReg",
  "AADevIsfocBil",
  "AADevIsfocReg",
  "AADevKrutiReg",
  "AADevShreeLipiBil",
  "AADevShreeLipiReg",
  "AADevSulipiReg",
  "AADevSushaReg",
  "AADevWinKeyBil",
  "AADevWinKeyReg",
  "AclAksharELight",
  "Agency FB",
  "AkrutiDevAbhijit",
  "AkrutiDevAditi",
  "AkrutiDevAditya",
  "AkrutiDevAjit",
  "AkrutiDevAkanksha",
  "AkrutiDevAkankshaMedium",
  "AkrutiDevAkhila",
  "AkrutiDevAkshardhara",
  "AkrutiDevAkshardharaExtBold",
  "AkrutiDevAkshay",
  "AkrutiDevAnand",
  "AkrutiDevAnil",
  "AkrutiDevAnjali",
  "AkrutiDevArjun",
  "AkrutiDevAshvin",
  "AkrutiDevAsmita",
  "AkrutiDevBela",
  "AkrutiDevBhagya",
  "AkrutiDevBharani",
  "AkrutiDevBharati",
  "AkrutiDevBhaskar",
  "AkrutiDevBrahma",
  "AkrutiDevCactus",
  "AkrutiDevChakra",
  "AkrutiDevChakraNormal",
  "AkrutiDevChampa",
  "AkrutiDevChandrika",
  "AkrutiDevCharu",
  "AkrutiDevDeepa",
  "AkrutiDevGanesh",
  "AkrutiDevHansa",
  "AkrutiDevHarsha",
  "AkrutiDevHarshaMedium",
  "AkrutiDevHema",
  "AkrutiDevIndu",
  "AkrutiDevIshwar",
  "AkrutiDevJanhavi",
  "AkrutiDevKailas",
  "AkrutiDevKailasMedium",
  "AkrutiDevKalidas",
  "AkrutiDevKusum",
  "AkrutiDevMadhura",
  "AkrutiDevMalavika",
  "AkrutiDevMallika",
  "AkrutiDevMandara",
  "AkrutiDevMangal",
  "AkrutiDevManisha",
  "AkrutiDevManoj",
  "AkrutiDevManorama",
  "AkrutiDevMaya",
  "AkrutiDevMayur",
  "AkrutiDevMeera",
  "AkrutiDevMegha",
  "AkrutiDevMenaka",
  "AkrutiDevMitra",
  "AkrutiDevMogara",
  "AkrutiDevMogaraMedium",
  "AkrutiDevMouj",
  "AkrutiDevMoujLight",
  "AkrutiDevMukund",
  "AkrutiDevNandi",
  "AkrutiDevNarmada",
  "AkrutiDevNartaki",
  "AkrutiDevNatraj",
  "AkrutiDevNatrajLight",
  "AkrutiDevNavaneet",
  "AkrutiDevNavin",
  "AkrutiDevNewPriya",
  "AkrutiDevNewPriyaExpand",
  "AkrutiDevNewPriyaNormal",
  "AkrutiDevOmkar",
  "AkrutiDevParimala",
  "AkrutiDevPataliputra",
  "AkrutiDevPayal",
  "AkrutiDevPooja",
  "AkrutiDevPrakash",
  "AkrutiDevPratap",
  "AkrutiDevPratik",
  "AkrutiDevPraveen",
  "AkrutiDevPreeti",
  "AkrutiDevPreetiLight",
  "AkrutiDevPrema",
  "AkrutiDevPriya",
  "AkrutiDevPriyaExpanded",
  "AkrutiDevPriyanka",
  "AkrutiDevPushpa",
  "AkrutiDevRahul",
  "AkrutiDevRaksha",
  "AkrutiDevRakshaExtBold",
  "AkrutiDevRekha",
  "AkrutiDevRishi",
  "AkrutiDevRohini",
  "AkrutiDevRoshan",
  "AkrutiDevSavita",
  "AkrutiDevSeetha",
  "AkrutiDevShantala",
  "AkrutiDevShivaji",
  "AkrutiDevShradda",
  "AkrutiDevShridhar",
  "AkrutiDevShridharLight",
  "AkrutiDevShruti",
  "AkrutiDevSindhu",
  "AkrutiDevSita",
  "AkrutiDevSneha",
  "AkrutiDevSulekh",
  "AkrutiDevSunil",
  "AkrutiDevSushma",
  "AkrutiDevSwati",
  "AkrutiDevTilak",
  "AkrutiDevTriveni",
  "AkrutiDevUpendra",
  "AkrutiDevVaishali",
  "AkrutiDevValmiki",
  "AkrutiDevVandana",
  "AkrutiDevVarsha",
  "AkrutiDevVarun",
  "AkrutiDevVedik",
  "AkrutiDevVichitra",
  "AkrutiDevVidya",
  "AkrutiDevVijay",
  "AkrutiDevVinod",
  "AkrutiDevVivek",
  "AkrutiDevXPYogini",
  "AkrutiDevYamuna",
  "AkrutiDevYogini",
  "AkrutiOfficeAditi",
  "AkrutiOfficeAditi01",
  "AkrutiOfficeAjit",
  "AkrutiOfficeAjit01",
  "AkrutiOfficeAkanksha",
  "AkrutiOfficeAkanksha01",
  "AkrutiOfficeAkansha",
  "AkrutiOfficeAkshardhara",
  "AkrutiOfficeAkshardhara01",
  "AkrutiOfficeAkshay",
  "AkrutiOfficeAkshay01",
  "AkrutiOfficeChakra",
  "AkrutiOfficeChakra01",
  "AkrutiOfficeChampa",
  "AkrutiOfficeChampa01",
  "AkrutiOfficeDeepa",
  "AkrutiOfficeDeepa01",
  "AkrutiOfficeHansa",
  "AkrutiOfficeHansa01",
  "AkrutiOfficeHinPriya",
  "AkrutiOfficeHinPriya01",
  "AkrutiOfficeManorama",
  "AkrutiOfficeManorama01",
  "AkrutiOfficeMogara",
  "AkrutiOfficeMogara01",
  "AkrutiOfficeMouj",
  "AkrutiOfficeMouj01",
  "AkrutiOfficePriya",
  "AkrutiOfficePriya01",
  "AkrutiOfficePriyaExpand",
  "AkrutiOfficePriyaExpand01",
  "AkrutiOfficeShruti",
  "AkrutiOfficeShruti01",
  "AkrutiOfficeSulekh",
  "AkrutiOfficeSulekh01",
  "AkrutiOfficeSwati",
  "AkrutiOfficeSwati01",
  "AkrutiOfficeTriveni",
  "AkrutiOfficeTriveni01",
  "AkrutiOfficeVijay",
  "AkrutiOfficeVijay01",
  "AkrutiOfficeYogini",
  "AkrutiOfficeYogini-S",
  "AkrutiOfficeYogini01",
  "AkrutiOfficeYoginiLight",
  "AkrutiOfficeYoginiLight01",
  "Algerian",
  "Aparajita",
  "Arial",
  "Arial Black",
  "Arial Narrow",
  "Arial Rounded MT Bold",
  "Arial Unicode MS",
  "Bahnschrift",
  "Bahnschrift Condensed",
  "Bahnschrift Light",
  "Bahnschrift Light Condensed",
  "Bahnschrift SemiBold",
  "Bahnschrift SemiBold Condensed",
  "Bahnschrift SemiCondensed",
  "Bahnschrift SemiLight",
  "Baskerville Old Face",
  "Bauhaus 93",
  "Bell MT",
  "Berlin Sans FB",
  "Berlin Sans FB Demi",
  "Bernard MT Condensed",
  "Blackadder ITC",
  "Bodoni MT",
  "Bodoni MT Black",
  "Bodoni MT Condensed",
  "Bodoni MT Poster Compressed",
  "Book Antiqua",
  "Bookman Old Style",
  "Bookshelf Symbol 7",
  "Bradley Hand ITC",
  "Britannic Bold",
  "Broadway",
  "Brush Script MT",
  "Calibri",
  "Calibri Light",
  "Californian FB",
  "Calisto MT",
  "Cambria",
  "Cambria Math",
  "Candara",
  "Candara Light",
  "Cascadia Code",
  "Cascadia Code ExtraLight",
  "Cascadia Code Light",
  "Cascadia Code SemiBold",
  "Cascadia Code SemiLight",
  "Cascadia Mono",
  "Cascadia Mono ExtraLight",
  "Cascadia Mono Light",
  "Cascadia Mono SemiBold",
  "Cascadia Mono SemiLight",
  "Castellar",
  "Centaur",
  "Century",
  "Century Gothic",
  "Century Schoolbook",
  "Chiller",
  "Colonna MT",
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Cooper Black",
  "Copperplate Gothic Bold",
  "Copperplate Gothic Light",
  "Corbel",
  "Corbel Light",
  "Courier New",
  "Curlz MT",
  "DVOT-Bhima",
  "DVOT-Surekh",
  "Ebrima",
  "Edwardian Script ITC",
  "Ek Mukta",
  "Elephant",
  "Engravers MT",
  "Eras Bold ITC",
  "Eras Demi ITC",
  "Eras Light ITC",
  "Eras Medium ITC",
  "Felix Titling",
  "Footlight MT Light",
  "Forte",
  "Franklin Gothic Book",
  "Franklin Gothic Demi",
  "Franklin Gothic Demi Cond",
  "Franklin Gothic Heavy",
  "Franklin Gothic Medium",
  "Franklin Gothic Medium Cond",
  "Freestyle Script",
  "French Script MT",
  "Gabriola",
  "Gadugi",
  "Garamond",
  "Georgia",
  "Gigi",
  "Gill Sans MT",
  "Gill Sans MT Condensed",
  "Gill Sans MT Ext Condensed",
  "Gill Sans Ultra Bold",
  "Gill Sans Ultra Bold Condensed",
  "Gloucester MT Extra Condensed",
  "Goudy Old Style",
  "Goudy Stout",
  "Haettenschweiler",
  "Harlow Solid Italic",
  "Harrington",
  "High Tower Text",
  "HoloLens MDL2 Assets",
  "Impact",
  "Imprint MT Shadow",
  "Informal Roman",
  "Ink Free",
  "ISCIIDev",
  "Javanese Text",
  "Jokerman",
  "Juice ITC",
  "Kokila",
  "Kristen ITC",
  "Kunstler Script",
  "Leelawadee UI",
  "Leelawadee UI Semilight",
  "Lucida Bright",
  "Lucida Calligraphy",
  "Lucida Console",
  "Lucida Fax",
  "Lucida Handwriting",
  "Lucida Sans",
  "Lucida Sans Typewriter",
  "Lucida Sans Unicode",
  "Magneto",
  "Maiandra GD",
  "Malgun Gothic",
  "Malgun Gothic Semilight",
  "Mangal",
  "Marat1",
  "Marat2",
  "Marlett",
  "Matura MT Script Capitals",
  "Microsoft Himalaya",
  "Microsoft JhengHei",
  "Microsoft JhengHei Light",
  "Microsoft JhengHei UI",
  "Microsoft JhengHei UI Light",
  "Microsoft New Tai Lue",
  "Microsoft PhagsPa",
  "Microsoft Sans Serif",
  "Microsoft Tai Le",
  "Microsoft YaHei",
  "Microsoft YaHei Light",
  "Microsoft YaHei UI",
  "Microsoft YaHei UI Light",
  "Microsoft Yi Baiti",
  "MingLiU-ExtB",
  "MingLiU_HKSCS-ExtB",
  "Mistral",
  "Modern No. 20",
  "Mongolian Baiti",
  "Monotype Corsiva",
  "MS Gothic",
  "MS Mincho",
  "MS Outlook",
  "MS PGothic",
  "MS Reference Sans Serif",
  "MS Reference Specialty",
  "MS UI Gothic",
  "MT Extra",
  "MV Boli",
  "Myanmar Text",
  "Niagara Engraved",
  "Niagara Solid",
  "Nirmala UI",
  "Nirmala UI Semilight",
  "NSimSun",
  "OCR A Extended",
  "Old English Text MT",
  "Onyx",
  "Palace Script MT",
  "Palatino Linotype",
  "Papyrus",
  "Parchment",
  "Perpetua",
  "Perpetua Titling MT",
  "Playbill",
  "PMingLiU-ExtB",
  "Poor Richard",
  "Pristina",
  "Rage Italic",
  "Ravie",
  "Rockwell",
  "Rockwell Condensed",
  "Rockwell Extra Bold",
  "Sakal Marathi",
  "SakalBharati",
  "Sanskrit Text",
  "Script MT Bold",
  "Segoe Fluent Icons",
  "Segoe MDL2 Assets",
  "Segoe Print",
  "Segoe Script",
  "Segoe UI",
  "Segoe UI Black",
  "Segoe UI Emoji",
  "Segoe UI Historic",
  "Segoe UI Light",
  "Segoe UI Semibold",
  "Segoe UI Semilight",
  "Segoe UI Symbol",
  "Segoe UI Variable Display",
  "Segoe UI Variable Display",
  "Segoe UI Variable Display",
  "Segoe UI Variable Display",
  "Segoe UI Variable Small",
  "Segoe UI Variable Small",
  "Segoe UI Variable Small",
  "Segoe UI Variable Small Light",
  "Segoe UI Variable Text",
  "Segoe UI Variable Text",
  "Segoe UI Variable Text",
  "Segoe UI Variable Text Light",
  "Showcard Gothic",
  "SimSun",
  "SimSun-ExtB",
  "Sitka Banner",
  "Sitka Banner Semibold",
  "Sitka Display",
  "Sitka Display Semibold",
  "Sitka Heading",
  "Sitka Heading Semibold",
  "Sitka Small",
  "Sitka Small Semibold",
  "Sitka Subheading",
  "Sitka Subheading Semibold",
  "Sitka Text",
  "Sitka Text Semibold",
  "Snap ITC",
  "Stencil",
  "Sylfaen",
  "Symbol",
  "Tahoma",
  "Tempus Sans ITC",
  "Times New Roman",
  "Trebuchet MS",
  "Tw Cen MT",
  "Tw Cen MT Condensed",
  "Tw Cen MT Condensed Extra Bold",
  "Utsaah",
  "Verdana",
  "Viner Hand ITC",
  "Vivaldi",
  "Vladimir Script",
  "Webdings",
  "Wide Latin",
  "Wingdings",
  "Wingdings 2",
  "Wingdings 3",
  "Yu Gothic",
  "Yu Gothic Light",
  "Yu Gothic Medium",
  "Yu Gothic UI",
  "Yu Gothic UI Light",
  "Yu Gothic UI Semibold",
  "Yu Gothic UI Semilight",
];
export const chNumbers = [1, 2, 3, 4];
export const inAnimationMethods = [
  ...animation.map((val) => val.name),
  "lefttoright",
  "mix",
];

export const animationMethods = ["easenone", "mix"];
export const languages = [
  "en-US",
  "hi-IN",
  "te-IN",
  "ta-IN",
  "mr-IN",
  "gu-IN",
  "kn-IN",
  "ml-IN",
  "pa-Guru-IN",
  "ur-IN",
  "ar-SA",
  "bn-BD",
  "bn-IN",
  "cs-CZ",
  "da-DK",
  "de-AT",
  "de-CH",
  "de-DE",
  "el-GR",
  "en-AU",
  "en-CA",
  "en-GB",
  "en-IE",
  "en-IN",
  "en-NZ",
  "en-US",
  "en-ZA",
  "es-AR",
  "es-CL",
  "es-CO",
  "es-ES",
  "es-MX",
  "es-US",
  "fi-FI",
  "fr-BE",
  "fr-CA",
  "fr-CH",
  "fr-FR",
  "he-IL",
  "hi-IN",
  "hu-HU",
  "id-ID",
  "it-CH",
  "it-IT",
  "jp-JP",
  "ko-KR",
  "nl-BE",
  "nl-NL",
  "no-NO",
  "pl-PL",
  "pt-BR",
  "pt-PT",
  "ro-RO",
  "ru-RU",
  "sk-SK",
  "sv-SE",
  "ta-IN",
  "ta-LK",
  "th-TH",
  "tr-TR",
  "ur_PK",
  "zh-CN",
  "zh-HK",
  "zh-TW",
  "bh-IN",
];
export const easeTypes = [
  "none",
  "power1.in",
  "power1.out",
  "power1.inOut",
  "power2.in",
  "power2.out",
  "power2.inOut",
  "power3.in",
  "power3.out",
  "power3.inOut",
  "power4.in",
  "power4.out",
  "power4.inOut",
  "linear",
  "back.in",
  "back.out",
  "back.inOut",
  "bounce.in",
  "bounce.out",
  "bounce.inOut",
  "elastic.in",
  "elastic.out",
  "elastic.inOut",
  "rough",
  "slow",
  "stepped",
  "circ.in",
  "circ.out",
  "circ.inOut",
  "expo.in",
  "expo.out",
  "expo.inOut",
  "sine.in",
  "sine.out",
  "sine.inOut",
];
export const colors = [
  "#1b648f",
  "#a14e89",
  "#af6b1c",
  "#797362",
  "#c8d23b",
  "#7d45b6",
  "#c8459e",
  "#45c1a1",
  "#c45d4b",
  "#4f7390",
  "#b95d9d",
  "#2c907a",
  "#946757",
  "#8d3a4a",
  "#44a764",
  "#9c6da1",
  "#4e6a2f",
  "#8c438f",
  "#a25e37",
  "#536b8f",
  "#a85357",
  "#5b7e5f",
  "#c97d91",
  "#5c5d5d",
  "#c2623b",
  "#5e7c8d",
  "#b94c74",
  "#9d6e43",
  "#b84e38",
  "#7b8d4b",
  "#c85f4c",
  "#9a6f8d",
  "#46685d",
  "#c3478f",
  "#7a5d6f",
  "#c85e9a",
  "#7a985d",
  "#b64d38",
  "#567c8e",
  "#b64c7a",
  "#5b7d5f",
  "#c9496f",
  "#5e748f",
  "#c8643b",
  "#637d5d",
  "#b34e9d",
  "#5e6a8d",
  "#c65d7a",
  "#9d6f43",
  "#b34d38",
];

export const startVerticalScroll = (
  layerNumber,
  canvas,
  selectAll,
  currentscreenSize,
  verticalSpeed
) => {
  executeScript(`if(window.intervalVerticalScroll){clearInterval(intervalVerticalScroll)};
      document.getElementById('divid_${layerNumber}')?.remove();
      `);

  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  selectAll(canvas);
  var hh = canvas.getActiveObject()?.getBoundingRect().height + 200;
  endpoint(
    `play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`
  );
  const script = `
                                                                                  window.aaVertical = document.createElement('div');
                                                                                  aaVertical.style.position='absolute';
                                                                                  aaVertical.setAttribute('id','divid_' + '${layerNumber}');
                                                                                  aaVertical.style.zIndex = ${layerNumber};
                                                                                  aaVertical.innerHTML=\`${canvas
      .toSVG()
      .replaceAll(
        '"',
        '\\"'
      )
      .replaceAll(
        "`",
        "\\`"
      )}\`;
                                                                                  document.body.appendChild(aaVertical);
                                                                                  document.getElementById('divid_' + '${layerNumber}').getElementsByTagName('svg')[0].style.height='${hh}';
                                                                                  document.getElementById('divid_' + '${layerNumber}').getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 1920 ${hh}');
                                                                                  aaVertical.style.top='100%';
                                                                                  aaVertical.style.zoom=(${currentscreenSize *
    100
    }/1920)+'%';
                                                                                  document.body.style.overflow='hidden';
                                                                                  window.verticalSpeed=${verticalSpeed};
      window.intervalVerticalScroll= setInterval(()=>{
                                                                                      aaVertical.style.top = (aaVertical.getBoundingClientRect().top - verticalSpeed) + 'px';
      }, 1);
                                                                                  `;

  endpoint(`call ${window.chNumber}-${layerNumber} " ${script} "`);

  executeScript(script); //for html
};

export const removeBgApi = async (canvas) => {
  if (
    canvas.getActiveObjects()[0] &&
    canvas.getActiveObjects()[0]?.type === "image"
  ) {
    try {
      const response = await axios.post(
        "https://octopus-app-gzws3.ondigitalocean.app/api/remove-bg",
        {
          base64Image: canvas.getActiveObjects()[0]?.src,
        }
      );
      canvas.getActiveObjects()[0]?.setSrc(response.data.imageData);
      canvas.requestRenderAll();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  }
};
