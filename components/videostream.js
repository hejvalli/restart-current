"use client"
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import QuestionUI from './questionUI';
import DrawingCanvas from './drawingCanvas';

const VideoStream = () => {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [drawing, setDrawing] = useState('');
  const [data, setData] = useState(null);

  async function updateData(input) {
    try {
      const response = await fetch('/api/handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetchData() {
    const response = await fetch('/api/handler');
    const data = await response.json();
    setData(data);
  }


  useEffect(() => {
    fetchData();
  const intervalId = setInterval(fetchData, 1500); // Fetch data every 1.5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);
  
  const handleSaveDrawing = (dataUrl) => {
    setDrawing(dataUrl);
  };

  const handlePlay = () => {
    setIsVideoPaused(false);
  };

  const handlePause = () => {
    setIsVideoPaused(true);
  };
  const handleProgress = (state) => {
    if(state.playedSeconds > data?.stopTime) {
      setIsVideoPaused(true);
    }
  };

  useEffect(() => {
    handlePlay();
  }, [data?.url]);

  useEffect(()=>{
    updateData({drawing})
  }, [drawing])

 return (
    <div>
  <ReactPlayer
        url={data?.url}
        playing={!isVideoPaused}
        controls={true}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
      />
      {isVideoPaused && (<div><QuestionUI />  <div>
      <DrawingCanvas onSave={handleSaveDrawing} />
      {drawing && (
        <div>
          <h2>Saved Drawing:</h2>
          <img src={drawing} alt="Saved Drawing" />
        </div>
      )}
    </div></div>)}
    </div>
  );
};

export default VideoStream;