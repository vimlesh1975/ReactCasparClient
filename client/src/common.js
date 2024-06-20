import axios from 'axios';
import { animation } from './animation.js';
import { fabric } from 'fabric';

export const buildDate = '130624_1';
export const loopDirection = ['normal', 'reverse', 'alternate', 'AR'];

export const defaultImageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wD/AP+"
export const generateUniqueId = (object) => {
  return object.type + '_' + Math.random().toString(36).substr(2, 9);
}

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
      endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
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
        .toSVG(
          [
            "id",
            "class",
            "selectable",
          ]
        )
        .replaceAll(
          '"',
          '\\"'
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
  endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);

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
      .toSVG(
        [
          "id",
          "class",
          "selectable",
        ]
      )
      .replaceAll(
        '"',
        '\\"'
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
  }, 100);
  setTimeout(() => {
    updateGraphics(canvas, layerNumber);
  }, 1200);
};

export const playtoGsapCaspar = (canvas, layerNumber, currentscreenSize, duration = 1, ease = 'back.inOut', stagger = 0.03) => {
  const content = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));

  const contentforHtml = content.replaceAll('"', '\\"').replaceAll('\\n', '\\\\n');
  const contentforcasparcg = content.replaceAll('"', '\\"').replaceAll('\\n', ' \\\n');

  endpoint(`play ${window.chNumber}-${layerNumber} [html] "https://localhost:10000/ReactCasparClient/CanvasPlayer"`);
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
  canvas.loadFromJSON(${contentforcasparcg},()=>{
      window.sortedElements = Array.from(canvas.getObjects()).sort(function (a, b) { return a.top - b.top; });
      tl.pause();
      tl.from(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas.requestRenderAll(); } });
          setTimeout(() => {
              document.body.style.opacity = 1;
              tl.play();
          }, 100);
  });
  `
  setTimeout(() => {
    endpoint(`call ${window.chNumber}-${layerNumber} "${script}"`)
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

  canvas_${layerNumber}.loadFromJSON(content,()=>{
      const sortedElements = Array.from(canvas_${layerNumber}.getObjects()).sort(function (a, b) { return a.top - b.top; });
      tl.from(sortedElements, { duration: ${duration}, left:-2100, ease: '${ease}', stagger:${stagger}, onUpdate: () => { canvas_${layerNumber}.requestRenderAll(); } });
      setTimeout(() => {
          document.body.style.opacity = 1;
          tl.play();
      }, 100);
  })
  `
  executeScript(scriptforHtml)
}

export const stopGsapLayer = (layerNumber, duration = 1, ease = 'back.inOut', stagger = 0.03) => {
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
  "`)

}


export const importSvgCode = (ss, canvas) => {
  if (ss) {
    fabric.loadSVGFromString(ss, function (objects) {
      objects?.forEach(element => {
        canvas.add(element);
        element.set({ objectCaching: false, shadow: element.shadow ? element.shadow : shadowOptions, id: element.type + '_' + fabric.Object.__uid, class: 'class_' + fabric.Object.__uid, });
        if (element.type === 'text') {
          // element.set({ left: (element.left - ((element.width) * element.scaleX / 2)), top: (element.top + ((element.height) * element.scaleY / 4)) })
          element.set({ type: 'textbox' })
          var textobj = element.toObject();
          var clonedtextobj = JSON.parse(JSON.stringify(textobj));
          var aa = new fabric.Textbox(element.text, clonedtextobj);
          aa.set({ id: element.id, class: element.class, objectCaching: false, shadow: element.shadow ? element.shadow : shadowOptions, width: 1000 });
          canvas.remove(element)
          canvas.add(aa);
        }
      });
    });
    canvas.requestRenderAll();
  }
}

export const getGdd = (canvas, designerSoftware) => {
  const allObjects = canvas.getObjects().reduce((acc, object) => {
    if (object.id.startsWith('ccg')) {
      if (object.type === "textbox" || object.type === "image") {
        let gddType = "single-line";
        let default1 = "default";

        if (object.type === "textbox") {
          if (object.textLines.length > 1) {
            gddType = "multi-line";
          }
          else {
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
          pattern: ""
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
`
};

export const setclipPathWhileImporting = (canvas) => {
  var objects = canvas.getObjects();
  objects.forEach((object) => {
    object.set({
      id: object.id ? object.id : "id_" + fabric.Object.__uid,
      class: object.class ? object.class : "class_" + fabric.Object.__uid,
      shadow: object.shadow ? object.shadow : shadowOptions,
      objectCaching: false,
    });
    if (object.clipPath) {
      const clipPathObject = objects.find((element) => element.id === object.clipPath.id);
      clipPathObject.set({ absolutePositioned: true });
      object.set({ clipPath: clipPathObject });
    }
  });
  canvas.requestRenderAll();
}

export const updateText = (canvas, layerNumber) => {
  canvas.getObjects().forEach((element, i) => {
    if (element.type === 'textbox') {
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
      if (key === '1') {
        modifiedObject[newi * 10 + 'x'] = myObject[key];
      } else if (key === '2') {
        modifiedObject[newi * 10 + 'y'] = myObject[key];
      } else if (key === '3') {
        modifiedObject[newi * 10 + 1 + 'x'] = myObject[key];
      } else if (key === '4') {
        modifiedObject[newi * 10 + 1 + 'y'] = myObject[key];
      } else if (key === '5') {
        modifiedObject[newi * 10 + 2 + 'x'] = myObject[key];
      } else if (key === '6') {
        modifiedObject[newi * 10 + 2 + 'y'] = myObject[key];
      } else {
        modifiedObject[key] = myObject[key];
      }
    }

    aa['Point' + newi] = modifiedObject;
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
  dispatch({ type: 'CHANGE_CANVAS', payload: canvas });
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
  dispatch({ type: 'CHANGE_CANVAS', payload: canvas });
};
export const visibleInVisible = (canvas, i, dispatch) => {
  canvas.getObjects().forEach((element, ii) => {
    if (i === ii) {
      element.visible = !element.visible;
    }
  });
  canvas.requestRenderAll();
  dispatch({ type: 'CHANGE_CANVAS', payload: canvas });
};

export const saveFile = async (options, data, fileHandle = null) => {
  if (window.showSaveFilePicker) {
    try {
      const handle = fileHandle || (await window.showSaveFilePicker(options));
      const writable = await handle.createWritable();
      await writable.write(data);
      await writable.close();
      console.log('File saved successfully!', handle.name);
      return handle; // Return the FileHandle object
    } catch (error) {
      console.error('Error saving the file:', error);
    }
  } else {
    const element = document.createElement('a');
    element.href = URL.createObjectURL(data);

    var retVal = prompt(
      'Enter  file name to save : ',
      generalFileName() + '_FileName'
    );
    if (retVal !== null) {
      element.download = retVal + (options.fileExtension ?? '.txt');
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  }
};
export const generalFileName = () => {
  return new Date().toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};

export const listglobalCompositeOperation = [
  'source-over',
  'source-atop',
  'source-in',
  'source-out',
  'destination-over',
  'destination-atop',
  'destination-in',
  'destination-out',
  'lighter',
  'copy',
  'xor',
  'darker',
  'multiply',
  'screen',
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
  dispatch({ type: 'CHANGE_KF', payload: updatedkf });

  const updatedxpositions = [...xpositions];
  updatedxpositions.splice(
    destinationIndex,
    0,
    updatedxpositions.splice(sourceIndex, 1)[0]
  );
  dispatch({ type: 'CHANGE_XPOSITIONS', payload: updatedxpositions });
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
  dispatch({ type: 'CHANGE_KF', payload: updatedkf });
  dispatch({ type: 'CHANGE_XPOSITIONS', payload: updatedxpositions });
  window.editor.canvas?.discardActiveObject();
  window.editor.canvas?.requestRenderAll();
};
window.deleteItemfromtimeline = deleteItemfromtimeline;

export const sendToBack = (canvas, kf, xpositions, dispatch) => {
  canvas.getActiveObjects().forEach((element) => {
    const sourceIndex = canvas.getObjects().indexOf(element);
    const destinationIndex = 0;
    moveElement(sourceIndex, destinationIndex, kf, xpositions, dispatch);
    canvas.sendToBack(element);
  });
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const bringToFront = (canvas, kf, xpositions, dispatch) => {
  canvas.getActiveObjects().forEach((element) => {
    const sourceIndex = canvas.getObjects().indexOf(element);
    const destinationIndex = canvas.getObjects().length - 1;
    moveElement(sourceIndex, destinationIndex, kf, xpositions, dispatch);
    canvas.bringToFront(element);
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
    canvas.bringForward(element);
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
    canvas.sendBackwards(element);
  }
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const findElementWithId = (group, id) => {
  if (group) {
    const objects = group.getObjects();
    for (let i = 0; i < objects.length; i++) {
      const element = objects[i];
      if (element.type === 'group') {
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
export const hexToRGB = (hex) => {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  return { r: red / 255, g: green / 255, b: blue / 255, a: 1 }; // return an object
};

export const rgbaObjectToHex = (rgba) => {
  let r = Math.round(rgba.r * 255)
    .toString(16)
    .padStart(2, '0');
  let g = Math.round(rgba.g * 255)
    .toString(16)
    .padStart(2, '0');
  let b = Math.round(rgba.b * 255)
    .toString(16)
    .padStart(2, '0');
  let hex = '#' + r + g + b;
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
  'rgba(' +
  parseInt(color.slice(-6, -4), 16) +
  ',' +
  parseInt(color.slice(-4, -2), 16) +
  ',' +
  parseInt(color.slice(-2), 16) +
  ',' +
  opacity +
  ')';

export var address1 = 'https://' + window.location.host.split(':')[0] + ':9000';
export const screenSizes = [1024, 1280, 1920, 2048, 3840, 4096];

export const getFormattedDatetimeNumber = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
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
    .post(address1 + '/endpoint', data)
    .then((aa) => { })
    .catch((aa) => {
      console.log('Error', aa);
    });
};

export const htmlAddress = () => {
  if (window.location.origin === 'https://vimlesh1975.github.io') {
    return 'https://octopus-app-gzws3.ondigitalocean.app/html';
  } else {
    return address1 + '/html';
  }
};

export const openaiAddress = () => {
  if (window.location.origin === 'https://vimlesh1975.github.io') {
    return 'https://octopus-app-gzws3.ondigitalocean.app/';
  } else {
    return address1;
  }
};

export const socketAddress = () => {
  if (window.location.origin === 'https://vimlesh1975.github.io') {
    return 'https://octopus-app-gzws3.ondigitalocean.app';
  } else {
    return address1;
  }
};

export const streamingAddress = () => {
  if (window.location.origin === 'https://vimlesh1975.github.io') {
    return 'https://octopus-app-gzws3.ondigitalocean.app';
  } else {
    return 'http://' + window.location.host.split(':')[0] + ':8000';
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
      console.log('Error', aa);
    });
};
export const clearHtml = (layerNumber) => {
  // axios.post(htmlAddress(), { data1: '', clientId: window.clientId }).then((aa) => {
  // }).catch((aa) => { console.log('Error', aa) });
  executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);
};

export const executeScript = (str) => {
  if (window.location.origin === 'https://vimlesh1975.github.io') {
    axios
      .post('https://octopus-app-gzws3.ondigitalocean.app/executeScript', {
        data1: str,
        clientId: window.clientId,
      })
      .then((aa) => { })
      .catch((aa) => {
        console.log('Error', aa);
      });
  } else {
    axios
      .post(address1 + '/executeScript', {
        data1: str,
        clientId: window.clientId,
      })
      .then((aa) => { })
      .catch((aa) => {
        console.log('Error', aa);
      });
  }
};

export const chatScript = (str, clientId) => {
  if (window.location.origin === 'https://vimlesh1975.github.io') {
    axios
      .post('https://octopus-app-gzws3.ondigitalocean.app/chat', {
        data1: str,
        clientId: clientId,
      })
      .then((aa) => { })
      .catch((aa) => {
        console.log('Error', aa);
      });
  } else {
    axios
      .post(address1 + '/chat', {
        data1: str,
        clientId: clientId,
      })
      .then((aa) => { })
      .catch((aa) => {
        console.log('Error', aa);
      });
  }
};



export function tempAlert(msg, duration, style) {
  var el = document.createElement('div');
  el.setAttribute('style', style);
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
    `document.getElementById('divid_${layerNumber}')?document.getElementById('divid_${layerNumber}').innerHTML=\`${canvas.toSVG()}\`:''`
  );

  endpoint(`call ${window.chNumber}-${layerNumber} "
    aa.innerHTML='${canvas.toSVG().replaceAll('"', '\\"')}';
        "`);
};

export const stopGraphics1 = (layerNumber) => {
  endpoint(
    ` call ${window.chNumber}-${layerNumber} "window.sheet.sequence.play({ direction: 'reverse' }).then(()=>document.getElementById('divid_${layerNumber}')?.remove());" `
  );
  executeScript(
    `window.sheet_${layerNumber}.sequence.play({ direction: 'reverse' }).then(()=>document.getElementById('divid_${layerNumber}')?.remove());`
  );
};

export const stopGraphics = (layerNumber) => {
  clearHtml(layerNumber);
  if (window.animationMethod === 'mix') {
    endpoint(
      `mixer ${window.chNumber}-${layerNumber} opacity 0 12`
    );
  }
  else {
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
  currentMode: '',
  currentColor: '#ffffff',
  currentFont: 'Arial',
  currentFontSize: 45,
  backgroundColor: '#50037c',
  // currentWidth: 5,
  group: {},
  stroke: '#ffffff',
  strokeWidth: 1,
};
export const shadowOptions = {
  color: '#000000',
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
  canvas.freeDrawingBrush.color = e.target.value;
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

export const base64EncodeBlob = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = btoa(reader.result);
      resolve(base64data);
    };
    reader.onerror = reject;
    reader.readAsBinaryString(blob);
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
    canvas.loadFromJSON(canvasList[index].pageValue, () => {
      data1.forEach((data2) => {
        canvas.getObjects().forEach((element) => {
          element.set({ selectable: false, strokeUniform: false });
          try {
            if (element.id === data2.key) {
              if (data2.type === 'text') {
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
              } else if (data2.type === 'image') {
                var i = new Image();
                i.onload = function () {
                  const originalWidth = element.width * element.scaleX;
                  const originalHeight = element.height * element.scaleY;
                  element.set({
                    objectCaching: false,
                    scaleX: originalWidth / i.width,
                    scaleY: originalHeight / i.height,
                  });
                  if (element.type === 'image') {
                    element.setSrc(data2.value);
                  } else if (element.type === 'rect') {
                    element.set({
                      width: i.width,
                      height: i.height,
                      fill: new fabric.Pattern({
                        source: data2.value,
                        repeat: 'no-repeat',
                      }),
                    });
                  }
                };
                i.src = data2.value;
              } else if (data2.type === 'shadow') {
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
    tempAlert('Pagename not avalaible', 1000);
  }
};
export const sendToCasparcg = (layerNumber, canvas, currentscreenSize) => {
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

  executeScript(`document.getElementById('divid_${layerNumber}')?.remove()`);

  endpoint(
    `mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 6 ${window.animationMethod}`
  );
  setTimeout(() => {
    endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
  }, 250);
  const script = `
    var aa = document.createElement('div');
    aa.style.position='absolute';
    aa.setAttribute('id','divid_' + '${layerNumber}');
    aa.style.zIndex = ${layerNumber};
    aa.innerHTML=\`${canvas.toSVG().replaceAll('"', '\\"')}\`;
    document.body.appendChild(aa);
    document.body.style.margin='0';
    document.body.style.padding='0';
    aa.style.zoom=(${currentscreenSize * 100}/${1920})+'%';
    document.body.style.overflow='hidden';
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
};

export const updateData = (layerNumber, pageName, data, canvasList, canvas) => {
  const index = canvasList.findIndex((val) => val.pageName === pageName);
  if (index !== -1) {
    const data1 = data;
    canvas.loadFromJSON(canvasList[index].pageValue, () => {
      data1.forEach((data2) => {
        canvas.getObjects().forEach((element) => {
          element.set({ selectable: false, strokeUniform: false });
          try {
            if (element.id === data2.key) {
              if (data2.type === 'text') {
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
              } else if (data2.type === 'image') {
                var i = new Image();
                i.onload = function () {
                  const originalWidth = element.width * element.scaleX;
                  const originalHeight = element.height * element.scaleY;
                  element.set({
                    objectCaching: false,
                    scaleX: originalWidth / i.width,
                    scaleY: originalHeight / i.height,
                  });
                  if (element.type === 'image') {
                    element.setSrc(data2.value);
                  } else if (element.type === 'rect') {
                    element.set({
                      width: i.width,
                      height: i.height,
                      fill: new fabric.Pattern({
                        source: data2.value,
                        repeat: 'no-repeat',
                      }),
                    });
                  }
                };
                i.src = data2.value;
              } else if (data2.type === 'shadow') {
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
  'Madhubala',
  'Dhurjati',
  'Aaradhana',
  'Ajantha',
  'GowthamiBold',
  'Suranna',
  'Gidugu',
  'Gurajada',
  'Mallanna',
  'Mandali',
  'NATS',
  'NTR',
  'Peddana',
  'Potti Sreeramulu',
  'Ramabhadra',
  'Ramaraja',
  'Sree Krushnadevaraya',
  'Suranna',
  'Suravaram',
  'Syamala Ramana',
  'TenaliRamakrishna',
  'Timmana',
  'AADevAksharReg',
  'AADevApsBil',
  'AADevApsReg',
  'AADevChitralekhaReg',
  'AADevIndicaReg',
  'AADevIsfocBil',
  'AADevIsfocReg',
  'AADevKrutiReg',
  'AADevShreeLipiBil',
  'AADevShreeLipiReg',
  'AADevSulipiReg',
  'AADevSushaReg',
  'AADevWinKeyBil',
  'AADevWinKeyReg',
  'AclAksharELight',
  'Agency FB',
  'AkrutiDevAbhijit',
  'AkrutiDevAditi',
  'AkrutiDevAditya',
  'AkrutiDevAjit',
  'AkrutiDevAkanksha',
  'AkrutiDevAkankshaMedium',
  'AkrutiDevAkhila',
  'AkrutiDevAkshardhara',
  'AkrutiDevAkshardharaExtBold',
  'AkrutiDevAkshay',
  'AkrutiDevAnand',
  'AkrutiDevAnil',
  'AkrutiDevAnjali',
  'AkrutiDevArjun',
  'AkrutiDevAshvin',
  'AkrutiDevAsmita',
  'AkrutiDevBela',
  'AkrutiDevBhagya',
  'AkrutiDevBharani',
  'AkrutiDevBharati',
  'AkrutiDevBhaskar',
  'AkrutiDevBrahma',
  'AkrutiDevCactus',
  'AkrutiDevChakra',
  'AkrutiDevChakraNormal',
  'AkrutiDevChampa',
  'AkrutiDevChandrika',
  'AkrutiDevCharu',
  'AkrutiDevDeepa',
  'AkrutiDevGanesh',
  'AkrutiDevHansa',
  'AkrutiDevHarsha',
  'AkrutiDevHarshaMedium',
  'AkrutiDevHema',
  'AkrutiDevIndu',
  'AkrutiDevIshwar',
  'AkrutiDevJanhavi',
  'AkrutiDevKailas',
  'AkrutiDevKailasMedium',
  'AkrutiDevKalidas',
  'AkrutiDevKusum',
  'AkrutiDevMadhura',
  'AkrutiDevMalavika',
  'AkrutiDevMallika',
  'AkrutiDevMandara',
  'AkrutiDevMangal',
  'AkrutiDevManisha',
  'AkrutiDevManoj',
  'AkrutiDevManorama',
  'AkrutiDevMaya',
  'AkrutiDevMayur',
  'AkrutiDevMeera',
  'AkrutiDevMegha',
  'AkrutiDevMenaka',
  'AkrutiDevMitra',
  'AkrutiDevMogara',
  'AkrutiDevMogaraMedium',
  'AkrutiDevMouj',
  'AkrutiDevMoujLight',
  'AkrutiDevMukund',
  'AkrutiDevNandi',
  'AkrutiDevNarmada',
  'AkrutiDevNartaki',
  'AkrutiDevNatraj',
  'AkrutiDevNatrajLight',
  'AkrutiDevNavaneet',
  'AkrutiDevNavin',
  'AkrutiDevNewPriya',
  'AkrutiDevNewPriyaExpand',
  'AkrutiDevNewPriyaNormal',
  'AkrutiDevOmkar',
  'AkrutiDevParimala',
  'AkrutiDevPataliputra',
  'AkrutiDevPayal',
  'AkrutiDevPooja',
  'AkrutiDevPrakash',
  'AkrutiDevPratap',
  'AkrutiDevPratik',
  'AkrutiDevPraveen',
  'AkrutiDevPreeti',
  'AkrutiDevPreetiLight',
  'AkrutiDevPrema',
  'AkrutiDevPriya',
  'AkrutiDevPriyaExpanded',
  'AkrutiDevPriyanka',
  'AkrutiDevPushpa',
  'AkrutiDevRahul',
  'AkrutiDevRaksha',
  'AkrutiDevRakshaExtBold',
  'AkrutiDevRekha',
  'AkrutiDevRishi',
  'AkrutiDevRohini',
  'AkrutiDevRoshan',
  'AkrutiDevSavita',
  'AkrutiDevSeetha',
  'AkrutiDevShantala',
  'AkrutiDevShivaji',
  'AkrutiDevShradda',
  'AkrutiDevShridhar',
  'AkrutiDevShridharLight',
  'AkrutiDevShruti',
  'AkrutiDevSindhu',
  'AkrutiDevSita',
  'AkrutiDevSneha',
  'AkrutiDevSulekh',
  'AkrutiDevSunil',
  'AkrutiDevSushma',
  'AkrutiDevSwati',
  'AkrutiDevTilak',
  'AkrutiDevTriveni',
  'AkrutiDevUpendra',
  'AkrutiDevVaishali',
  'AkrutiDevValmiki',
  'AkrutiDevVandana',
  'AkrutiDevVarsha',
  'AkrutiDevVarun',
  'AkrutiDevVedik',
  'AkrutiDevVichitra',
  'AkrutiDevVidya',
  'AkrutiDevVijay',
  'AkrutiDevVinod',
  'AkrutiDevVivek',
  'AkrutiDevXPYogini',
  'AkrutiDevYamuna',
  'AkrutiDevYogini',
  'AkrutiOfficeAditi',
  'AkrutiOfficeAditi01',
  'AkrutiOfficeAjit',
  'AkrutiOfficeAjit01',
  'AkrutiOfficeAkanksha',
  'AkrutiOfficeAkanksha01',
  'AkrutiOfficeAkansha',
  'AkrutiOfficeAkshardhara',
  'AkrutiOfficeAkshardhara01',
  'AkrutiOfficeAkshay',
  'AkrutiOfficeAkshay01',
  'AkrutiOfficeChakra',
  'AkrutiOfficeChakra01',
  'AkrutiOfficeChampa',
  'AkrutiOfficeChampa01',
  'AkrutiOfficeDeepa',
  'AkrutiOfficeDeepa01',
  'AkrutiOfficeHansa',
  'AkrutiOfficeHansa01',
  'AkrutiOfficeHinPriya',
  'AkrutiOfficeHinPriya01',
  'AkrutiOfficeManorama',
  'AkrutiOfficeManorama01',
  'AkrutiOfficeMogara',
  'AkrutiOfficeMogara01',
  'AkrutiOfficeMouj',
  'AkrutiOfficeMouj01',
  'AkrutiOfficePriya',
  'AkrutiOfficePriya01',
  'AkrutiOfficePriyaExpand',
  'AkrutiOfficePriyaExpand01',
  'AkrutiOfficeShruti',
  'AkrutiOfficeShruti01',
  'AkrutiOfficeSulekh',
  'AkrutiOfficeSulekh01',
  'AkrutiOfficeSwati',
  'AkrutiOfficeSwati01',
  'AkrutiOfficeTriveni',
  'AkrutiOfficeTriveni01',
  'AkrutiOfficeVijay',
  'AkrutiOfficeVijay01',
  'AkrutiOfficeYogini',
  'AkrutiOfficeYogini-S',
  'AkrutiOfficeYogini01',
  'AkrutiOfficeYoginiLight',
  'AkrutiOfficeYoginiLight01',
  'Algerian',
  'Aparajita',
  'Arial',
  'Arial Black',
  'Arial Narrow',
  'Arial Rounded MT Bold',
  'Arial Unicode MS',
  'Bahnschrift',
  'Bahnschrift Condensed',
  'Bahnschrift Light',
  'Bahnschrift Light Condensed',
  'Bahnschrift SemiBold',
  'Bahnschrift SemiBold Condensed',
  'Bahnschrift SemiCondensed',
  'Bahnschrift SemiLight',
  'Baskerville Old Face',
  'Bauhaus 93',
  'Bell MT',
  'Berlin Sans FB',
  'Berlin Sans FB Demi',
  'Bernard MT Condensed',
  'Blackadder ITC',
  'Bodoni MT',
  'Bodoni MT Black',
  'Bodoni MT Condensed',
  'Bodoni MT Poster Compressed',
  'Book Antiqua',
  'Bookman Old Style',
  'Bookshelf Symbol 7',
  'Bradley Hand ITC',
  'Britannic Bold',
  'Broadway',
  'Brush Script MT',
  'Calibri',
  'Calibri Light',
  'Californian FB',
  'Calisto MT',
  'Cambria',
  'Cambria Math',
  'Candara',
  'Candara Light',
  'Cascadia Code',
  'Cascadia Code ExtraLight',
  'Cascadia Code Light',
  'Cascadia Code SemiBold',
  'Cascadia Code SemiLight',
  'Cascadia Mono',
  'Cascadia Mono ExtraLight',
  'Cascadia Mono Light',
  'Cascadia Mono SemiBold',
  'Cascadia Mono SemiLight',
  'Castellar',
  'Centaur',
  'Century',
  'Century Gothic',
  'Century Schoolbook',
  'Chiller',
  'Colonna MT',
  'Comic Sans MS',
  'Consolas',
  'Constantia',
  'Cooper Black',
  'Copperplate Gothic Bold',
  'Copperplate Gothic Light',
  'Corbel',
  'Corbel Light',
  'Courier New',
  'Curlz MT',
  'DVOT-Bhima',
  'DVOT-Surekh',
  'Ebrima',
  'Edwardian Script ITC',
  'Ek Mukta',
  'Elephant',
  'Engravers MT',
  'Eras Bold ITC',
  'Eras Demi ITC',
  'Eras Light ITC',
  'Eras Medium ITC',
  'Felix Titling',
  'Footlight MT Light',
  'Forte',
  'Franklin Gothic Book',
  'Franklin Gothic Demi',
  'Franklin Gothic Demi Cond',
  'Franklin Gothic Heavy',
  'Franklin Gothic Medium',
  'Franklin Gothic Medium Cond',
  'Freestyle Script',
  'French Script MT',
  'Gabriola',
  'Gadugi',
  'Garamond',
  'Georgia',
  'Gigi',
  'Gill Sans MT',
  'Gill Sans MT Condensed',
  'Gill Sans MT Ext Condensed',
  'Gill Sans Ultra Bold',
  'Gill Sans Ultra Bold Condensed',
  'Gloucester MT Extra Condensed',
  'Goudy Old Style',
  'Goudy Stout',
  'Haettenschweiler',
  'Harlow Solid Italic',
  'Harrington',
  'High Tower Text',
  'HoloLens MDL2 Assets',
  'Impact',
  'Imprint MT Shadow',
  'Informal Roman',
  'Ink Free',
  'ISCIIDev',
  'Javanese Text',
  'Jokerman',
  'Juice ITC',
  'Kokila',
  'Kristen ITC',
  'Kunstler Script',
  'Leelawadee UI',
  'Leelawadee UI Semilight',
  'Lucida Bright',
  'Lucida Calligraphy',
  'Lucida Console',
  'Lucida Fax',
  'Lucida Handwriting',
  'Lucida Sans',
  'Lucida Sans Typewriter',
  'Lucida Sans Unicode',
  'Magneto',
  'Maiandra GD',
  'Malgun Gothic',
  'Malgun Gothic Semilight',
  'Mangal',
  'Marat1',
  'Marat2',
  'Marlett',
  'Matura MT Script Capitals',
  'Microsoft Himalaya',
  'Microsoft JhengHei',
  'Microsoft JhengHei Light',
  'Microsoft JhengHei UI',
  'Microsoft JhengHei UI Light',
  'Microsoft New Tai Lue',
  'Microsoft PhagsPa',
  'Microsoft Sans Serif',
  'Microsoft Tai Le',
  'Microsoft YaHei',
  'Microsoft YaHei Light',
  'Microsoft YaHei UI',
  'Microsoft YaHei UI Light',
  'Microsoft Yi Baiti',
  'MingLiU-ExtB',
  'MingLiU_HKSCS-ExtB',
  'Mistral',
  'Modern No. 20',
  'Mongolian Baiti',
  'Monotype Corsiva',
  'MS Gothic',
  'MS Mincho',
  'MS Outlook',
  'MS PGothic',
  'MS Reference Sans Serif',
  'MS Reference Specialty',
  'MS UI Gothic',
  'MT Extra',
  'MV Boli',
  'Myanmar Text',
  'Niagara Engraved',
  'Niagara Solid',
  'Nirmala UI',
  'Nirmala UI Semilight',
  'NSimSun',
  'OCR A Extended',
  'Old English Text MT',
  'Onyx',
  'Palace Script MT',
  'Palatino Linotype',
  'Papyrus',
  'Parchment',
  'Perpetua',
  'Perpetua Titling MT',
  'Playbill',
  'PMingLiU-ExtB',
  'Poor Richard',
  'Pristina',
  'Rage Italic',
  'Ravie',
  'Rockwell',
  'Rockwell Condensed',
  'Rockwell Extra Bold',
  'Sakal Marathi',
  'SakalBharati',
  'Sanskrit Text',
  'Script MT Bold',
  'Segoe Fluent Icons',
  'Segoe MDL2 Assets',
  'Segoe Print',
  'Segoe Script',
  'Segoe UI',
  'Segoe UI Black',
  'Segoe UI Emoji',
  'Segoe UI Historic',
  'Segoe UI Light',
  'Segoe UI Semibold',
  'Segoe UI Semilight',
  'Segoe UI Symbol',
  'Segoe UI Variable Display',
  'Segoe UI Variable Display',
  'Segoe UI Variable Display',
  'Segoe UI Variable Display',
  'Segoe UI Variable Small',
  'Segoe UI Variable Small',
  'Segoe UI Variable Small',
  'Segoe UI Variable Small Light',
  'Segoe UI Variable Text',
  'Segoe UI Variable Text',
  'Segoe UI Variable Text',
  'Segoe UI Variable Text Light',
  'Showcard Gothic',
  'SimSun',
  'SimSun-ExtB',
  'Sitka Banner',
  'Sitka Banner Semibold',
  'Sitka Display',
  'Sitka Display Semibold',
  'Sitka Heading',
  'Sitka Heading Semibold',
  'Sitka Small',
  'Sitka Small Semibold',
  'Sitka Subheading',
  'Sitka Subheading Semibold',
  'Sitka Text',
  'Sitka Text Semibold',
  'Snap ITC',
  'Stencil',
  'Sylfaen',
  'Symbol',
  'Tahoma',
  'Tempus Sans ITC',
  'Times New Roman',
  'Trebuchet MS',
  'Tw Cen MT',
  'Tw Cen MT Condensed',
  'Tw Cen MT Condensed Extra Bold',
  'Utsaah',
  'Verdana',
  'Viner Hand ITC',
  'Vivaldi',
  'Vladimir Script',
  'Webdings',
  'Wide Latin',
  'Wingdings',
  'Wingdings 2',
  'Wingdings 3',
  'Yu Gothic',
  'Yu Gothic Light',
  'Yu Gothic Medium',
  'Yu Gothic UI',
  'Yu Gothic UI Light',
  'Yu Gothic UI Semibold',
  'Yu Gothic UI Semilight',
];
export const chNumbers = [1, 2, 3, 4];
export const inAnimationMethods = [
  ...animation.map((val) => val.name),
  'lefttoright',
  'mix',
];

export const animationMethods = [
  'easenone',
  'mix'
];
export const languages = [
  'en-US',
  'hi-IN',
  'te-IN',
  'ta-IN',
  'mr-IN',
  'gu-IN',
  'kn-IN',
  'ml-IN',
  'pa-Guru-IN',
  'ur-IN',
  'ar-SA',
  'bn-BD',
  'bn-IN',
  'cs-CZ',
  'da-DK',
  'de-AT',
  'de-CH',
  'de-DE',
  'el-GR',
  'en-AU',
  'en-CA',
  'en-GB',
  'en-IE',
  'en-IN',
  'en-NZ',
  'en-US',
  'en-ZA',
  'es-AR',
  'es-CL',
  'es-CO',
  'es-ES',
  'es-MX',
  'es-US',
  'fi-FI',
  'fr-BE',
  'fr-CA',
  'fr-CH',
  'fr-FR',
  'he-IL',
  'hi-IN',
  'hu-HU',
  'id-ID',
  'it-CH',
  'it-IT',
  'jp-JP',
  'ko-KR',
  'nl-BE',
  'nl-NL',
  'no-NO',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ro-RO',
  'ru-RU',
  'sk-SK',
  'sv-SE',
  'ta-IN',
  'ta-LK',
  'th-TH',
  'tr-TR',
  'ur_PK',
  'zh-CN',
  'zh-HK',
  'zh-TW',
  'bh-IN',
];
export const easeTypes = [
  'none',
  'power1.in',
  'power1.out',
  'power1.inOut',
  'power2.in',
  'power2.out',
  'power2.inOut',
  'power3.in',
  'power3.out',
  'power3.inOut',
  'power4.in',
  'power4.out',
  'power4.inOut',
  'linear',
  'back.in',
  'back.out',
  'back.inOut',
  'bounce.in',
  'bounce.out',
  'bounce.inOut',
  'elastic.in',
  'elastic.out',
  'elastic.inOut',
  'rough',
  'slow',
  'stepped',
  'circ.in',
  'circ.out',
  'circ.inOut',
  'expo.in',
  'expo.out',
  'expo.inOut',
  'sine.in',
  'sine.out',
  'sine.inOut',
];
export const colors = [
  '#1b648f',
  '#a14e89',
  '#af6b1c',
  '#797362',
  '#c8d23b',
  '#7d45b6',
  '#c8459e',
  '#45c1a1',
  '#c45d4b',
  '#4f7390',
  '#b95d9d',
  '#2c907a',
  '#946757',
  '#8d3a4a',
  '#44a764',
  '#9c6da1',
  '#4e6a2f',
  '#8c438f',
  '#a25e37',
  '#536b8f',
  '#a85357',
  '#5b7e5f',
  '#c97d91',
  '#5c5d5d',
  '#c2623b',
  '#5e7c8d',
  '#b94c74',
  '#9d6e43',
  '#b84e38',
  '#7b8d4b',
  '#c85f4c',
  '#9a6f8d',
  '#46685d',
  '#c3478f',
  '#7a5d6f',
  '#c85e9a',
  '#7a985d',
  '#b64d38',
  '#567c8e',
  '#b64c7a',
  '#5b7d5f',
  '#c9496f',
  '#5e748f',
  '#c8643b',
  '#637d5d',
  '#b34e9d',
  '#5e6a8d',
  '#c65d7a',
  '#9d6f43',
  '#b34d38',
];

export const startVerticalScroll = (layerNumber, canvas, selectAll, currentscreenSize, verticalSpeed) => {
  executeScript(`if(window.intervalVerticalScroll){clearInterval(intervalVerticalScroll)};
      document.getElementById('divid_${layerNumber}')?.remove();
      `);

  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  selectAll(canvas);
  var hh = canvas.getActiveObject()?.getBoundingRect().height + 200;
  endpoint(`play ${window.chNumber}-${layerNumber} [HTML] https://localhost:10000/ReactCasparClient/xyz.html`);
  const script = `
                                                                                  window.aaVertical = document.createElement('div');
                                                                                  aaVertical.style.position='absolute';
                                                                                  aaVertical.setAttribute('id','divid_' + '${layerNumber}');
                                                                                  aaVertical.style.zIndex = ${layerNumber};
                                                                                  aaVertical.innerHTML=\`${canvas
      .toSVG(
        [
          "id",
          "class",
          "selectable",
        ]
      )
      .replaceAll(
        '"',
        '\\"'
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