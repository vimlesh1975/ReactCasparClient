'use client';

import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { endpoint } from '../common';

export default function Home({ scrollingTextStyle, scrollContainerStyle, currentFont, fontBold, isRTL, fontColor, slugs, allContent, startPosition, currentStoryNumber, storyLines, crossedLines, showClock, newsReaderText, setSpeed }) {

  const [fliped, setFliped] = useState(false);
  const [socketcurrentstory, setSocketcurrentstory] = useState('not set');

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('https://localhost:9000');

    socketRef.current.on('connect', () => {
      console.log('SOCKET CONNECTED! from caparcg page', socketRef.current.id);
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on('connect', () => {
      console.log('SOCKET CONNECTED! form casparcg connection', socketRef.current.id);
    });
    socketRef.current.on('ServerConnectionStatus2', (msg) => {
    });

    socketRef.current.on('currentStoryBroadcast', (data) => {
      setSocketcurrentstory(data);
    });

    socketRef.current.on('connect_error', () => {
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socketRef.current?.off('connect');
      socketRef.current?.off('ServerConnectionStatus2');
      socketRef.current?.off('currentStoryBroadcast');
      socketRef.current?.off('ServerConnectconnect_errorionStatus2');
      socketRef.current?.off('disconnect');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const playOnSecondChannelinFlippedMode = () => {
    endpoint(`play 2-97 route://1`
    );
    endpoint(`mixer 2-97 fill 1 0 -1 1`
    );
  }

  return (
    <div>
      <div>
        <div>
          For Casparcg Output
          <button onClick={() => setSpeed(1)}> Start with Speed 1</button>
          {socketcurrentstory.ScriptID}
        </div>
        <div>
          Method 1:
          <button
            onClick={() => {
              endpoint(
                `Play 1-97 [html] "https://localhost:10000/ReactCasparClient/WebTelePrompter/CasparcgOutput`,
              );

              playOnSecondChannelinFlippedMode();
              setTimeout(() => {
                socketRef.current.emit('setCurrentStoryNumber', currentStoryNumber);
                socketRef.current.emit('storyLines', storyLines);
                socketRef.current.emit('crossedLines', crossedLines);
                socketRef.current.emit('allContent', allContent);
                socketRef.current.emit('setSlugs', slugs);
                socketRef.current.emit('setStartPosition', startPosition);
                socketRef.current.emit('setShowClock', showClock);
                socketRef.current.emit('setNewsReaderText', newsReaderText);
                socketRef.current.emit('rtl', isRTL);
                socketRef.current.emit('fontColor', fontColor);
                socketRef.current.emit('fontBold', fontBold);
                socketRef.current.emit('currentFont', currentFont);
                socketRef.current.emit('scrollContainerStyle', scrollContainerStyle);
                socketRef.current.emit('scrollingTextStyle', scrollingTextStyle);

              }, 5000);
            }
            }
          >
            Normal Method
          </button>


        </div>
        <div>
          Method 2:
          <button
            onClick={() => {
              endpoint(`play 1-97 [html] https://localhost:10000/ReactCasparClient/webrtc.html`,
              );
              playOnSecondChannelinFlippedMode();
            }
            }
          >
            Screen Capture Method
          </button>


        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <button
              onClick={() => {
                endpoint(`stop 1-97`,
                );
                endpoint(`mixer 1-97 clear`,
                );
              }
              }
            >
              Stop Caspar Output
            </button>
            <button
              onClick={() => {
                endpoint(!fliped ? 'mixer 1-97 fill 1 0 -1 1' : 'mixer 1-97 fill 0 0 1 1',
                );
                setFliped(val => !val);
              }}
            >
              Toggle Flip
            </button>
          </div>
          <div >
            <button onClick={() => {
              endpoint(`play 2-97 route://1`
              );
              endpoint(`mixer 2-97 fill 0 0 1 1`
              );
            }}>Play 2nd channel </button>
            <button onClick={() => {
              playOnSecondChannelinFlippedMode();
            }}>Play 2nd channel flip mode</button>
            <button onClick={() => {
              endpoint(`stop 2-97`
              );
              endpoint(`mixer 2-97 clear`
              );
            }}>Stop 2nd Channel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
