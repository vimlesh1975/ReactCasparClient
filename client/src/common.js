import axios from "axios";
import { animation } from "./animation.js";
import { fabric } from "fabric";
// console.log(fabric.util.)

export const buildDate = "300623_1";
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

export const findElementWithId = (group, id) => {
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

export var address1 = "http://" + window.location.host.split(":")[0] + ":9000";
export const screenSizes = [1024, 1280, 1920, 2048, 3840, 4096];

export const videoLayers = [1, 2, 3, 10000, 5];
export const templateLayers = {
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
  horizontalScroll2: 145,
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
    .then((aa) => {})
    .catch((aa) => {
      console.log("Error", aa);
    });
};

export const htmlAddress = () => {
  if (window.location.origin === "https://vimlesh1975.github.io") {
    return "https://octopus-app-gzws3.ondigitalocean.app/html";
  } else {
    return "http://localhost:9000/html";
  }
};

export const openaiAddress = () => {
  if (window.location.origin === "https://vimlesh1975.github.io") {
    return "https://octopus-app-gzws3.ondigitalocean.app/";
  } else {
    return "http://localhost:9000/";
  }
};

export const socketAddress = () => {
  if (window.location.origin === "https://vimlesh1975.github.io") {
    return "https://octopus-app-gzws3.ondigitalocean.app";
  } else {
    return "http://localhost:9000";
  }
};

export const streamingAddress = () => {
  if (window.location.origin === "https://vimlesh1975.github.io") {
    return "https://octopus-app-gzws3.ondigitalocean.app";
  } else {
    return "http://localhost:8000";
  }
};
export const sendtohtml = (canvas, layerNumber) => {
  axios
    .post(htmlAddress(), {
      data1: `<div id='divid_${layerNumber}'>${canvas.toSVG()}</div>`,
      clientId: window.clientId,
    })
    .then((aa) => {})
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
      .then((aa) => {})
      .catch((aa) => {
        console.log("Error", aa);
      });
  } else {
    axios
      .post("http://localhost:9000/executeScript", {
        data1: str,
        clientId: window.clientId,
      })
      .then((aa) => {})
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
  executeScript(
    `document.getElementById('divid_${layerNumber}')?document.getElementById('divid_${layerNumber}').innerHTML=\`${canvas.toSVG()}\`:''`
  );

  endpoint(`call ${window.chNumber}-${layerNumber} "
    aa.innerHTML='${canvas.toSVG().replaceAll('"', '\\"')}';
        "`);
};

export const stopGraphics = (layerNumber) => {
  clearHtml(layerNumber);
  endpoint(
    `mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`
  );
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
          } catch (error) {}
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
    endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
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
          } catch (error) {}
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
  "Bahnschrift Light",
  "Bahnschrift Light Condensed",
  "Bahnschrift SemiBold",
  "Bahnschrift SemiBold",
  "Bahnschrift SemiBold Condensed",
  "Bahnschrift SemiCondensed",
  "Bahnschrift SemiLight",
  "Bahnschrift SemiLight",
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

export const animationMethods = [
  "linear",
  "easenone",
  "easeinquad",
  "easeoutquad",
  "easeinoutquad",
  "easeoutinquad",
  "easeincubic",
  "easeoutcubic",
  "easeinoutcubic",
  "easeoutincubic",
  "easeinquart",
  "easeoutquart",
  "easeinoutquart",
  "easeoutinquart",
  "easeinquint",
  "easeoutquint",
  "easeinoutquint",
  "easeoutinquint",
  "easeinsine",
  "easeoutsine",
  "easeinoutsine",
  "easeoutinsine",
  "easeinexpo",
  "easeoutexpo",
  "easeinoutexpo",
  "easeoutinexpo",
  "easeincirc",
  "easeoutcirc",
  "easeinoutcirc",
  "easeoutincirc",
  "easeinelastic",
  "easeoutelastic",
  "easeinoutelastic",
  "easeoutinelastic",
  "easeinback",
  "easeoutback",
  "easeinoutback",
  "easeoutintback",
  "easeoutbounce",
  "easeinbounce",
  "easeinoutbounce",
  "easeoutinbounce",
];
export const languages = [
  "en-US",
  "hi-IN",
  "te-IN",
  "ta-IN",
  "mr-IN",
  "gu-IN",
  "	kn-IN",
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
