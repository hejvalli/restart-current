"use client"
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import QuestionUI from './questionUI';
import DrawingCanvas from './drawingCanvas';

const VideoStream = () => {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [drawing, setDrawing] = useState('');
  
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