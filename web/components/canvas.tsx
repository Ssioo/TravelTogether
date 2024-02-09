'use client'

import React, { useRef, useEffect, useState } from "react";

const CURSOR_COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

const TogetherCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursors, setCursors] = useState<{ [key: string]: { x: number, y: number } }>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const uuid = Math.random().toString(36).substring(7);
    
    const ws = new WebSocket("ws://localhost:9990");
    
    canvas.addEventListener("mousemove", (event) => {
      const { offsetX, offsetY } = event;
      ws.send(JSON.stringify({ 
        x: offsetX, 
        y: offsetY, 
        uuid: uuid, 
        eventType: "pos" 
      }));
    });

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.eventType === "pos") {
        cursors[data.uuid] = { x: data.x, y: data.y };
        setCursors({ ...cursors });
      } else if (data.eventType === "close") {
        delete cursors[data.uuid];
        setCursors({ ...cursors });
      }
    }

    return () => {
      // send close event to server
      ws.send(JSON.stringify({ eventType: "close", uuid: uuid }));
      ws.close();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let cursor_idx = 0;
    for (const [uuid, cursor] of Object.entries(cursors)) {
      // set fillRect color
      ctx.fillStyle = CURSOR_COLORS[cursor_idx++];
      ctx.fillRect(cursor.x, cursor.y, 10, 10);
    }
  }, [cursors]);

  return (
    <div>
      <canvas ref={canvasRef} id="canvas" width="800" height="600"></canvas>
    </div>
  );
};

export default TogetherCanvas;
