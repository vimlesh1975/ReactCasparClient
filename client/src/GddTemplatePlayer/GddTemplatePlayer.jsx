import React from 'react'
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
    const drawGUIComponentSingleLine = (innerProps) => {
        return <input type='text' value={innerProps} />;
    }

    // function drawGUIComponent(schema, innerProps) {
    //     const gddSchema = schema;
    //     // if (gddSchema.gddType === 'single-line') return drawGUIComponentSingleLine(innerProps)
    //     // Handle GDD Types:
    //     // if (gddSchema.type === 'string') {
    //     //     if (gddSchema.gddType === 'single-line') return drawGUIComponentSingleLine(innerProps)
    //     //     else if (gddSchema.gddType === 'multi-line') return drawGUIComponentMultiLine(innerProps)
    //     //     // etc ...
    //     // } else if (gddSchema.type === 'integer') {
    //     //     if (gddSchema.gddType === 'select') return drawGUIComponentSelect(innerProps)
    //     //     // etc ...
    //     // } // else if () etc ...

    //     // // Handle basic types:

    //     // const basicType = getBasicType(schema.type)

    //     // if (basicType === 'boolean') return drawGUIComponentBoolean(innerProps)
    //     // if (basicType === 'string') return drawGUIComponentString(innerProps)
    //     // if (basicType === 'number') return drawGUIComponentNumber(innerProps)
    //     // if (basicType === 'integer') return drawGUIComponentInteger(innerProps)
    //     // if (basicType === 'array') return drawGUIComponentArray(innerProps)
    //     // if (basicType === 'object') return drawGUIComponentObject(innerProps)

    //     // // Fallback:
    //     // return drawGUIComponentUnknown({ ...innerProps, basicType })
    // }
    const handleClick = () => {
        drawGUIComponentSingleLine('vimlesh');
    }
    return (
        <div>
            <h1>Hi</h1>
            {drawGUIComponentSingleLine('vimlesh1111')}
            <button onClick={handleClick}>click</button>
        </div>
    )
}

export default GddTemplatePlayer
