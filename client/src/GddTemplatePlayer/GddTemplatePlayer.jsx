import React, { useState } from 'react'
import {
    validateData,
    getDefaultDataFromSchema,
    setupSchemaValidator,
    // GDDSchema,
    // GDDTypes
} from 'graphics-data-definition'
import fetch from 'node-fetch';

// eslint-disable-next-line
const aa = async () => {
    // This object represents a GDD Schema that have been read from a graphics template:
    const mySchema = {
        "$schema": "https://superflytv.github.io/GraphicsDataDefinition/gdd-meta-schema/v1/schema.json",
        "title": "One-Line GFX Template",
        "type": "object",
        "properties": {
            "text0": {
                "type": "string",
                "gddType": "single-line",
            },
            "color": {
                "type": "string",
                "gddType": "color-rrggbb",
                "pattern": '^#[0-9a-f]{6}$',
                "default": "#000000"
            }
        },
    }
    // This object represents the data that comes from the user input form:
    const myData = {
        text0: "This is the text!"
    }

    // Verify that the schema is valid: -------------------------------------------
    const schemaValidator = await setupSchemaValidator({
        fetch: async (url) => {
            return await (await fetch(url)).json()
        }
    })
    const schemaValidateResult = schemaValidator.validate(mySchema)
    if (schemaValidateResult === null) console.log('Schema is valid!')
    else console.log('Schema is not valid: ' + schemaValidateResult)

    // Validate that the data is correct: -----------------------------------------
    const dataValidateResult = validateData(mySchema, myData)
    if (dataValidateResult === null) console.log('Data is valid!')
    else console.log('Data is not valid: ' + schemaValidateResult)

    // Generate a default data-object, to use for prefilling: ---------------------
    const defaultData = getDefaultDataFromSchema(mySchema)
    console.log('Default Data from schema: ' + JSON.stringify(defaultData))

}
// aa()

const GddTemplatePlayer = () => {
    const [aa, setAa] = useState('')

    async function opentemplateFile() {
        var content;
        var fileReader;

        var fInput = document.createElement("input"); //hidden input to open filedialog
        fInput.setAttribute("type", "file"); //opens files
        fInput.setAttribute("accept", ".html"); ////only useful for inspector debugging
        fInput.setAttribute("multiple", false); ////only useful for inspector debugging

        fInput.click();
        fInput.onchange = (e) => {
            const file = e.target.files[0]
            if (file) {
                fileReader = new FileReader();
                fileReader.onloadend = () => {
                    content = fileReader.result;
                    processContent(content)
                }
                fileReader.readAsText(file);
            }
        };
    }

    const processContent = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        const scriptElement = doc.querySelector('script[name="graphics-data-definition"]');
        setAa(scriptElement.innerHTML)
        console.log(scriptElement)
        return scriptElement ? scriptElement.innerHTML : null;
    }

    return (
        <div>
            <h1>Hi</h1>
            <button onClick={opentemplateFile}>click</button>
            {JSON.stringify(aa)}
        </div>
    )
}


export default GddTemplatePlayer
