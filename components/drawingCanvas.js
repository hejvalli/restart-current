import React, { useRef, useEffect } from 'react';

const DrawingCanvas = ({ onSave }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500; // Adjust the width as needed
    canvas.height = 500; // Adjust the height as needed
    canvas.style.border = '1px solid black';

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    contextRef.current = context;
  }, []);

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const handleMouseMove = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const handleMouseUp = () => {
    const canvas = canvasRef.current;
    onSave(canvas.toDataURL());
  };
  const handleSave = () => {
    const canvas = canvasRef.current;
    onSave(canvas.toDataURL());
  };
  return (
    <div>
<canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
    <button onClick={handleSave}>Save Drawing</button>

    </div>

  );
};

export default DrawingCanvas;
