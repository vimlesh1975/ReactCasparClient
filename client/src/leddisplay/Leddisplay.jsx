import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const API_BASE = "https://localhost:9000";
const DEFAULT_CHANNEL = "1";

const defaultVideos = [
  {
    id: "video-1",
    label: "Video 1",
    layer: "1",
    clip: "go1080p25.mp4",
    box: { x: 0, y: 0, width: 6 / 14, height: 1 },
  },
  {
    id: "video-2",
    label: "Video 2",
    layer: "2",
    clip: "amb.mp4",
    box: { x: 6 / 14, y: 0, width: 2 / 14, height: 1 },
  },
  {
    id: "video-3",
    label: "Video 3",
    layer: "3",
    clip: "CG1080i50.mp4",
    box: { x: 8 / 14, y: 0, width: 6 / 14, height: 1 },
  },
];

const minBoxSize = 0.03;

const resizeHandles = [
  { name: "nw", label: "Resize top left" },
  { name: "n", label: "Resize top" },
  { name: "ne", label: "Resize top right" },
  { name: "e", label: "Resize right" },
  { name: "se", label: "Resize bottom right" },
  { name: "s", label: "Resize bottom" },
  { name: "sw", label: "Resize bottom left" },
  { name: "w", label: "Resize left" },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundBoxValue(value) {
  return Number(value.toFixed(4));
}

function normalizeBox(box) {
  const width = clamp(Number(box?.width) || 1, minBoxSize, 1);
  const height = clamp(Number(box?.height) || 1, minBoxSize, 1);

  return {
    x: roundBoxValue(clamp(Number(box?.x) || 0, 0, 1 - width)),
    y: roundBoxValue(clamp(Number(box?.y) || 0, 0, 1 - height)),
    width: roundBoxValue(width),
    height: roundBoxValue(height),
  };
}

function snapBox(box, columns = 14, rows = 7) {
  const snapX = Math.round(box.x * columns) / columns;
  const snapY = Math.round(box.y * rows) / rows;
  const snapW = Math.max(1 / columns, Math.round(box.width * columns) / columns);
  const snapH = Math.max(1 / rows, Math.round(box.height * rows) / rows);

  return normalizeBox({
    x: snapX,
    y: snapY,
    width: snapW,
    height: snapH
  });
}

function normalizeSavedVideos(savedVideos) {
  if (!Array.isArray(savedVideos)) {
    return defaultVideos;
  }

  return savedVideos
    .filter((video) => video && typeof video.id === "string")
    .map((savedVideo, index) => {
      const defaultVideo = defaultVideos.find(
        (video) => video.id === savedVideo.id,
      );
      const fallbackLabel = defaultVideo?.label || `Video ${index + 1}`;
      const fallbackLayer = defaultVideo?.layer || String(index + 1);
      const fallbackBox =
        defaultVideo?.box || { x: 0.05 * index, y: 0.05 * index, width: 0.35, height: 0.35 };

      return {
        id: savedVideo.id,
        label:
          typeof savedVideo.label === "string" ? savedVideo.label : fallbackLabel,
        layer:
          typeof savedVideo.layer === "string" ? savedVideo.layer : fallbackLayer,
        clip:
          typeof savedVideo.clip === "string"
            ? savedVideo.clip
            : defaultVideo?.clip || "",
        box: normalizeBox(savedVideo.box || fallbackBox),
      };
    });
}

function getClipName(clip) {
  const normalizedClip = String(clip || "").trim();

  if (normalizedClip === "") {
    return "No file";
  }

  return normalizedClip.split(/[\\/]/).filter(Boolean).pop() || normalizedClip;
}

function Leddisplay() {
  const [videos, setVideos] = useState(defaultVideos);
  const [selectedVideoId, setSelectedVideoId] = useState(defaultVideos[0].id);
  const [isMediaReady, setIsMediaReady] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState(new Set(["Media"]));
  const [openedFileName, setOpenedFileName] = useState("");
  const [status, setStatus] = useState("Ready to connect.");
  const [mediaSearchTerm, setMediaSearchTerm] = useState("");
  const [useSnap, setUseSnap] = useState(true);
  const [isGlobalBusy, setIsGlobalBusy] = useState(false);
  const [mediaTree, setMediaTree] = useState(null);
  const [mediaRoot, setMediaRoot] = useState(null);
  const [mediaWarning, setMediaWarning] = useState("");
  const [columns, setColumns] = useState(14);
  const [rows, setRows] = useState(7);
  const [fileHandle, setFileHandle] = useState(null);
  const [channel, setChannel] = useState(DEFAULT_CHANNEL);

  const stageRef = useRef(null);
  const interactionRef = useRef(null);
  const lastLiveSendRef = useRef(0);

  const fetchMediaList = useCallback(async (rootOverride) => {
    try {
      const mediaTreeUrl =
        typeof rootOverride === "string" && rootOverride.trim() !== ""
          ? `${API_BASE}/api/media-tree?root=${encodeURIComponent(rootOverride.trim())}`
          : `${API_BASE}/api/media-tree`;
      const response = await fetch(mediaTreeUrl);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not fetch media list.");
      }

      setMediaTree(result.tree);
      setMediaRoot(result.root || null);
      setMediaWarning(result.warning || "");
      setIsMediaReady(true);
    } catch (error) {
      console.error("Failed to fetch media list:", error);
      setMediaTree(null);
      setIsMediaReady(false);
      setMediaWarning(error.message || "Could not load media tree.");
    }
  }, []);

  const connectAndRefreshMedia = useCallback(async (options = {}) => {
    const quiet = options.quiet === true;

    try {
      if (!quiet) {
        setStatus("Connecting to CasparCG...");
      }

      setMediaTree(null);
      setMediaRoot(null);
      setIsMediaReady(false);
      setMediaWarning("");

      const testResponse = await fetch(`${API_BASE}/api/casparcg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test",
          channel,
        }),
      });
      const testResult = await testResponse.json();

      if (!testResponse.ok) {
        throw new Error(testResult.error || "Could not connect to CasparCG.");
      }

      if (!quiet) {
        setStatus(`Connected to CasparCG.\n\n${testResult.message}`);
      }

      const pathsResponse = await fetch(`${API_BASE}/api/casparcg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "paths",
          channel,
        }),
      });
      const pathsResult = await pathsResponse.json();

      if (!pathsResponse.ok) {
        throw new Error(pathsResult.error || "Could not query CasparCG paths.");
      }

      if (pathsResult.root) {
        setMediaRoot(pathsResult.root);
      }

      await fetchMediaList(pathsResult.root);

      if (!quiet) {
        setStatus(
          `Connected to CasparCG.\n\n${testResult.message}\n\n${pathsResult.message}`,
        );
      }
    } catch (error) {
      console.error("Failed to refresh CasparCG paths:", error);
      setMediaTree(null);
      setMediaRoot(null);
      setIsMediaReady(false);
      setMediaWarning(error.message || "Could not refresh media paths.");
      if (!quiet) {
        setStatus(`Connection failed: ${error.message}`);
      }
    }
  }, [channel, fetchMediaList]);

  const filteredMediaTree = useCallback(() => {
    if (!mediaTree) return null;
    const term = mediaSearchTerm.trim().toLowerCase();
    if (term === "") return mediaTree;

    function filterNode(node) {
      if (node.type === "file") {
        return node.name.toLowerCase().includes(term) ? node : null;
      }

      if (node.type === "folder") {
        const filteredChildren = {};
        let hasMatch = node.name.toLowerCase().includes(term);

        if (node.children) {
          for (const [name, child] of Object.entries(node.children)) {
            const result = filterNode(child);
            if (result) {
              filteredChildren[name] = result;
              hasMatch = true;
            }
          }
        }

        if (hasMatch) {
          return {
            ...node,
            children: filteredChildren,
          };
        }
      }

      return null;
    }

    return filterNode(mediaTree);
  }, [mediaTree, mediaSearchTerm]);

  useEffect(() => {
    if (mediaSearchTerm.trim() !== "" && mediaTree) {
      const term = mediaSearchTerm.trim().toLowerCase();
      const newExpanded = new Set(expandedFolders);

      function findAndExpand(node, path) {
        if (node.type === "folder" && node.children) {
          let childMatched = false;
          for (const [name, child] of Object.entries(node.children)) {
            const childPath = `${path}/${name}`;
            if (child.name.toLowerCase().includes(term) || findAndExpand(child, childPath)) {
              childMatched = true;
            }
          }
          if (childMatched) {
            newExpanded.add(path);
            return true;
          }
        }
        return node.name.toLowerCase().includes(term);
      }

      findAndExpand(mediaTree, "Media");
      setExpandedFolders(newExpanded);
    }
  }, [mediaSearchTerm, mediaTree, expandedFolders]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        setStatus("Auto connecting to CasparCG...");
        await connectAndRefreshMedia({ quiet: true });
        if (!controller.signal.aborted) {
          setStatus("Auto connected and media tree loaded.");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setMediaTree(null);
          setMediaRoot(null);
          setIsMediaReady(false);
          setStatus(`Auto connect failed: ${error.message}`);
        }
      }
    }, 500);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [connectAndRefreshMedia]);

  function toggleFolder(folderPath) {
    setExpandedFolders((current) => {
      const next = new Set(current);
      if (next.has(folderPath)) {
        next.delete(folderPath);
      } else {
        next.add(folderPath);
      }
      return next;
    });
  }

  function handleMediaDragStart(event, mediaPath) {
    event.dataTransfer.setData("text/plain", mediaPath);
    event.dataTransfer.effectAllowed = "copy";
  }

  function handleVideoDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }

  function handleVideoDrop(event, videoId) {
    event.preventDefault();
    const mediaPath =
      event.dataTransfer.getData("text/plain") ||
      event.dataTransfer.getData("text/uri-list");

    if (!mediaPath) {
      return;
    }

    updateVideo(videoId, { clip: mediaPath });
    setSelectedVideoId(videoId);
  }

  function updateVideo(videoId, changes) {
    setVideos((current) =>
      current.map((video) =>
        video.id === videoId ? { ...video, ...changes } : video,
      ),
    );
  }

  function getNextVideoLayer() {
    return String(
      videos.reduce(
        (maxLayer, video) => Math.max(maxLayer, Number(video.layer) || 0),
        0,
      ) + 1,
    );
  }

  function addVideoBlock() {
    const offset = (videos.length * 0.05) % 0.5;
    const nextVideo = {
      id: `video-${Date.now()}`,
      label: `Video ${videos.length + 1}`,
      layer: getNextVideoLayer(),
      clip: "",
      box: normalizeBox({
        x: offset,
        y: offset,
        width: 0.35,
        height: 0.35,
      }),
    };

    setVideos((current) => [...current, nextVideo]);
    setSelectedVideoId(nextVideo.id);
  }

  function deleteSelectedVideoBlock() {
    if (!selectedVideoId) return;
    deleteVideoBlock(selectedVideoId);
  }

  function deleteVideoBlock(videoId) {
    const nextVideos = videos.filter((video) => video.id !== videoId);
    if (nextVideos.length === videos.length) return;
    setVideos(nextVideos);
    setSelectedVideoId((current) =>
      current === videoId ? nextVideos[0]?.id || "" : current,
    );
  }

  function updateVideoBox(videoId, nextBox) {
    setVideos((current) =>
      current.map((video) =>
        video.id === videoId
          ? { ...video, box: normalizeBox(nextBox) }
          : video,
      ),
    );
  }

  function getStagePointer(event) {
    const stage = stageRef.current;
    if (!stage) return null;
    const rect = stage.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  }

  function nextBoxFromPointer(event) {
    const pointer = getStagePointer(event);
    const interaction = interactionRef.current;
    if (!pointer || !interaction) return null;

    if (interaction.type === "move") {
      return normalizeBox({
        ...interaction.startBox,
        x: interaction.startBox.x + pointer.x - interaction.startPointer.x,
        y: interaction.startBox.y + pointer.y - interaction.startPointer.y,
      });
    }

    const handle = interaction.handle;
    let left = interaction.startBox.x;
    let top = interaction.startBox.y;
    let right = interaction.startBox.x + interaction.startBox.width;
    let bottom = interaction.startBox.y + interaction.startBox.height;

    if (handle.includes("e")) right = clamp(pointer.x, left + minBoxSize, 1);
    if (handle.includes("w")) left = clamp(pointer.x, 0, right - minBoxSize);
    if (handle.includes("s")) bottom = clamp(pointer.y, top + minBoxSize, 1);
    if (handle.includes("n")) top = clamp(pointer.y, 0, bottom - minBoxSize);

    return normalizeBox({
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
    });
  }

  function nextBoxFromPointerSnapped(event) {
    const box = nextBoxFromPointer(event);
    if (!box) return null;
    return useSnap ? snapBox(box, columns, rows) : box;
  }

  async function sendAction(action, video, extra = {}, options = {}) {
    if (!options.quiet) setStatus("Sending command...");

    try {
      const response = await fetch(`${API_BASE}/api/casparcg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          layer: video?.layer || "1",
          clip: video?.clip || "",
          channel,
          ...extra,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "CasparCG command failed.");
      if (!options.quiet) setStatus(result.message);

      if (action === "play" || action === "playLoop") {
        updateVideo(video.id, { playing: true });
      } else if (action === "stop") {
        updateVideo(video.id, { playing: false });
      }
    } catch (error) {
      setStatus(error.message);
    }
  }

  function sendFill(video, nextBox = video.box, options = {}) {
    return sendAction("fill", video, { box: nextBox }, options);
  }

  async function playAllLoop() {
    setIsGlobalBusy(true);
    setStatus("Sending all videos in loop...");
    try {
      const response = await fetch(`${API_BASE}/api/casparcg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "playAllLoop", channel, videos }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not play all videos.");
      setVideos((current) => current.map((v) => ({ ...v, playing: true })));
      setStatus(result.message);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsGlobalBusy(false);
    }
  }

  async function stopAll() {
    setIsGlobalBusy(true);
    setStatus("Stopping all videos...");
    try {
      const response = await fetch(`${API_BASE}/api/casparcg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "stopAll", channel, videos }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not stop all videos.");
      setVideos((current) => current.map((v) => ({ ...v, playing: false })));
      setStatus(result.message);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsGlobalBusy(false);
    }
  }

  async function saveStateFile() {
    const suggestedName = openedFileName || `multivideo-layout-${new Date().toISOString().slice(0, 19).replaceAll(":", "-")}.json`;
    const stateFile = JSON.stringify({ app: "multivideo-casparcg", savedAt: new Date().toISOString(), version: 1, videos, selectedVideoId }, null, 2);

    if ("showSaveFilePicker" in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName,
          types: [{ description: "Multivideo layout", accept: { "application/json": [".json"] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(stateFile);
        await writable.close();
        setFileHandle(handle);
        setOpenedFileName(handle.name);
        setStatus(`Saved layout file: ${handle.name}`);
        return;
      } catch (error) {
        if (error.name === "AbortError") setStatus("Save cancelled.");
        else setStatus(`Could not save layout file: ${error.message}`);
        return;
      }
    }
    const blob = new Blob([stateFile], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = suggestedName;
    link.click();
    URL.revokeObjectURL(url);
    setOpenedFileName(suggestedName);
    setStatus(`Saved layout file: ${suggestedName} (Browser downloads)`);
  }

  async function actualSaveFile() {
    if (!fileHandle) return saveStateFile();
    setIsGlobalBusy(true);
    setStatus("Saving changes...");
    try {
      const stateFile = JSON.stringify({ app: "multivideo-casparcg", savedAt: new Date().toISOString(), version: 1, videos, selectedVideoId }, null, 2);
      const options = { mode: "readwrite" };
      if ((await fileHandle.queryPermission(options)) !== "granted") {
        if ((await fileHandle.requestPermission(options)) !== "granted") throw new Error("Write permission denied.");
      }
      const writable = await fileHandle.createWritable();
      await writable.write(stateFile);
      await writable.close();
      setStatus(`Saved changes to: ${fileHandle.name}`);
    } catch (error) {
      if (error.name === "AbortError") setStatus("Save cancelled.");
      else {
        setStatus(`Could not save changes: ${error.message}`);
        await saveStateFile();
      }
    } finally {
      setIsGlobalBusy(false);
    }
  }

  async function applyStateFile(parsedState, handle = null) {
    const nextVideos = normalizeSavedVideos(parsedState.videos);
    const nextSelectedVideoId = nextVideos.find((video) => video.id === parsedState.selectedVideoId)?.id || nextVideos[0].id;
    setVideos(nextVideos);
    setSelectedVideoId(nextSelectedVideoId);
    setFileHandle(handle);
    if (handle) setOpenedFileName(handle.name);
    setStatus(`Opened layout file: ${handle?.name || "Untitled"}`);
  }

  async function openStateFile(event) {
    if ("showOpenFilePicker" in window) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [{ description: "Multivideo layout", accept: { "application/json": [".json"] } }],
          multiple: false,
        });
        setIsGlobalBusy(true);
        const file = await handle.getFile();
        const text = await file.text();
        const parsedState = JSON.parse(text);
        await applyStateFile(parsedState, handle);
        setOpenedFileName(file.name);
        return;
      } catch (error) {
        if (error.name === "AbortError") setStatus("Open cancelled.");
        else setStatus(`Could not open layout file: ${error.message}`);
        return;
      } finally {
        setIsGlobalBusy(false);
      }
    }
    const file = event.target.files?.[0];
    if (!file) return;
    setIsGlobalBusy(true);
    try {
      const text = await file.text();
      const parsedState = JSON.parse(text);
      await applyStateFile(parsedState);
      setOpenedFileName(file.name);
    } catch (error) {
      setStatus(`Could not open layout file: ${error.message}`);
    } finally {
      if (event.target) event.target.value = "";
      setIsGlobalBusy(false);
    }
  }

  function handleStageAction(event, action, video) {
    event.stopPropagation();
    sendAction(action, video);
  }

  function dragBox(event) {
    const interaction = interactionRef.current;
    const nextBox = nextBoxFromPointerSnapped(event);
    if (!interaction || !nextBox) return;
    updateVideoBox(interaction.videoId, nextBox);
    const now = Date.now();
    if (now - lastLiveSendRef.current > 120) {
      const video = videos.find((item) => item.id === interaction.videoId);
      lastLiveSendRef.current = now;
      if (video) sendFill(video, nextBox, { quiet: true });
    }
  }

  function startDrag(event, video) {
    const startPointer = getStagePointer(event);
    if (!startPointer) return;
    setSelectedVideoId(video.id);
    interactionRef.current = { type: "move", videoId: video.id, startPointer, startBox: video.box };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function startResize(event, video, handle) {
    const startPointer = getStagePointer(event);
    if (!startPointer) return;
    event.stopPropagation();
    setSelectedVideoId(video.id);
    interactionRef.current = { type: "resize", videoId: video.id, handle, startPointer, startBox: video.box };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function endDrag(event) {
    const interaction = interactionRef.current;
    const nextBox = nextBoxFromPointerSnapped(event);
    if (interaction && nextBox) {
      const video = videos.find((item) => item.id === interaction.videoId);
      updateVideoBox(interaction.videoId, nextBox);
      if (video) sendFill(video, nextBox);
    }
    interactionRef.current = null;
  }

  return (
    <main className="page">
      <section className="panel">
        <aside className="mediaSidebar">
          <div className="mediaExplorerHeader">
            <div>
              <p>Media Explorer</p>
              {mediaRoot ? <p className="mediaRootPath">Root: {mediaRoot}</p> : <p className="mediaRootPath">Waiting for CasparCG media root</p>}
              {mediaWarning ? <p className="mediaRootPath">{mediaWarning}</p> : null}
            </div>
            <button type="button" className="refreshButton" onClick={() => connectAndRefreshMedia()} title="Refresh Media Tree">🔄</button>
          </div>
          <div className="mediaSearchContainer">
            <input type="text" placeholder="Search media..." className="mediaSearchInput" value={mediaSearchTerm} onChange={(e) => setMediaSearchTerm(e.target.value)} />
            {mediaSearchTerm && <button className="clearSearch" onClick={() => setMediaSearchTerm("")}>✕</button>}
          </div>
          <div className="mediaTreeContainer">
            {mediaTree ? (
              <TreeItem item={filteredMediaTree() || { name: "Media", type: "folder", children: {} }} level={0} path="Media" expandedFolders={expandedFolders} onToggle={toggleFolder} onDragStart={handleMediaDragStart} />
            ) : isMediaReady ? (
              <p className="noMedia">No media found.</p>
            ) : (
              <p className="noMedia">Connect to CasparCG to load media tree.</p>
            )}
          </div>
        </aside>

        <section className="surfaceSection">
          <div className="surfaceHeader">
            <div className="surfaceActions">
              <label className="channelSelector">
                <span>CH</span>
                <select value={channel} onChange={(e) => setChannel(e.target.value)}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((ch) => <option key={ch} value={String(ch)}>{ch}</option>)}
                </select>
              </label>
              <label className="snapToggle">
                <input type="checkbox" checked={useSnap} onChange={(e) => setUseSnap(e.target.checked)} />
                Snap to Grid
              </label>
              <div className="gridDimensionControls">
                <label className="dimensionInput">
                  <span>Cols</span>
                  <input type="number" min="1" max="100" value={columns} onChange={(e) => setColumns(Math.max(1, parseInt(e.target.value) || 1))} />
                </label>
                <label className="dimensionInput">
                  <span>Rows</span>
                  <input type="number" min="1" max="100" value={rows} onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))} />
                </label>
              </div>
              <button type="button" className="loopButton" onClick={playAllLoop} disabled={isGlobalBusy}>Play All Loop</button>
              <button type="button" className="stopAllButton" onClick={stopAll} disabled={isGlobalBusy}>Stop All</button>
              <button type="button" onClick={addVideoBlock} disabled={isGlobalBusy}>Add Video Block</button>
              <button type="button" onClick={deleteSelectedVideoBlock} disabled={isGlobalBusy || !selectedVideoId}>Delete Video Block</button>
              {fileHandle && <button type="button" onClick={actualSaveFile}>Save</button>}
              <button type="button" onClick={saveStateFile}>Save As File</button>
              <label className="fileActionButton" onClick={(e) => { if ("showOpenFilePicker" in window) { e.preventDefault(); openStateFile(); } }}>
                Open File
                <input className="hiddenFileInput" type="file" accept="application/json,.json" onChange={openStateFile} />
              </label>
              {openedFileName && (
                <div className="headerFilename">
                  <span>File:</span>
                  <strong>{openedFileName}</strong>
                </div>
              )}
            </div>
          </div>

          <div className="stageWrapper">
            <div className="topStrip" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }, (_, i) => <div key={i} className="stripLabel">{i + 1}</div>)}
            </div>
            <div className="leftStrip" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
              {Array.from({ length: rows }, (_, i) => <div key={i} className="stripLabel">{i + 1}</div>)}
            </div>
            <div className="stage" ref={stageRef} style={{ backgroundSize: `calc(100% / ${columns}) calc(100% / ${rows})` }}>
              {videos.map((video, index) => (
                <div
                  className={`videoBox ${selectedVideoId === video.id ? "selectedVideoBox" : ""}`}
                  key={video.id}
                  onPointerDown={(event) => startDrag(event, video)}
                  onPointerMove={dragBox}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onDragOver={handleVideoDragOver}
                  onDrop={(event) => handleVideoDrop(event, video.id)}
                  style={{
                    left: `${video.box.x * 100}%`,
                    top: `${video.box.y * 100}%`,
                    width: `${video.box.width * 100}%`,
                    height: `${video.box.height * 100}%`,
                    zIndex: selectedVideoId === video.id ? 5 : index + 1,
                  }}
                >
                  <span className="videoBoxLabel">
                    <strong>{video.label}</strong>
                    <small>{getClipName(video.clip)}</small>
                    {video.playing && <span className="playingIndicator">● Playing</span>}
                  </span>
                  <div className="videoBoxActions">
                    <button type="button" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => handleStageAction(e, "playLoop", video)}>Play</button>
                    <button type="button" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => handleStageAction(e, "stop", video)}>Stop</button>
                    <button type="button" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); deleteVideoBlock(video.id); }}>Delete</button>
                  </div>
                  {resizeHandles.map((handle) => (
                    <button aria-label={`${video.label} ${handle.label}`} className={`resizeHandle ${handle.name}`} key={handle.name} onPointerDown={(e) => startResize(e, video, handle.name)} type="button" />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '8px', background: '#233342', color: '#fff', fontSize: '0.8rem' }}>{status}</div>
        </section>
      </section>
    </main>
  );
}

function TreeItem({ item, level, path, expandedFolders, onToggle, onDragStart }) {
  const isExpanded = expandedFolders.has(path);
  const hasChildren = item.children && Object.keys(item.children).length > 0;

  return (
    <div className="treeItemWrapper">
      <div
        className={`treeItem ${item.type === "folder" ? "folderItem" : "fileItem"}`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        draggable={item.type === "file"}
        onDragStart={item.type === "file" ? (event) => onDragStart?.(event, item.path) : undefined}
        onClick={item.type === "folder" ? () => onToggle(path) : undefined}
      >
        <span className="expander">{item.type === "folder" ? (isExpanded ? "−" : "+") : ""}</span>
        <span className="itemIcon">{item.type === "folder" ? (isExpanded ? "📂" : "📁") : "🎬"}</span>
        <span className="itemName">{item.name}</span>
      </div>
      {item.type === "folder" && isExpanded && hasChildren && (
        <div className="treeSubItems">
          {Object.entries(item.children).map(([name, child]) => (
            <TreeItem key={name} item={child} level={level + 1} path={`${path}/${name}`} expandedFolders={expandedFolders} onToggle={onToggle} onDragStart={onDragStart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Leddisplay;
