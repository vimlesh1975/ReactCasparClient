'use client';

import { useState, useRef, useEffect } from 'react';
import { list_voices } from '../common'

export default function Home({ content }) {
  const [language, setLanguage] = useState('mr-IN');
  const [name, setName] = useState('mr-IN-Standard-A');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const audioRef = useRef(null);
  const languages = list_voices;
  const languagesLoading = false;

  const handleSpeak = async () => {
    if (!content?.trim()) {
      return;
    }
    setLoading(true);
    setAudioUrl('');
    try {
      // const response = await fetch('/api/speak', {
      const response = await fetch('https://teleprompter-chi.vercel.app/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content, languageCode: language, name }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      alert('Failed to generate speech.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  return (
    <div style={{ padding: '10px' }}>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="language-select">Lang:</label>
        <select
          id="language-select"
          value={name}
          onChange={(e) => {
            const selectedVoice = languages.find((lang) => lang.name === e.target.value);
            setLanguage(selectedVoice.code);
            setName(selectedVoice.name);
            setAudioUrl('');
          }}
          style={{ marginLeft: 5 }}
        >
          {languagesLoading ? (
            <option>Loading languages...</option>
          ) : (
            languages.map((lang, index) => (
              <option key={index} value={lang.name}>
                {`${lang.name} (${lang.ssmlGender}, ${lang.code})`}
              </option>
            ))
          )}
        </select>




        {/* Auto Play Option */}
        <label htmlFor="autoPlay">
          <input
            type="checkbox"
            id="autoPlay"
            checked={autoPlay}
            onChange={() => setAutoPlay((val) => !val)}
          />
          Auto Play
        </label>

        {/* Speak Button */}
        <button onClick={handleSpeak} style={{ padding: '10px 20px' }} disabled={loading}>
          {loading ? 'Loading...' : 'Speak'}
        </button>
        Speed: {playbackSpeed.toFixed(1)}x
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={playbackSpeed}
          onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
          style={{ width: 100 }}
        />
      </div>
      {/* Audio Player and Controls */}
      {audioUrl && (
        <div style={{ marginTop: 5 }}>
          <audio style={{ width: 300, height: 30 }}
            controls
            src={audioUrl}
            autoPlay={autoPlay}
            ref={audioRef}
          ></audio>
        </div>
      )}
    </div>
  );
}
