'use client'

import React, { useEffect, useState } from 'react'




export default function R3Controller() {
    const [isClient, setIsClient] = useState(false)
    const [data, setData] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedScene, setSelectedScene] = useState(null)
    const [exports, setExports] = useState([])
    const [animations, setanimations] = useState([])
    const [exportValues, setExportValues] = useState({})
    const [command, setCommand] = useState(`engine createscene "ProjectName/SceneName"`)
    const [commandResponse, setCommandResponse] = useState(``)
    const [listloadedscenes, setListloadedscenes] = useState([])
    const [searchQuery, setSearchQuery] = useState('');



    const fullstructure = () => {
        setIsClient(true)
        fetch("/api/fullstructure")
            .then((res) => res.json())
            .then((data) => {
                setData(data.projectData)
                setSelectedProject(data.projectData[0]?.name || null)
            })
            .catch((err) => console.error("Failed to fetch structure", err)
            )
        getloadedscenes()
    }

    const getloadedscenes = () => {
        fetch("/api/sendCommand", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ command: `engine listloadedscenes` })
        })
            .then((res) => res.json())
            .then((data) => {
                const raw = data.responce?.response || ""
                const match = raw.match(/\[(.*?)\]/)
                const list = match?.[1]?.split(',').map(s => s.trim()) || []
                if (list.length > 0 && list[0] !== '') {
                    setListloadedscenes(list)
                }
            })
            .catch((err) => console.error("Failed to fetch scenes", err))
    }

    return (<div>
        <div style={{ display: 'flex' }}>
            <div style={{ border: '1px solid red', width: 250, }}>
                <button onClick={fullstructure}>Get Full Structure</button>
                <h2>Project:</h2>
                <select
                    style={{ width: 240, padding: '6px 12px', marginBottom: '12px' }}
                    value={selectedProject || ""}
                    onChange={(e) => {
                        setSelectedProject(e.target.value)
                        setSelectedScene(null)
                        setExports([])
                        setExportValues({})
                        setanimations([])
                        // setThumbnail(null)
                    }}
                >
                    <option value="" disabled>Select</option>
                    {data.map((project) => (
                        <option key={project.name} value={project.name}>{project.name}</option>
                    ))}
                </select>

                {selectedProject && (
                    <>
                        <h2>Scene:</h2>
                        <input
                            type="text"
                            placeholder="Search scenes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: 200,
                                padding: '8px',
                                marginBottom: '12px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                        />
                        <div style={{ maxHeight: 700, overflow: 'scroll' }}>
                            {data
                                .find((p) => p.name === selectedProject)?.scenes
                                .filter(scene =>
                                    scene.name.toLowerCase().includes(searchQuery.toLowerCase())
                                ).map(scene => (
                                    <div
                                        key={scene.name}
                                        onClick={async () => {
                                            setSelectedScene(scene.name)

                                            const res = await fetch("/api/exports", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ project: selectedProject, scene: scene.name })
                                            })

                                            const data = await res.json()
                                            setExports(data.exports || [])
                                            console.log(data)
                                            setanimations(data.animations || [])
                                            // setThumbnail(data.thumbnail || null)

                                            const initialValues = {}
                                            data.exports.forEach((exp) => {
                                                initialValues[exp.name] = exp.value
                                            })
                                            setExportValues(initialValues)
                                        }}
                                        style={{
                                            padding: '6px 12px',
                                            marginBottom: '6px',
                                            backgroundColor: selectedScene === scene.name ? 'grey' : '#eee',
                                            color: selectedScene === scene.name ? 'white' : '#000',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            userSelect: 'none',
                                            fontSize: '20px',
                                        }}
                                    >
                                        {scene.name}
                                        <img src={scene.thumbnail}></img>
                                    </div>
                                ))}
                        </div>

                    </>
                )}
            </div>
            <div style={{ border: '1px solid red', width: 950 }}>

                <div>
                    <h3>Variables</h3>
                    {exports.length > 0 && (
                        <div style={{ height: 850, overflow: 'auto' }}>

                            <table border="1" cellPadding="8" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Variable</th>
                                        <th>Value</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exports.map((exp) => (
                                        <tr key={exp.name}>
                                            <td>{exp.name}</td>
                                            <td>
                                                {(() => {
                                                    if (exp.type === "String") {
                                                        return (
                                                            <textarea
                                                                style={{ width: 680, height: 60, resize: "vertical" }}
                                                                value={exportValues[exp.name] || ""}
                                                                onChange={(e) =>
                                                                    setExportValues((prev) => ({
                                                                        ...prev,
                                                                        [exp.name]: e.target.value
                                                                    }))
                                                                }
                                                            />
                                                        );
                                                    }

                                                    if (exp.type === "Bool") {
                                                        return (
                                                            <input
                                                                type="checkbox"
                                                                checked={exportValues[exp.name] === true || exportValues[exp.name] === "true"}
                                                                onChange={(e) =>
                                                                    setExportValues((prev) => ({
                                                                        ...prev,
                                                                        [exp.name]: e.target.checked
                                                                    }))
                                                                }
                                                            />
                                                        );
                                                    }

                                                    <input
                                                        type="text"
                                                        style={{ width: 150 }}
                                                        value={exportValues[exp.name] ?? ""}
                                                        onChange={(e) => {
                                                            const val = e.target.value;

                                                            if (val === "" || val === "-") {
                                                                setExportValues((prev) => ({
                                                                    ...prev,
                                                                    [exp.name]: val
                                                                }));
                                                                return;
                                                            }

                                                            const num = parseFloat(val);
                                                            if (!isNaN(num)) {
                                                                setExportValues((prev) => ({
                                                                    ...prev,
                                                                    [exp.name]: num
                                                                }));
                                                            }
                                                        }}
                                                    />


                                                    if (exp.type === "Texture") {
                                                        return (
                                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                                <input
                                                                    style={{ width: 400 }}
                                                                    value={exportValues[exp.name] || ""}
                                                                    onChange={(e) =>
                                                                        setExportValues((prev) => ({
                                                                            ...prev,
                                                                            [exp.name]: e.target.value
                                                                        }))
                                                                    }
                                                                />
                                                                <input
                                                                    type="file"
                                                                    onChange={(e) => {
                                                                        if (e.target.files?.[0]) {
                                                                            const fileName = e.target.files[0].name;
                                                                            setExportValues((prev) => ({
                                                                                ...prev,
                                                                                [exp.name]: fileName
                                                                            }));
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                    if (exp.type === "ColorInt") {
                                                        // convert int to hex
                                                        let hex = "#000000";
                                                        const val = exportValues[exp.name];
                                                        if (val !== undefined && val !== "") {
                                                            let intVal = parseInt(val);
                                                            if (isNaN(intVal)) intVal = 0;
                                                            hex =
                                                                "#" +
                                                                (intVal >>> 0)
                                                                    .toString(16)
                                                                    .padStart(8, "0")
                                                                    .slice(-6);
                                                        }
                                                        return (
                                                            <input
                                                                type="color"
                                                                value={hex}
                                                                onChange={(e) => {
                                                                    const hexVal = e.target.value;
                                                                    // Convert hex to int
                                                                    const intVal = parseInt(hexVal.replace("#", ""), 16);
                                                                    setExportValues((prev) => ({
                                                                        ...prev,
                                                                        [exp.name]: intVal.toString()
                                                                    }));
                                                                }}
                                                            />
                                                        );
                                                    }

                                                    // Default fallback input
                                                    return (
                                                        <input
                                                            style={{ width: 300 }}
                                                            value={exportValues[exp.name] || ""}
                                                            onChange={(e) =>
                                                                setExportValues((prev) => ({
                                                                    ...prev,
                                                                    [exp.name]: e.target.value
                                                                }))
                                                            }
                                                        />
                                                    );
                                                })()}
                                            </td>
                                            <td>{exp.type}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>

            <div style={{ border: '1px solid red', width: 300 }}>

                <h2>Actions</h2>
                {selectedScene && (
                    <div>

                        <div>
                            <button
                                onClick={async () => {
                                    const updates = Object.entries(exportValues).map(([name, value]) => ({ name, value }))
                                    const res = await fetch("/api/setExports", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ project: selectedProject, scene: selectedScene, updates })
                                    })
                                    const result = await res.json()
                                    console.log("Export update:", result)
                                }}
                            >
                                Update values
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                const sceneId = `${selectedProject}/${selectedScene}`
                                setListloadedscenes((prev) => prev.filter((item) => item !== sceneId))
                                fetch("/api/timeline", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ project: selectedProject, scene: selectedScene, timeline: "Out" })
                                })
                            }}
                        >
                            ⏹ Out
                        </button>

                        <div>
                            <button
                                onClick={() => {
                                    fetch("/api/unloadAllScenes", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                    })
                                        .then((res) => res.json())
                                        .then(() => setListloadedscenes([]))
                                }}
                            >
                                🧹 Unload All Scenes
                            </button>
                        </div>

                        <div>
                            <h3>Animation</h3>
                            <table border="1" cellPadding="6" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Animation</th>
                                        <th>Play</th>
                                        <th>with new Values</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {animations.map((animation, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{animation}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        fetch("/api/timeline", {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({ project: selectedProject, scene: selectedScene, timeline: animation })
                                                        })
                                                            .then((res) => res.json())
                                                            .then(() => {
                                                                const sceneId = `${selectedProject}/${selectedScene}`
                                                                // if (!listloadedscenes.includes(sceneId)) {
                                                                setListloadedscenes([sceneId])
                                                                // }
                                                            })
                                                    }
                                                >
                                                    ▶️
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        fetch("/api/playwithexportedvalues", {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({
                                                                project: selectedProject,
                                                                scene: selectedScene,
                                                                timeline: animation,
                                                                exportedvalues: Object.entries(exportValues).map(([name, value]) => ({ name, value }))
                                                            })
                                                        })
                                                            .then((res) => res.json())
                                                            .then(() => {
                                                                const sceneId = `${selectedProject}/${selectedScene}`
                                                                if (!listloadedscenes.includes(sceneId)) {
                                                                    setListloadedscenes((prev) => [...prev, sceneId])
                                                                }
                                                            })
                                                    }
                                                >
                                                    ▶️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                        <div style={{ border: '1px solid black' }}>
                            <div>
                                <h3>Command</h3>
                                <textarea
                                    style={{ width: 280, height: 100 }}
                                    type="text"
                                    value={command}
                                    onChange={(e) => setCommand(e.target.value)}
                                    placeholder="Enter command here"
                                />
                            </div>
                            <div>
                                <button
                                    onClick={async () => {
                                        const res = await fetch("/api/sendCommand", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ command })
                                        })
                                        const result = await res.json()
                                        setCommandResponse(JSON.stringify(result))
                                    }}
                                >
                                    Send Command
                                </button>
                            </div>
                            <h3>Response</h3>

                            <label>{commandResponse}</label>
                        </div>


                    </div>
                )}
            </div>




            <div style={{ border: '1px solid red', width: 400 }}>
                <h2>Loaded Scenes: {listloadedscenes.length}</h2>
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Loaded Scene</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listloadedscenes.map((scene, index) => (
                            <tr key={index}>
                                <td>{scene}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setListloadedscenes((prev) => prev.filter((s) => s !== scene))
                                            fetch("/api/timeline", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    project: scene.split('/')[0],
                                                    scene: scene.split('/')[1],
                                                    timeline: "Out"
                                                })
                                            })
                                        }}
                                    >
                                        ⏹ Out
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>


    </div>)
}
