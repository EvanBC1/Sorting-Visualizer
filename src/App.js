import React from 'react'

function Canvas() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, 2 * Math.PI);
    ctx.fill();

  });

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={625}
    />
  )
}

export default Canvas