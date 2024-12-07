import React, { useState, useEffect } from "react";
import "./AnalogClock.css"; // CSS for styling the clock

function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate hand rotations
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondHandRotation = seconds * 6; // 360° / 60 seconds
  const minuteHandRotation = minutes * 6 + seconds * 0.1; // 360° / 60 minutes + small second adjustment
  const hourHandRotation = hours * 30 + minutes * 0.5; // 360° / 12 hours + small minute adjustment

  return (
    <div className="clock">
      <div className="clock-face">
        {/* Hour Hand */}
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${hourHandRotation}deg)` }}
        />
        {/* Minute Hand */}
        <div
          className="hand minute-hand"
          style={{ transform: `rotate(${minuteHandRotation}deg)` }}
        />
        {/* Second Hand */}
        <div
          className="hand second-hand"
          style={{ transform: `rotate(${secondHandRotation}deg)` }}
        />
      </div>
    </div>
  );
}

export default AnalogClock;
