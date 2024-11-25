import React, { useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css'; // Import the default styling

const MyClock = () => {
  const [time, setTime] = useState(new Date());

  // Update the time every second
  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h1>React Clock</h1>
      <Clock value={time} />
    </div>
  );
};

export default MyClock;
