"use client";
// import './page1.css'

import { fontLists, fixdata } from "./common.js";
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import NewWindow from "./components/NewWindow";
import NewWindowforfullscreen from "./components/NewWindowforfullscreen";
import Scroll from "./components/Scroll";
import io from "socket.io-client";
import Casparcg from "./Casparcg";
import TTS from './components/TTS.jsx'
import ScrollView from './components/ScrollView';
import mammoth from 'mammoth';
import 'react-tabs/style/react-tabs.css';
import { UseSocketControls } from "./components/UseSocketControls";

const scrollHeight = 460;
const scrollWidth = 782;//scrollHeight * 16 / 9=782.22;

const dummyScriptid = 200502071223160;

export default function Home() {
  const [ip, setIp] = useState(null)
  const [fontList, setFontList] = useState(fontLists);
  const [currentFont, setCurrentFont] = useState("Times New Roman");
  const [isRTL, setIsRTL] = useState(false);
  const [bgColor, setbgColor] = useState('#000000');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [fontBold, setFontBold] = useState(false);
  const socketRef = useRef(null);

  const [singleScript, setSingleScript] = useState(false);
  const [file, setFile] = useState(null);
  const storyLines = useSelector((state) => state.storyLinesReducer.storyLines);
  const crossedLines = useSelector((state) => state.crossedLinesReducer.crossedLines);
  const [startPosition, setStartPosition] = useState(355);
  const [speed, setSpeed] = useState(0);
  const [slugs, setSlugs] = useState([]);
  const [currentSlug, setCurrentSlug] = useState(0);
  const [currentSlugName, setCurrentSlugName] = useState("");
  const [allContent, setAllContent] = useState([]);
  const [newsReaderText, setNewsReaderText] = useState("Continue...");
  const [showClock, setShowClock] = useState(true);
  const [newPosition, setNewPosition] = useState(startPosition);
  const [tempSpeed, setTempSpeed] = useState(0);
  const [loggedPositions, setLoggedPositions] = useState(new Set());
  const [currentStoryNumber, setCurrentStoryNumber] = useState(-1);
  const [showNewWindow, setShowNewWindow] = useState(false);
  const [showNewWindow2, setShowNewWindow2] = useState(false);
  const [showNewWindow3, setShowNewWindow3] = useState(false);
  const [doubleClickedPosition, setDoubleClickedPosition] = useState(0);
  const [fontSize, setFontSize] = useState(39);
  const [stopAfterStoryChange, setStopAfterStoryChange] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [keyPressed, setKeyPressed] = useState('');
  const newWindowRef = useRef(null);
  const newWindowRef2 = useRef(null);
  const newWindowRef3 = useRef(null);
  const textRef = useRef(null);
  const contentRefs = useRef([]);

  const textRef2 = useRef(null);
  const contentRefs2 = useRef([]);

  const [usedStory, setUsedStory] = useState([]);
  const iframeRef = useRef(null);
  const textarea1Ref = useRef(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const scrollContainerStyle = useMemo(() => ({
    position: 'relative',
    height: 1080,
    width: 1920,
    overflow: 'hidden',
    backgroundColor: bgColor,
    color: '#fff',
  }), [bgColor]);

  const scrollingTextStyle = useMemo(() => ({
    position: 'absolute',
    transform: `translateY(${newPosition}px)`,
    willChange: 'transform',
    width: 1720,
    padding: '0 100px',
    whiteSpace: 'pre-wrap',
    fontSize: parseInt(fontSize * 2.5),
    lineHeight: `${Math.floor(fontSize * 1.5 * 2.5)}px`,
  }), [newPosition, fontSize]);
  useEffect(() => {
    if (!window.location.origin.includes('vercel')) {
      fetch('/api/fonts')
        .then((res) => res.json())
        .then((data) => setFontList(data.fonts))
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    const addr = `${window.location.origin}/ReactCasparClient/SpeechToText`;
    if (iframeRef.current) {
      iframeRef.current.src = addr;
    }
  }, [])

  useEffect(() => {

    const handleFocus = (event) => {
      if (textarea1Ref.current) textarea1Ref.current.style.borderColor = 'red';
      event.target.style.borderColor = 'red';
      setFocusedInput(event.target);
    };
    const inputs = [textarea1Ref.current];
    inputs.forEach((input) => {
      if (input) {
        input.addEventListener('focus', handleFocus);
      }
    });
    const messageHandler = (event) => {
      if (
        event.data &&
        typeof event.data === 'object' &&
        'replace' in event.data &&
        'value' in event.data
      ) {
        if (focusedInput) {

          if (event.data.replace) {
            const updatedSlugs = [...slugs];
            updatedSlugs[currentSlug] = { ...updatedSlugs[currentSlug], Script: event.data.value }; // Modify the object at index i
            setSlugs(updatedSlugs);
          } else {
            const updatedSlugs = [...slugs];
            updatedSlugs[currentSlug] = { ...updatedSlugs[currentSlug], Script: focusedInput.value + event.data.value }; // Modify the object at index i
            setSlugs(updatedSlugs);
          }
        }
      }

      if (event.data === 'request_textarea_content' && focusedInput) {
        event.source.postMessage({ textareaValue: focusedInput.value }, event.origin);
      }
    };
    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [focusedInput, file, currentSlug, slugs]);





  const handleTextareaKeyDown = (event) => {
    if (event.code === 'Space') {
      event.stopPropagation(); // Prevent spacebar from bubbling to document
    }
  };

  // Read from localStorage ONLY ONCE when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("WebTelePrompter");
    if (savedData) {
      const dataObject = JSON.parse(savedData);
      if (dataObject.fontSize) {
        setFontSize(dataObject.fontSize);
      }
      if (dataObject.startPosition !== undefined) {
        setStartPosition(dataObject.startPosition);
        setNewPosition(dataObject.startPosition);
      }
      if (dataObject.isRTL !== undefined) {
        setIsRTL(dataObject.isRTL);
      }
      if (dataObject.bgColor !== undefined) {
        setbgColor(dataObject.bgColor);
      }
      if (dataObject.fontColor !== undefined) {
        setFontColor(dataObject.fontColor);
      }
      if (dataObject.fontBold !== undefined) {
        setFontBold(dataObject.fontBold);
      }
      if (dataObject.currentFont !== undefined) {
        setCurrentFont(dataObject.currentFont);
      }
    }
  }, []); // ⬅️ Run only once on mount

  // Save to localStorage whenever relevant state changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const savedData = localStorage.getItem("WebTelePrompter");
      const dataObject = savedData ? JSON.parse(savedData) : {};

      localStorage.setItem(
        "WebTelePrompter",
        JSON.stringify({
          ...dataObject,
          fontSize,
          startPosition,
          isRTL,
          bgColor,
          fontColor,
          fontBold,
          currentFont,
        })
      );
    }, 500); // shorter debounce is usually enough

    return () => clearTimeout(timeoutId); // cleanup previous timeout if values change rapidly
  }, [fontSize, startPosition, isRTL, bgColor, fontColor, fontBold, currentFont]);



  const handleCloseNewWindow = () => {
    setShowNewWindow(false);
  };
  const handleCloseNewWindow2 = () => {
    setShowNewWindow2(false);
  };
  const handleCloseNewWindow3 = () => {
    setShowNewWindow3(false);
  };
  const onclickSlug = (val, i) => {
    if (i < slugs.length) {
      setCurrentSlug(i);
      setCurrentSlugName(val.SlugName);
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setSpeed((val) => Number(val) + 1);
          break;
        case "ArrowDown":
          setSpeed((val) => val - 1);
          break;
        case " ":
          if (speed === 0) {
            setSpeed(tempSpeed);
          } else {
            setTempSpeed(speed);
            setSpeed(0);
          }
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [speed, tempSpeed]);

  const fetchAllContent = useCallback((slicedSlugs, startNumber) => {
    if (!Array.isArray(slicedSlugs) || slicedSlugs.length === 0) {
      return;
    }

    const data1 = new Array(slicedSlugs.length * 3);
    try {
      slicedSlugs.forEach((slug, i) => {
        if ((slug.DropStory === 0 || slug.DropStory === 2) && slug?.Approval) {
          data1[i * 3] = `${startNumber + i + 1} ${slug?.SlugName}`;
          data1[i * 3 + 1] = slug.Script ? `${slug.Script.trim().split('$$$$')[0]}` : '';
          data1[i * 3 + 2] = `--------------`;
        } else {
          data1[i * 3] = `${startNumber + i + 1} ${!(slug?.DropStory === 0 || slug?.DropStory === 2) ? "Story Dropped" : "Story UnApproved"
            }`;
          data1[i * 3 + 1] = ` `;
          data1[i * 3 + 2] = ``;
        }
      });

      setAllContent(data1.filter((item) => item !== undefined));
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }, [setAllContent]);


  const handleDoubleClick = useCallback((i) => {
    if (i === 0) {
      setUsedStory(val => [...val, slugs[0]?.ScriptID]);
    }

    if (i < slugs.length) {
      const newSlugs = slugs.slice(i);
      fetchAllContent(newSlugs, i);
      setSpeed(0);
      setCurrentStoryNumber(i + 1);
      const newLoggedPositions = new Set();
      setLoggedPositions(newLoggedPositions);
      setDoubleClickedPosition(i);
      setNewPosition(startPosition);
    }
  }, [
    slugs,
    fetchAllContent,
    setSpeed,
    setCurrentStoryNumber,
    setLoggedPositions,
    setDoubleClickedPosition,
    setNewPosition,
    setUsedStory,
    startPosition,
  ]);

  const fromStart = () => {
    setCurrentSlug(0);
    handleDoubleClick(0);
    if (slugs.length > 0) {
      setCurrentSlugName(slugs[0].SlugName);
    }
  };

  const previous = () => {
    setCurrentSlug((prevSlug) => {
      let newIndex = prevSlug - 1;
      if (newIndex < 0) {
        newIndex = slugs.length - 1;
      }
      while (((slugs[newIndex]?.DropStory === 1) || (slugs[newIndex]?.DropStory) === 3) || (!slugs[newIndex]?.Approval)) {
        newIndex--;
        if (newIndex < 0) {
          newIndex = slugs.length - 1;
        }
      };
      handleDoubleClick(newIndex);
      setCurrentSlugName(slugs[newIndex].SlugName);
      return newIndex;
    });
  };

  const next = useCallback(() => {
    setCurrentSlug((prevSlug) => {
      let newIndex = prevSlug + 1;
      if (newIndex >= slugs.length) {
        newIndex = 0;
      }
      while (((slugs[newIndex]?.DropStory === 1) || (slugs[newIndex]?.DropStory) === 3) || (!slugs[newIndex]?.Approval)) {
        newIndex++;
        if (newIndex >= slugs.length) {
          newIndex = 0;
        }
      };

      setCurrentSlugName(slugs[newIndex].SlugName);
      handleDoubleClick(newIndex);
      return newIndex;
    });
  }, [slugs, handleDoubleClick]);

  useEffect(() => {
    if (stopAfterStoryChange) {
      setSpeed(0);
    }
  }, [currentStoryNumber, stopAfterStoryChange]);


  useEffect(() => {
    const slug = slugs[currentStoryNumber - 1];
    if (!slug || slug.DropStory === 1 || slug.DropStory === 3) return;

    const newScriptID = slug.ScriptID;
    if (!newScriptID || usedStory.includes(newScriptID)) return;

    setUsedStory(prev => [...prev, newScriptID]);
  }, [currentStoryNumber, slugs, usedStory]);


  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.emit('allContent', allContent);
  }, [allContent])

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('speed', speed);
  }, [speed]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('setStartPosition', startPosition);
  }, [startPosition]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('setShowClock', showClock);
  }, [showClock]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('setNewsReaderText', newsReaderText);
  }, [newsReaderText]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('scrollContainerStyle', scrollContainerStyle);

  }, [scrollContainerStyle]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('scrollingTextStyle', scrollingTextStyle);
  }, [scrollingTextStyle]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('fontColor', fontColor);
  }, [fontColor]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('rtl', isRTL);
  }, [isRTL]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('fontBold', fontBold);
  }, [fontBold]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('currentFont', currentFont);
  }, [currentFont]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    if (!slugs) return;
    socket.emit('setSlugs', slugs);
  }, [slugs]);

  const dropStoryValue = (slug) => {
    if (slug.DropStory === 0) {
      return 3;
    }
    if (slug.DropStory === 1) {
      return 2;
    }
    if (slug.DropStory === 2) {
      return 3;
    }
    if (slug.DropStory === 3) {
      return 2;
    }
  }

  const readFile = useCallback((selectedFile) => {
    if (!selectedFile) return;

    const reader = new FileReader();
    let bb = [];

    if (selectedFile.type !== 'text/plain') {
      // DOCX file handling
      reader.onload = function (event) {
        const arrayBuffer = event.target.result;

        mammoth.extractRawText({ arrayBuffer: arrayBuffer })
          .then(function (result) {
            const content = result.value;
            const lines = content.split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");

            if (singleScript) {
              bb = [{
                ...fixdata,
                ScriptID: dummyScriptid,
                SlugName: selectedFile.name,
                Script: content
              }];
            } else {
              bb = lines.map((line, index) => {
                const words = line.split(/\s+/).slice(0, 3).join(" ");
                return {
                  ...fixdata,
                  ScriptID: dummyScriptid + index,
                  SlugName: words || `Slug${index + 1}`,
                  Script: line
                };
              });
            }

            setSlugs(bb);
          })
          .catch(function (err) {
            console.error("Error reading docx:", err);
          });
      };

      reader.readAsArrayBuffer(selectedFile);

    } else {
      // TXT file handling
      reader.onload = (e) => {
        const content = e.target.result;
        const hasZXZX = /ZXZX/i.test(content);

        if (hasZXZX) {
          const aa = content.split(/ZCZC/i);
          bb = aa.map((item, index) => {
            const [SlugName, Script] = item.split(/ZXZX/i).map(str => str.trim().replace(/\r?\n/g, ''));
            return {
              ...fixdata,
              ScriptID: dummyScriptid + index,
              Approval: SlugName.includes('(Story UnApproved)') ? 0 : 1,
              DropStory: SlugName.includes('(Story Dropped)') ? 1 : 0,
              SlugName,
              Script
            };
          });
        } else {
          const lines = content.split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");

          if (singleScript) {
            bb = [{
              ...fixdata,
              ScriptID: dummyScriptid,
              SlugName: selectedFile.name,
              Script: content
            }];
          } else {
            bb = lines.map((line, index) => {
              const words = line.split(/\s+/).slice(0, 3).join(" ");
              return {
                ...fixdata,
                ScriptID: dummyScriptid + index,
                SlugName: words || `Slug${index + 1}`,
                Script: line
              };
            });
          }
        }

        setSlugs(bb);
      };

      reader.readAsText(selectedFile);
    }
  }, [setSlugs, singleScript]);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);  // Save the file to state
    readFile(selectedFile);
  };


  const saveScript = () => {
    const content = (slugs.map((slug) => slug.Script)).join('\n'); // Join array items into text
    const blob = new Blob([content], { type: 'text/plain' }); // Create a Blob
    const url = URL.createObjectURL(blob); // Create a download URL

    const link = document.createElement('a');
    link.href = url;
    link.download = 'scripts.txt'; // Download as 'scripts.txt'
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Clean up the URL
  }

  const nextRef = useRef();
  nextRef.current = next;

  const previousRef = useRef();
  previousRef.current = previous;
  const fromStartRef = useRef();
  fromStartRef.current = fromStart;
  useEffect(() => {
    socketRef.current = io();
    const socket = socketRef.current;
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED! from main page", socket.id);
    });

    socket.on('connect_error', (error) => {
      console.log(error)
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('speed2', data => {
      setSpeed(data);
    });

    socket.on('next2', () => {
      nextRef.current?.();
    });
    socket.on('previous2', () => {
      previousRef.current?.();
    });

    socket.on('fromStart2', () => {
      fromStartRef.current?.();
    });
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("speed2");
      socket.off("next2");
      socket.off("fromStart2");
      socket.disconnect();
    }
  }, [])

  useEffect(() => {
    fetch('https://localhost:9000/getlocalip')
      .then(res => res.json())
      .then(data => setIp(data.ip))
  }, [])

  useEffect(() => {
    fetch('/ReactCasparClient/example.txt')
      .then(res => {
        // Clone the response to read both text and blob
        const resClone = res.clone();
        return Promise.all([res.text(), resClone.blob()]);
      })
      .then(([content, blob]) => {
        const file = new File([blob], 'example.txt', { type: blob.type });
        setFile(file);
        let bb = [];
        const lines = content.split(/\r?\n/).map(line => line.trim()).filter(line => line !== ""); // Remove empty lines

        bb = lines.map((line, index) => {
          const words = line.split(/\s+/).slice(0, 3).join(" "); // Extract first three words
          return {
            ...fixdata,
            ScriptID: dummyScriptid + index,
            SlugName: words || `Slug${index + 1}`, // Fallback if line is empty
            Script: line
          };
        });
        setSlugs(bb);
        const i = 0;
        const newSlugs = bb.slice(i);
        fetchAllContent(newSlugs, i);
        setSpeed(0);
        setCurrentStoryNumber(i + 1);
        const newLoggedPositions = new Set();
        setLoggedPositions(newLoggedPositions);
        setDoubleClickedPosition(i);
        setNewPosition(startPosition);
        setCurrentSlug(i);
        setCurrentSlugName(bb[i].SlugName);

      })
      .catch((err) => console.error('Error reading file:', err));
  }, [fetchAllContent, startPosition]);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleDoubleClick(parseInt(keyPressed) - 1);
        setKeyPressed('');
      }
      else {
        if (!isNaN(event.key)) {
          setKeyPressed(val => val + event.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [keyPressed, handleDoubleClick]);


  useEffect(() => {
    readFile(file);
  }, [singleScript, file, readFile]);
  const handleBgColorChange = (color) => {
    setbgColor(color);
    socketRef.current?.emit('bgColor', color);
  };

  const handleFontColorChange = (color) => {
    setFontColor(color);
    socketRef.current?.emit('fontColor', color);
  };

  return (
    <div style={{ overflow: "hidden", backgroundColor: '#e0e0d2', }}>
      <div style={{ display: "flex" }}>
        <div style={{ height: '100vh' }}>
          <div>
            <label>
              {
                <input
                  type="file"
                  accept=".txt,.docx"
                  onChange={handleFileChange}
                />
              }
            </label>
            {slugs?.length} Slugs

          </div>
          <div
            style={{
              minWidth: 348,
              maxWidth: 348,
              maxHeight: 725,
              minHeight: 725,
              overflow: "scroll",
            }}
          >
            {slugs?.map((val, i) => (
              <div
                key={i}
                onClick={() => {
                  onclickSlug(val, i);
                }}
                onDoubleClick={() => handleDoubleClick(i)}
                style={{
                  backgroundColor:
                    currentSlug === i
                      ? "green"
                      : (val.DropStory === 1 || val.DropStory === 3)
                        ? "#FF999C"
                        : !val.Approval
                          ? "red"
                          : "#a1a178",
                  margin: 10,
                }}
              >
                <input
                  title={(val.DropStory === 0 || val.DropStory === 2) ? 'Uncheck to Drop' : 'Check to Include'}
                  type="checkbox"
                  checked={val.DropStory === 0 || val.DropStory === 2}
                  onChange={() => {
                    const updatedSlugs = [...slugs]; // Create a copy of the array
                    updatedSlugs[i] = { ...updatedSlugs[i], DropStory: dropStoryValue(val) }; // Modify the object at index i
                    setSlugs(updatedSlugs); // Update state with the modified array
                  }}
                />
                <span title={'ScriptID:-' + val.ScriptID} style={{ fontSize: 30, }}>{i + 1}</span>{usedStory.includes(val.ScriptID) ? '✅' : ' '}
                <label
                  title={
                    (val.DropStory === 1 || val.DropStory === 3)
                      ? "Story Dropped"
                      : !val.Approval
                        ? "Story UnApproved"
                        : ""
                  }
                  style={{ cursor: "pointer" }}
                >
                  {val.SlugName}{" "}
                </label>{" "}
                <br />
              </div>
            ))}
          </div>
          <button onClick={() => { setUsedStory([]) }}>Reset used story status</button>
          <div>

            <div>
              {
                <label>
                  <input
                    checked={singleScript}
                    type="checkbox"
                    onChange={() => setSingleScript((val) => {
                      return !val
                    })}
                  />
                  <span>Single Script</span>
                </label>
              }
            </div>
          </div>
        </div>
        <div style={{ height: '100vh' }}>
          <div
            style={{
              border: "1px solid red",
              marginBottom: 10,
              minWidth: scrollWidth,
              maxWidth: scrollWidth,
            }}
          >
            <Casparcg
              scrollingTextStyle={scrollingTextStyle}
              scrollContainerStyle={scrollContainerStyle}
              currentFont={currentFont}
              fontBold={fontBold}
              isRTL={isRTL}
              bgColor={bgColor}
              fontColor={fontColor}
              slugs={slugs}
              allContent={allContent}
              startPosition={startPosition}
              fontSize={fontSize * 2.5}
              doubleClickedPosition={doubleClickedPosition}
              newPosition={newPosition}
              currentStoryNumber={currentStoryNumber}
              storyLines={storyLines}
              crossedLines={crossedLines}
              speed={speed}
              showClock={showClock}
              newsReaderText={newsReaderText}
              setSpeed={setSpeed}
            />
          </div>
          <div style={{ border: "1px solid red", marginBottom: 10 }}>
            <span>Quick Methods: </span>
            <button
              onClick={() => {
                fromStart();
              }}
            >
              From Start
            </button>
            <button onClick={previous}>Previous</button>
            <button onClick={next}>Next</button>
            <button
              onClick={() => {
                const lastIndex = slugs.length - 1;
                setCurrentSlug(lastIndex);
                handleDoubleClick(lastIndex);
                setCurrentSlugName(slugs[lastIndex].SlugName);
              }}
            >
              Go to Last
            </button>
            <label>
              {" "}
              <input
                checked={stopAfterStoryChange}
                type="checkbox"
                onChange={() => setStopAfterStoryChange((val) => !val)}
              />{" "}
              <span>Stop After Story</span>
            </label>

          </div>
          <div style={{ border: "1px solid red", marginBottom: 10 }}>
            <div>
              <span>News Reader Messages:</span>
              <button onClick={() => setNewsReaderText("Go Fast...")}>
                Go fast
              </button>
              <button onClick={() => setNewsReaderText("Wait...")}>Wait</button>
              <button onClick={() => setNewsReaderText(".")}>Clear</button>
              <button onClick={() => setShowClock((val) => !val)}>
                {showClock ? "Hide Clock" : "Show Clock"}
              </button>

              <button onClick={() => setNewsReaderText("Go Slow...")}>
                Go Slow
              </button>
              <button onClick={() => setNewsReaderText("Continue...")}>
                Continue...
              </button>
              <button onClick={() => setNewsReaderText("Stop...")}>Stop</button>
            </div>
          </div>
          <div
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: `${fontSize * 1.5}px`,
              width: scrollWidth,
              minHeight: 600,
              maxHeight: 600,
              position: "absolute",
              top: 150 + 28,
              overflow: "scroll",
              padding: '0 25px',
              boxSizing: 'border-box',
              whiteSpace: 'pre-wrap',
            }}
          >
            {slugs && slugs[currentSlug] && (
              <div
                style={{
                  backgroundColor: "blue",
                  color: "yellow",
                  width: 702,
                  fontFamily: 'Times New Roman',
                }}
              >
                {currentSlug + 1} {currentSlugName}
              </div>
            )}
            <div>
              <textarea
                ref={textarea1Ref}
                dir={isRTL ? 'rtl' : 'ltr'}
                onKeyDown={handleTextareaKeyDown}
                value={slugs?.[currentSlug]?.Script ?? ''}
                style={{
                  backgroundColor: '#e0e0d2',
                  fontSize: `${fontSize}px`,
                  lineHeight: `${fontSize * 1.5}px`,
                  width: 702.22,
                  height: 510,
                  resize: 'none',
                  fontFamily: currentFont,
                  fontWeight: fontBold ? 'bold' : 'normal',
                }}
                onChange={(e) => {
                  const updatedSlugs = [...slugs]; // Create a copy of the array
                  updatedSlugs[currentSlug] = { ...updatedSlugs[currentSlug], Script: e.target.value }; // Modify the object at index i
                  setSlugs(updatedSlugs);
                }}
              />
            </div>
          </div>
          <div style={{ fontSize: 16, fontWeight: "normal", position: 'absolute', top: 770, }}>
            <div><button onClick={saveScript}>Save Script</button></div>

            <TTS content={slugs ? slugs[currentSlug]?.Script : ''} />
            <iframe
              ref={iframeRef}
              width="750"
              height="40"
              allow="microphone"
              title="External Content"
            ></iframe>
          </div>
        </div>
        {/* Third column */}
        <div style={{ height: '100vh' }}>
          <div>
            <Scroll
              scrollContainerStyle={scrollContainerStyle}
              scrollingTextStyle={scrollingTextStyle}
              currentFont={currentFont}
              fontBold={fontBold}
              isRTL={isRTL}
              fontColor={fontColor}
              scrollWidth={scrollWidth}
              scrollHeight={scrollHeight}
              fontSize={fontSize * 2.5}
              setCurrentSlug={setCurrentSlug}
              newPosition={newPosition}
              setNewPosition={setNewPosition}
              doubleClickedPosition={doubleClickedPosition}
              textRef={textRef}
              contentRefs={contentRefs}
              startPosition={startPosition}
              allContent={allContent}
              showClock={showClock}
              loggedPositions={loggedPositions}
              setLoggedPositions={setLoggedPositions}
              currentStoryNumber={currentStoryNumber}
              setCurrentStoryNumber={setCurrentStoryNumber}
              speed={speed}
              slugs={slugs}
              newsReaderText={newsReaderText}
              setSpeed={setSpeed}
            />
            {showNewWindow && (
              <NewWindow
                onClose={handleCloseNewWindow}
                newWindowRef={newWindowRef}
                scrollWidth={scrollWidth}
                scrollHeight={scrollHeight}
              >
                <ScrollView contentRefs={contentRefs2} textRef={textRef2} scrollContainerStyle={scrollContainerStyle} scrollingTextStyle={scrollingTextStyle} currentFont={currentFont} fontBold={fontBold} isRTL={isRTL} fontColor={fontColor} allContent={allContent} currentStoryNumber={currentStoryNumber} crossedLines={crossedLines} storyLines={storyLines} slugs={slugs} newsReaderText={newsReaderText} showClock={showClock} startPosition={startPosition} />
              </NewWindow>
            )}
            {showNewWindow2 && (
              <NewWindow
                onClose={handleCloseNewWindow2}
                newWindowRef={newWindowRef2}
                scrollWidth={scrollWidth}
                scrollHeight={scrollHeight}
              >
                <ScrollView contentRefs={contentRefs2} textRef={textRef2} scrollContainerStyle={scrollContainerStyle} scrollingTextStyle={scrollingTextStyle} currentFont={currentFont} fontBold={fontBold} isRTL={isRTL} fontColor={fontColor} allContent={allContent} currentStoryNumber={currentStoryNumber} crossedLines={crossedLines} storyLines={storyLines} slugs={slugs} newsReaderText={newsReaderText} showClock={showClock} startPosition={startPosition} />
              </NewWindow>
            )}

            {showNewWindow3 && (
              <NewWindowforfullscreen
                onClose={handleCloseNewWindow3}
                newWindowRef={newWindowRef3}
                scrollWidth={scrollWidth}
                scrollHeight={scrollHeight}
              >
                <ScrollView contentRefs={contentRefs2} textRef={textRef2} scrollContainerStyle={scrollContainerStyle} scrollingTextStyle={scrollingTextStyle} currentFont={currentFont} fontBold={fontBold} isRTL={isRTL} fontColor={fontColor} allContent={allContent} currentStoryNumber={currentStoryNumber} crossedLines={crossedLines} storyLines={storyLines} slugs={slugs} newsReaderText={newsReaderText} showClock={showClock} startPosition={startPosition} />
              </NewWindowforfullscreen>
            )}
          </div>

          <div
            onContextMenu={(e) => {
              e.preventDefault();
              if (speed === 0) {
                setSpeed(tempSpeed);
              } else {
                setTempSpeed(speed);
                setSpeed(0);
              }
            }}
            style={{
              textAlign: "center",
              minWidth: scrollWidth,
              minHeight: 305,
              maxHeight: 305,
              overflow: "scroll",
              position: "absolute",
              top: 475,
            }}
          >
            <div>
              <button onClick={() => setSpeed(1)}> Start with Speed 1</button>
              <button onClick={() => setSpeed(2)}> 2</button>
              <button onClick={() => setSpeed(3)}> 3</button>
              <button onClick={() => setSpeed(4)}> 4</button>
              <button onClick={() => setSpeed(5)}> 5</button>
              <button onClick={() => setSpeed(6)}>6</button>
              <button onClick={() => setSpeed(7)}>7</button>
              <button title='Increase speed by 1' onClick={() => setSpeed((val) => parseInt(val) + 1)}>
                ++1
              </button>
              <button
                onClick={() => {
                  if (speed === 0) {
                    setSpeed(tempSpeed);
                  } else {
                    setTempSpeed(speed);
                    setSpeed(0);
                  }
                }}
              >
                {" "}
                {speed ? "Pause" : "Resume"}
              </button>
              <button onClick={() => setSpeed(-1)}> -1</button>
              <button onClick={() => setSpeed(-2)}> -2</button>
              <button onClick={() => setSpeed(-3)}> -3</button>
              <button onClick={() => setSpeed(-4)}> -4</button>
              <button onClick={() => setSpeed(-5)}> -5</button>
              <button onClick={() => setSpeed(-6)}>-6</button>
              <button onClick={() => setSpeed(-7)}>-7</button>
              <button title='Decrease speed by 1' onClick={() => setSpeed((val) => val - 1)}>--1</button>
            </div>
            <div>
              Speed: {speed}
              <input
                type="range"
                min={-20}
                max={20}
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                style={{ width: "60%" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              Right Click to Stop and Play

            </div>
            <div style={{ textAlign: "left" }}>
              <label>
                {" "}
                <input
                  type="checkbox"
                  checked={isRTL}
                  onChange={(e) => setIsRTL(e.target.checked)}
                />
                <b><span>Right to left for urdu</span></b>
              </label>
            </div>
            <div style={{ textAlign: "left" }}>
              <label>
                {" "}
                <input
                  type="checkbox"
                  checked={fontBold}
                  onChange={(e) => setFontBold(e.target.checked)}
                />
                <b><span>fontBold</span></b>
              </label>
            </div>
            <div style={{ textAlign: "left" }}>
              <b> Font: </b>{" "}
              <select onChange={(e) => {
                setCurrentFont(e.target.value);
              }}
                onKeyDown={(e) => {
                  if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                    e.stopPropagation();
                  }
                }}
                value={currentFont}>
                {fontList.map((val, i) => {
                  return (
                    <option key={i} value={val}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              For HDMI or VGA output <button
                onClick={() => {
                  if (showNewWindow) {
                    newWindowRef.current.close();
                  }
                  setShowNewWindow(!showNewWindow);
                }}
              >
                {showNewWindow ? "Close New Window" : "Open New Window"}
              </button>

              <button
                onClick={() => {
                  if (showNewWindow2) {
                    newWindowRef2.current.close();
                  }
                  setShowNewWindow2(!showNewWindow2);
                }}
              >
                {showNewWindow2 ? "Close New Window2" : "Open New Window2"}
              </button>

              <button
                onClick={() => {
                  if (showNewWindow3) {
                    newWindowRef3.current.close();
                  }
                  setShowNewWindow3(!showNewWindow3);
                }}
              >
                {showNewWindow3 ? "Close Full Screen" : "Open Full Screen"}
              </button>
              <button onClick={() => {
                window.open('/WebSocketOutput', '', `width=${scrollWidth},height=${scrollHeight + 40}`);
                setTimeout(() => {

                  const socket = socketRef.current;
                  if (!socket) return;
                  socket.emit('setCurrentStoryNumber', currentStoryNumber);
                  socket.emit('storyLines', storyLines);
                  socket.emit('crossedLines', crossedLines);
                  socket.emit('allContent', allContent);
                  socket.emit('setSlugs', slugs);
                  socket.emit('setStartPosition', startPosition);
                  socket.emit('setShowClock', showClock);
                  socket.emit('setNewsReaderText', newsReaderText);
                  socket.emit('rtl', isRTL);
                  socket.emit('fontColor', fontColor);
                  socket.emit('fontBold', fontBold);
                  socket.emit('currentFont', currentFont);
                  socket.emit('scrollContainerStyle', scrollContainerStyle);
                  socket.emit('scrollingTextStyle', scrollingTextStyle);

                }, 3000);
              }}>WebSocketOutput</button>
            </div>
            <button onClick={() => setShowSettings(val => !val)}>{showSettings ? 'Hide Setting' : 'Show Setting'}</button>
            <div style={{ display: showSettings ? '' : 'none' }}>
              <div>
                Font Size:
                <input
                  type="number"
                  value={fontSize}
                  style={{ width: 40 }}
                  onChange={(e) => setFontSize(e.target.value)}
                />
                Start Position:
                <input
                  type="number"
                  value={startPosition}
                  style={{ width: 40 }}
                  onChange={(e) => {
                    setStartPosition(e.target.value);
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <UseSocketControls speed={speed} setSpeed={setSpeed} tempSpeed={tempSpeed} setTempSpeed={setTempSpeed} fromStart={fromStart} handleDoubleClick={handleDoubleClick} slugs={slugs} currentStoryNumber={currentStoryNumber} onclickSlug={onclickSlug} previous={previous} next={next} />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ marginRight: '1rem' }}>
                  Bg Color:
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => handleBgColorChange(e.target.value)}
                    style={{ marginLeft: '0.5rem' }}
                  />
                </label>

                <label>
                  Font Color:
                  <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => handleFontColorChange(e.target.value)}
                    style={{ marginLeft: '0.5rem' }}
                  />
                </label>
                <button onClick={() => window.open(`https://${ip}:10000/ReactCasparClient/WebTelePrompter/m`)}>Mobile controllerr</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
