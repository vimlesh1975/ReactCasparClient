import React, { useEffect, useState } from 'react';
import { getGdd, getGddProperties, selectAll, deSelectAll } from '../common';
import { useSelector } from 'react-redux';
import Spinner from "../spinner/Spinner";


var html;
var gdd;
var GddProperties;

const FileSave1 = () => {
  const [directoryHandle, setDirectoryHandle] = useState(null);
  const [baseFolderName, setBaseFolderName] = useState('');
  const [subfolderName, setSubfolderName] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const [maincss, setMaincss] = useState('');
  const [main2css, setMain2css] = useState('');
  const [mainjs, setMainjs] = useState('');
  const [main2js, setMain2js] = useState('');
  const [gsapjs, setGsapjs] = useState('');
  const canvas = useSelector(state => state.canvasReducer.canvas);

  const currentscreenSize = useSelector(state => state.currentscreenSizeReducer.currentscreenSize);


  useEffect(() => {
    var res, text;

    const fetchFiles = async () => {
      try {
        res = await fetch(`${process.env.PUBLIC_URL}/files/main.css`);
        text = await res.text();
        setMaincss(text);

        res = await fetch(`${process.env.PUBLIC_URL}/files/main2.css`);
        text = await res.text();
        setMain2css(text);

        res = await fetch(`${process.env.PUBLIC_URL}/files/main.js`);
        text = await res.text();
        setMainjs(text);
        console.log(text)

        res = await fetch(`${process.env.PUBLIC_URL}/files/main2.js`);
        text = await res.text();
        setMain2js(text);

        res = await fetch(`${process.env.PUBLIC_URL}/files/gsap.min.js`);
        text = await res.text();
        setGsapjs(text);


        console.log('✅ files fetched');
      } catch (err) {
        console.error('❌ Failed to fetch files', err);
      }
    }
    fetchFiles();
  }, [])


  const setHtmlString = () => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    selectAll(canvas);

    html = `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                            ${gdd}
                            <link rel="stylesheet" href="main.css">
                                <link rel="stylesheet" href="main2.css">
                                </head>
                                <body>
                                    <script>
                                        document.body.addEventListener('keypress', function(e) {
                if(e.key.toUpperCase() === "S") {stop(); }
              });
                                        if (screen.colorDepth === 0) {
                var css = '[id^=ccg] {display: none; }',
                                        head = document.head || document.getElementsByTagName('head')[0],
                                        style = document.createElement('style');
                                        head.appendChild(style);
                                        style.type = 'text/css';
                                        if (style.styleSheet) {
                                            // This is required for IE8 and below.
                                            style.styleSheet.cssText = css;
                } else {
                                            style.appendChild(document.createTextNode(css));
                }
            }

                                        const elementToObserve = document.body;
            const observer = new MutationObserver(() => {
                                            document.body.style.margin = '0';
                                        document.body.style.padding = '0';
                                        document.body.style.overflow = 'hidden';
                                        var aa = document.getElementsByTagName('div')[0];
                                        aa.style.zoom=(${currentscreenSize * 100
      }/1920)+'%';
                                        observer.disconnect();
            });
                                        observer.observe(elementToObserve, {subtree: true, childList: true })

                                        var dataCaspar = { };

                                        function escapeHtml(unsafe) {
            return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
            }

                                    // Parse templateData into an XML object
                                    function parseCaspar(str) {
            var xmlDoc;
                                    if (window.DOMParser) {
                                        parser = new DOMParser();
                                    xmlDoc = parser.parseFromString(str, "text/xml");
            }
                                    dataCaspar = XML2JSON(xmlDoc.documentElement.childNodes);
            }


                                    // Make the XML templateData message into a more simple key:value object
                                    function XML2JSON(node) {
            var data = { }; // resulting object
                                    for (k = 0; k < node.length; k++) {
            var idCaspar = node[k].getAttribute("id");
                                    var valCaspar = node[k].childNodes[0].getAttribute("value");
                                    if (idCaspar != undefined && valCaspar != undefined) {
                                        data[idCaspar] = valCaspar;
            };
            }
                                    return data;
            }

                                    // Main function to insert data
                                    function dataInsert(dataCaspar) {
                                      for (var idCaspar in dataCaspar) {
                                          var idTemplate = document.getElementById(idCaspar);
                                          if (idTemplate != undefined) {
                                              var idtext = idTemplate.getElementsByTagName('text')[0];
                                              var idimage = idTemplate.getElementsByTagName('image')[0];
                          
                                              if (idtext != undefined) {
                                                  const lines =idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('lines');
                                                  if (lines === '1') {
                                                      idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].innerHTML = escapeHtml(dataCaspar[idCaspar]);
                                                      idTemplate.style.display = "block";
                                                      if (idTemplate.getElementsByTagName('extraproperty')[0] != undefined) {
                                                          var textalign1 = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('textalign');
                                                          var width1 = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('width');
                                                          var originalFontSize = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('originalfontsize');
                                                          if (textalign1 == 'center') {
                                                              idTemplate.getElementsByTagName('text')[0].setAttribute('xml:space', 'preserve1');
                                                              idTemplate.getElementsByTagName('text')[0].style.whiteSpace = "normal";
                                                              idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('x', '0');
                                                              idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('text-anchor', 'middle');
                                                          }
                                                          if (textalign1 == 'right') {
                                                              idTemplate.getElementsByTagName('text')[0].setAttribute('xml:space', 'preserve1');
                                                              idTemplate.getElementsByTagName('text')[0].style.whiteSpace = 'normal';
                                                              idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('x', width1 / 2);
                                                              idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('text-anchor', 'end');
                                                          }
                                                          idTemplate.getElementsByTagName('text')[0].setAttribute('font-size', originalFontSize);
                                                          do {
                                                              var dd = idTemplate.getElementsByTagName('text')[0].getAttribute('font-size');
                                                              idTemplate.getElementsByTagName('text')[0].setAttribute('font-size', dd - 1);
                                                              var width2 = idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].getBBox().width;
                                                          } while (width2 > width1);
                                                      }
                                                  }
                                                  else {
                                                    idTemplate.style.display = "block";
                                                    var textElement = idTemplate.getElementsByTagName('text')[0];

                                                    var ctm = textElement.parentNode.getCTM();
                                                    ctm.d = 1;
                                                    textElement.parentNode.transform.baseVal.initialize(textElement.parentNode.ownerSVGElement.createSVGTransformFromMatrix(ctm));

                                                    var existingTspans = Array.from(textElement.getElementsByTagName('tspan'));
                                                    var initialX = existingTspans[0].getAttribute('x');
                                                    var initialY = existingTspans[0].getAttribute('y');
                                                    var initialDy = existingTspans[1].getAttribute('y') - existingTspans[0].getAttribute('y');
                                                    var newData = escapeHtml(dataCaspar[idCaspar]);
                                                    var dataSegments = newData.split('CRLF');
                                                    var maxWidth = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('width');
                                                    var maxHeight = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('height');
                        
                                                    function splitTextIntoLines(text, maxWidth) {
                                                        var words = text.split(' ');
                                                        var lines = [];
                                                        var currentLine = '';
                                                        words.forEach(function (word) {
                                                            var testLine = currentLine.length === 0 ? word : currentLine + ' ' + word;
                                                            var testWidth = textElement.getSubStringLength(0, testLine.length);
                        
                                                            if (testWidth > maxWidth) {
                                                                lines.push(currentLine);
                                                                currentLine = word;
                                                            } else {
                                                                currentLine = testLine;
                                                            }
                                                        });
                                                        lines.push(currentLine);
                                                        return lines;
                                                    }
                        
                                                    var tspans = [];
                                                    var previoustxtlines = 0;
                        
                                                    dataSegments.forEach(function (segment, i) {
                                                        if (segment.trim() === '') {
                                                          segment=' ';
                                                        }
                                                        textElement.innerHTML = segment;
                                                        var txtlines = splitTextIntoLines(segment, maxWidth);
                                                        txtlines.forEach(function (line, j) {
                                                            var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                                                            tspan.textContent = line;
                                                            tspan.setAttribute('x', initialX);
                                                            tspan.setAttribute('y', parseInt(initialY) + (parseInt(initialDy) * (previoustxtlines + j)));
                                                            tspans.push(tspan);
                                                        });
                                                        previoustxtlines += txtlines.length;
                                                    });
                                                    textElement.innerHTML = '';
                                                    if (tspans.length === 1) {
                                                        var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                                                        tspan.textContent = ' ';
                                                        tspan.setAttribute('x', initialX);
                                                        tspan.setAttribute('y', parseInt(initialY) + parseInt(initialDy));
                                                        tspans.push(tspan);
                                                    }
                        
                                                    tspans.forEach(function (tspan) {
                                                        textElement.appendChild(tspan);
                                                    });
                                                    var ctm = textElement.parentNode.getCTM();
                                                    ctm.d = (maxHeight / textElement.getBBox().height);
                                                    textElement.parentNode.transform.baseVal.initialize(textElement.parentNode.ownerSVGElement.createSVGTransformFromMatrix(ctm));
                                                  }
                                                  
                                              }
                          
                                              else if (idimage != undefined) {
                                                  idTemplate.getElementsByTagName('image')[0].setAttribute('xlink:href', escapeHtml(dataCaspar[idCaspar]));
                                                  idTemplate.getElementsByTagName('image')[0].setAttribute('preserveAspectRatio', 'none');
                                                  idTemplate.style.display = "block";
                                              }
                                          }
                                      }
                                  }

                                    // Call for a update of data from CasparCG client
                                    function update(str) {
                                        parseCaspar(str); // Parse templateData into an XML object
                                    dataInsert(dataCaspar); // Insert data
            }

                                    // insert data from CasparCg client when activated
                                    function play(str) {
                                        parseCaspar(str); // Parse templateData into an XML object
                                    dataInsert(dataCaspar); // Insert data
            // gwd.actions.timeline.gotoAndPlay('document.body', 'start');
            }
                                    function stop() {
                                        document.body.innerHTML = '' ;
            }
                                    function updatestring(str1, str2) {
            var idTemplate = document.getElementById(str1);

            const lines = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('lines');
            if (lines === '1') {
                idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].innerHTML = str2;
                idTemplate.style.display = "block";
                if (idTemplate.getElementsByTagName('extraproperty')[0] != undefined) {
                    var textalign1 = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('textalign');
                    var width1 = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('width');
                    var originalFontSize = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('originalfontsize');
                    if (textalign1 == 'center') {
                        idTemplate.getElementsByTagName('text')[0].setAttribute('xml:space', 'preserve1');
                        idTemplate.getElementsByTagName('text')[0].style.whiteSpace = "normal";
                        idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('x', '0');
                        idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('text-anchor', 'middle');
                    }
                    if (textalign1 == 'right') {
                        idTemplate.getElementsByTagName('text')[0].setAttribute('xml:space', 'preserve1');
                        idTemplate.getElementsByTagName('text')[0].style.whiteSpace = 'normal';
                        idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('x', width1 / 2);
                        idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].setAttribute('text-anchor', 'end');
                    }
                    idTemplate.getElementsByTagName('text')[0].setAttribute('font-size', originalFontSize);
                    do {
                        var dd = idTemplate.getElementsByTagName('text')[0].getAttribute('font-size');
                        idTemplate.getElementsByTagName('text')[0].setAttribute('font-size', dd - 1);
                        var width2 = idTemplate.getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].getBBox().width;
                    } while (width2 > width1);
                }
            }
            else {
                idTemplate.style.display = "block";
                var textElement = idTemplate.getElementsByTagName('text')[0];

                var ctm = textElement.parentNode.getCTM();
                ctm.d = 1;
                textElement.parentNode.transform.baseVal.initialize(textElement.parentNode.ownerSVGElement.createSVGTransformFromMatrix(ctm));

                var existingTspans = Array.from(textElement.getElementsByTagName('tspan'));
                var initialX = existingTspans[0].getAttribute('x');
                var initialY = existingTspans[0].getAttribute('y');
                var initialDy = existingTspans[1].getAttribute('y') - existingTspans[0].getAttribute('y');
                var newData = str2;
                var dataSegments = newData.split('CRLF');
                var maxWidth = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('width');
                var maxHeight = idTemplate.getElementsByTagName('extraproperty')[0].getAttribute('height');

                function splitTextIntoLines(text, maxWidth) {
                    var words = text.split(' ');
                    var lines = [];
                    var currentLine = '';
                    words.forEach(function (word) {
                        var testLine = currentLine.length === 0 ? word : currentLine + ' ' + word;
                        var testWidth = textElement.getSubStringLength(0, testLine.length);

                        if (testWidth > maxWidth) {
                            lines.push(currentLine);
                            currentLine = word;
                        } else {
                            currentLine = testLine;
                        }
                    });
                    lines.push(currentLine);
                    return lines;
                }

                var tspans = [];
                var previoustxtlines = 0;

                dataSegments.forEach(function (segment, i) {
                    if (segment.trim() === '') {
                        segment = ' ';
                    }
                    textElement.innerHTML = segment;
                    var txtlines = splitTextIntoLines(segment, maxWidth);
                    txtlines.forEach(function (line, j) {
                        var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        tspan.textContent = line;
                        tspan.setAttribute('x', initialX);
                        tspan.setAttribute('y', parseInt(initialY) + (parseInt(initialDy) * (previoustxtlines + j)));
                        tspans.push(tspan);
                    });
                    previoustxtlines += txtlines.length;
                });
                textElement.innerHTML = '';
                if (tspans.length === 1) {
                    var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                    tspan.textContent = ' ';
                    tspan.setAttribute('x', initialX);
                    tspan.setAttribute('y', parseInt(initialY) + parseInt(initialDy));
                    tspans.push(tspan);
                }

                tspans.forEach(function (tspan) {
                    textElement.appendChild(tspan);
                });
                var ctm = textElement.parentNode.getCTM();
                ctm.d = (maxHeight / textElement.getBBox().height);
                textElement.parentNode.transform.baseVal.initialize(textElement.parentNode.ownerSVGElement.createSVGTransformFromMatrix(ctm));
            }
         
        }
                                    function updateimage(str1, str2) {
                                        document.getElementById(str1).getElementsByTagName('image')[0].setAttribute('xlink:href', str2);
                                    document.getElementById(str1).getElementsByTagName('image')[0].setAttribute('preserveAspectRatio', 'none');
                                    document.getElementById(str1).style.display = "block";
            }

                                </script>
                                <div> ${canvas.toSVG([
        "id",
        "class",
        "selectable",
      ])}  </div>
                            </body>
                            <script src="main.js"></script>
                            <script src="main2.js"></script>
                        </html>`;

    deSelectAll(canvas);

  };


  const handleChooseFolder = async () => {
    try {
      const handle = await window.showDirectoryPicker();
      setDirectoryHandle(handle);
      setBaseFolderName(handle.name);
    } catch (err) {
      console.error('Error choosing folder:', err);
    }
  };
  const handleCreateFiles = async () => {

    gdd = getGdd(canvas, "RCC");
    GddProperties = getGddProperties(canvas);
    console.log(GddProperties)
    console.log(mainjs);
    const fileList = [
      {
        name: 'main.js',
        content: mainjs
      },
      {
        name: 'main2.js',
        content: main2js
      },
      {
        name: 'main.css',
        content: maincss
      },
      {
        name: 'main2.css',
        content: main2css
      },
      {
        name: 'gsap.min.js',
        content: gsapjs
      },
      {
        name: 'manifest.json',
        content: `{
      "$schema": "https://ograf.ebu.io/v1-draft-0/specification/json-schemas/graphics/schema.json",
      "name": "${subfolderName}",
      "description": "IframeGraphic",
      "id": "IframeGraphic1",
      "version": "0",
      "author": {
          "name": "Vimlesh Kumar, DDK Mumbai",
          "email": "vimlesh195@hotmail.com"
      },
      "main": "graphic.mjs",
      "customActions": [],
      "supportsRealTime": true,
      "supportsNonRealTime": false,
      "schema": {
          "type": "object",
          "properties": ${GddProperties}
      },
      "v_Designer_Software": "RCC",
      "v_myLittleNote": "Vendor-specific properties can be added using the 'v_' prefix, like this!"
    }`
      },
      {
        name: 'graphic.mjs',
        content: `class IframeGraphic extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }
    
      async load() {
        const iframe = document.createElement('iframe');
        iframe.src = new URL('./html/${subfolderName}.html', import.meta.url).toString();
    
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.opacity = 1;
    
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(iframe);
        this.elements = { iframe };
    
        return { code: 200, message: 'Loaded iframe' };
      }
    
      async dispose() {
        this.shadowRoot.innerHTML = '';
        return { code: 200, message: 'Disposed' };
      }
    
      async playAction({ data }) {
        this.elements.iframe.style.opacity = 1;
        return { code: 200, message: 'Played' };
      }
    
      async stopAction() {
      const iframeWindow = this.elements.iframe.contentWindow;
      iframeWindow.outAnimation();
        // await this.dispose();
        return { code: 200, message: 'Stopped' };
      }
    
      async updateAction({ data }) {
        console.log(data);
    
        const iframeWindow = this.elements.iframe.contentWindow;
        let xml = '';
        const aa = Object.entries(data).map(([key, value]) => ({ key, value }));
        aa.forEach(val => {
          var val1 = val.value;
          if (val1) {
            if (val1.includes("\\n")) {
              val1 = val1.replace(/\\n/g, 'CRLF');
            }
          }
          xml += \`<componentData id="\${val.key}"><data id="text" value="\${val1}" /></componentData>\`;
        });
    
        xml = \`<templateData>\${xml}</templateData>\`;
        iframeWindow.update(xml);
        this.elements.iframe.style.opacity = 1;
    
        return { code: 200, message: 'Updated' };
      }
    
      async customAction({ id, payload }) {
        return { code: 400, message: 'No custom actions' };
      }
    
      async getStatus() {
        return {
          code: 200,
          message: 'OK',
          result: {
            status: 'ready'
          }
        };
      }
    }
    
    export default IframeGraphic;`
      }
    ];
    if (!directoryHandle) {
      alert('Please select a base folder first.');
      return;
    }
    if (!subfolderName.trim()) {
      alert('Please enter a name for the subfolder.');
      return;
    }
    setIsLoading(true); // Show spinner
    try {
      const subfolderHandle = await directoryHandle.getDirectoryHandle(subfolderName.trim(), { create: true });
      const htmlFolderHandle = await subfolderHandle.getDirectoryHandle('html', { create: true });

      for (const file of fileList) {
        const isPreserveOnly = ['main.js', 'main2.js', 'main.css', 'main2.css', 'gsap.min.js'].includes(file.name);
        const isHtmlBound = isPreserveOnly || file.name.endsWith('.html') || file.name.endsWith('.txt');

        const targetFolder = isHtmlBound ? htmlFolderHandle : subfolderHandle;

        if (isPreserveOnly) {
          try {
            await targetFolder.getFileHandle(file.name);
            console.log(`Skipped (already exists): ${file.name}`);
            continue;
          } catch {
            // file does not exist, so it will be created
          }
        }

        const fileHandle = await targetFolder.getFileHandle(file.name, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(file.content);
        await writable.close();
        console.log(`${isPreserveOnly ? 'Created (once)' : 'Overwritten'}: ${file.name}`);
      }

      // HTML and TXT files
      const htmlName = `${subfolderName}.html`;
      setHtmlString();
      const htmlContent = html;
      // const htmlContent = 'htmlString1';
      const htmlHandle = await htmlFolderHandle.getFileHandle(htmlName, { create: true });
      const htmlWritable = await htmlHandle.createWritable();
      await htmlWritable.write(htmlContent);
      await htmlWritable.close();
      console.log(`Overwritten: ${htmlName}`);

      const txtName = `${subfolderName}.txt`;

      const bb =
        JSON.stringify({
          pageName: subfolderName + '.txt',
          pageValue: canvas.toJSON(["id", "class", "selectable"]),
          animation: "",
          jsfilename: 'main.js',
          cssfilename: 'main.css',
          jsfilename2: 'main2.js',
          cssfilename2: 'main2.css',
        }) + "\r\n";
      // const file1 = new Blob([bb], { type: "text/plain" });


      const txtContent = bb;
      const txtHandle = await htmlFolderHandle.getFileHandle(txtName, { create: true });
      const txtWritable = await txtHandle.createWritable();
      await txtWritable.write(txtContent);
      await txtWritable.close();
      console.log(`Overwritten: ${txtName}`);

      setIsLoading(false); // Show spinner
      setNote(`✅ Files created in "${subfolderName}"!`)
    } catch (error) {
      console.error('❌ Error creating files:', error);
      // alert('An error occurred. Check the console for details.');
      setIsLoading(false); // Show spinner
      setNote(`❌ Error creating files:, ${error}`)
    }
  };

  return (
    <div style={{ padding: '1rem' }}>

      <button onClick={handleChooseFolder}>Choose Base Folder</button>
      {baseFolderName && <p><strong>Selected Folder:</strong> {baseFolderName}</p>}

      <div style={{ marginTop: '1rem' }}>
        <label>
          Subfolder to Create:{" "}
          <input
            type="text"
            value={subfolderName}
            onChange={e => setSubfolderName(e.target.value)}
            placeholder="e.g., MyProject"
            style={{ width: '200px' }}
          />
        </label>
      </div>

      <br /><br />
      <button onClick={handleCreateFiles}>✅ Create Folder and Files</button>
      {isLoading && <Spinner />}
      <h3>{note}</h3>
    </div>
  );
}

export default FileSave1;
