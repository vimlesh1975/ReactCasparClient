import React, { useEffect, useState } from 'react';

const  FileSave1=() =>{
  const [directoryHandle, setDirectoryHandle] = useState(null);
  const [baseFolderName, setBaseFolderName] = useState('');

  const [subfolderName, setSubfolderName] = useState('');

  const [maincss, setMaincss] = useState('');
  const [main2css, setMain2css] = useState('');
  const [mainjs, setMainjs] = useState('');
  const [main2js, setMain2js] = useState('');
  const [gsapjs, setGsapjs] = useState('');


  useEffect(() => {
    var res, text;


    const fetchFiles = async () => {
      try {
        res = await fetch('ReactCasparClient/files/main.css');
        text = await res.text();
        setMaincss(text);

        res = await fetch('ReactCasparClient/files/main2.css');
        text = await res.text();
        setMain2css(text);

        res = await fetch('ReactCasparClient/files/main.js');
        text = await res.text();
        setMainjs(text);

        res = await fetch('ReactCasparClient/files/main2.js');
        text = await res.text();
        setMain2js(text);

        res = await fetch('ReactCasparClient/files/gsap.min.js');
        text = await res.text();
        setGsapjs(text);


        console.log('✅ files fetched');
      } catch (err) {
        console.error('❌ Failed to fetch files', err);
      }
    }
    fetchFiles();
  }, [])

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
    "name": "Lower 3rd - Name",
    "description": "Name lower third",
    "id": "l3rd-name",
    "version": "0",
    "author": {
        "name": "Johan Nyman, SuperFly.tv",
        "email": "john.doe@foo.com"
    },
    "main": "graphic.mjs",
    "customActions": [
        {
            "id": "highlight",
            "name": "Highlight",
            "description": "Highlight the name",
            "schema": null
        }
    ],
    "supportsRealTime": true,
    "supportsNonRealTime": false,
    "schema": {
        "type": "object",
        "properties": {
            "ccgf0": {
                "type": "string",
                "title": "ccgf0",
                "default": "John Doe"
            },
            "ccgf1": {
                "type": "string",
                "title": "ccgf1",
                "default": "Engineering Assistant , DDK Mumbai"
            },
            "ccgf2": {
                "type": "string",
                "gddType": "file-path/image-path",
                "title": "ccgf2",
                "default": "C:/casparcg/mydata/flag/Antigua.png"
            }
        }
    },
    "v_asd": 123,
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
      iframe.style.opacity = 0;
  
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
      this.elements.iframe.style.opacity = 0;
      await this.dispose();
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
    if (!directoryHandle) {
      alert('Please select a base folder first.');
      return;
    }
    if (!subfolderName.trim()) {
      alert('Please enter a name for the subfolder.');
      return;
    }

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
      const htmlContent = `hello world`;
      const htmlHandle = await htmlFolderHandle.getFileHandle(htmlName, { create: true });
      const htmlWritable = await htmlHandle.createWritable();
      await htmlWritable.write(htmlContent);
      await htmlWritable.close();
      console.log(`Overwritten: ${htmlName}`);

      const txtName = `${subfolderName}.txt`;
      const txtContent = `hello world`;
      const txtHandle = await htmlFolderHandle.getFileHandle(txtName, { create: true });
      const txtWritable = await txtHandle.createWritable();
      await txtWritable.write(txtContent);
      await txtWritable.close();
      console.log(`Overwritten: ${txtName}`);

      alert(`✅ Files created in "${subfolderName}"!`);
    } catch (error) {
      console.error('❌ Error creating files:', error);
      alert('An error occurred. Check the console for details.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '1rem' }}>

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

      <h3 style={{ marginTop: '1.5rem' }}>📄 Files to be Created:</h3>
      <p>main.js, main2.js, main.css, main2.css will be created with no content.</p>

      <br /><br />
      <button onClick={handleCreateFiles}>✅ Create Folder and Files</button>
    </div>
  );
}

export default FileSave1;
