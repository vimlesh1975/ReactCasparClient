import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { endpoint } from './common'


export const tools = ["ADD 1 AUDIO", "ADD 1 BLUEFISH 1", "ADD 1 DECKLINK 1", "add 1 decklink 1 keyer_internal", "ADD 1 EMBEDDED_AUDIO", "ADD 1 FILE FILENAME.MP4 SEPARATE_KEY", "add 1 file xyz.mxf mono_streams", "ADD 1 IMAGE FILENAME", "ADD 1 NDI", "add 1 ndi name ch1", "add 1 ndi name ch1 allow_fields", "ADD 1 newtek_ivga", "ADD 1 SCREEN 0", "ADD 1 SCREEN 0 FULLSCREEN", "ADD 1 SCREEN 0 INTERACTIVE", "ADD 1 SCREEN 0 NON_INTERACTIVE", "ADD 1 SCREEN 0 WINDOWED", "ADD 1 SCREEN 1 name Preview", "ADD 1 SCREEN 1 NO_AUTO_DEINTERLACE", "Add 1 screen 2 key_only", "add 2 ndi name ch2", "ADD 2 SCREEN 0", "add 3 ndi name ch3", "add 4 ndi name ch4", "BYE", "call 1-1 framerate speed 0.3", "CALL 1-1 LOOP 0", "CALL 1-1 LOOP 1", "call 1-1 seek -30 rel", "call 1-1 seek 30 end", "call 1-1 seek 30 rel", "CHANNEL_GRID", "CLS", "DATA LIST", "DATA REMOVE my_data", "DATA RETRIEVE my_data", 'DATA STORE my_data "Some useful data"', "DIAG", "FLS", "GL GC", "GL INFO", "HELP", "HELP PLAY", "INFO", "INFO 1", "INFO 1-1", "INFO 1-1 B", "INFO 1-1 F", "INFO 1 DELAY", "INFO CONFIG", "INFO PATHS", "INFO QUEUES", "INFO SERVER", "INFO SYSTEM", "INFO THREADS", "KILL", "LOCK 1 ACQUIRE secret", "LOCK 1 CLEAR", "LOCK 1 RELEASE", "LOG LEVEL debug", "LOG LEVEL error", "LOG LEVEL fatal", "LOG LEVEL info", "LOG LEVEL trace", "LOG LEVEL warning", "MIXER 1-0 KEYER 1", "MIXER 1-1 CLEAR", "MIXER 1 CLEAR", "MIXER 1 STRAIGHT_ALPHA_OUTPUT 0", "MIXER 1 STRAIGHT_ALPHA_OUTPUT 1", "MIXER 5 GRID 2", "NDI LIST", 'PLAY 1-1 "ndi://DEVICE-NAME/Source+Name"', 'PLAY 1-1 [NDI] "DEVICE-NAME (Source Name)"', "PLAY 1-1 AMB STING wipe_mask 0 wipe_overlay", "PLAY 2-10 route://1-10 BACKGROUND", "PLAY 2-10 route://1-10 NEXT", "PRINT 1", "REMOVE 1 AUDIO", "REMOVE 1 BLUEFISH 1", "REMOVE 1 DECKLINK 1", "REMOVE 1 EMBEDDED_AUDIO", "REMOVE 1 FILE", "remove 1 ndi", "REMOVE 1 NDI", "REMOVE 1 newtek_ivga", "REMOVE 1 REPLAY", "REMOVE 1 SCREEN", "REMOVE 1 STREAM udp://localhost:5004", "remove 2 ndi", "REMOVE 2 SCREEN", "remove 3 ndi", "remove 4 ndi", "RESTART", "RESUME 1-1", "SET 1 CHANNEL_LAYOUT 8ch", "SET 1 MODE 1080i5000", "SET 1 MODE 1080i5994", "SET 1 MODE 1080i6000", "SET 1 MODE 1080p2398", "SET 1 MODE 1080p2400", "SET 1 MODE 1080p2500", "SET 1 MODE 1080p2997", "SET 1 MODE 1080p3000", "SET 1 MODE 1080p5000", "SET 1 MODE 1080p5994", "SET 1 MODE 1080p6000", "SET 1 MODE 1556p2398", "SET 1 MODE 1556p2400", "SET 1 MODE 1556p2500", "SET 1 MODE 2160p2398", "SET 1 MODE 2160p2400", "SET 1 MODE 2160p2500", "SET 1 MODE 2160p2997", "SET 1 MODE 2160p3000", "SET 1 MODE 576p2500", "SET 1 MODE 720p2398", "SET 1 MODE 720p2400", "SET 1 MODE 720p2500", "SET 1 MODE 720p2997", "SET 1 MODE 720p3000", "SET 1 MODE 720p5000", "SET 1 MODE 720p5994", "SET 1 MODE 720p6000", "SET 1 MODE dci1080p2398", "SET 1 MODE dci1080p2400", "SET 1 MODE dci1080p2500", "SET 1 MODE dci2160p2398", "SET 1 MODE dci2160p2400", "SET 1 MODE dci2160p2500", "SET 1 MODE NTSC", "SET 1 MODE PAL", "Swap 1-1 1-2", "THUMBNAIL GENERATE_ALL", "THUMBNAIL LIST", "TLS", "VERSION FLASH", "VERSION SERVER", "VERSION TEMPLATEH"]
const aa =
`play 1-1 red
play 1-2 blue
mixer 1-2 fill .3 .4 .3 .4`;

const CasparcgTools = () => {
    const [textAreaContent, setTextAreaContent] = useState(aa)
    const [currentTool, setCurrenttool] = useState('')

    const sendAMCPCommand = () => {
        let textArray = textAreaContent.split(/^/gm);
        textArray.forEach(element => {
            endpoint(`${element}`)
        });
    }

    return (
        <div>
            <p>AMCP Commands:</p>
            <div style={{ display: 'flex' }}>
                <div>
                    <textarea rows="4" cols="30" onChange={e => setTextAreaContent(e.target.value)} defaultValue={aa} />
                </div>
                <div>
                    <button style={{ height: 65, marginLeft: 10 }} onClick={sendAMCPCommand}>Send Command</button>
                </div>
            </div>
            <select className="editableBox" onChange={e => setCurrenttool(e.target.value)} value={currentTool}>
                {tools.map((val) => { return <option key={uuidv4()} value={val}>{val}</option> })}
            </select>
            <input className="timeTextBox" onChange={e => setCurrenttool(e.target.value)} value={currentTool} />
            <button style={{ marginLeft: '40px' }} onClick={() => endpoint(`${currentTool}`)}>Send Command</button>
        </div>
    )
}

export default CasparcgTools
