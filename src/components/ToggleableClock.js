import React, { useState, useEffect } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

const PuzzleClock = () => {
  const [time, setTime] = useState(new Date());
  const [isAnalog, setIsAnalog] = useState(true); // Clock type toggle
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false); // Puzzle status
  const [userInput, setUserInput] = useState(""); // User's answer
  const [puzzle, setPuzzle] = useState(""); // Current puzzle question
  const [puzzleAnswer, setPuzzleAnswer] = useState(null); // Correct answer to the puzzle

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to generate a new random puzzle
  const generatePuzzle = () => {
    const num1 = Math.floor(Math.random() * 20) + 1; // Random number 1-20
    const num2 = Math.floor(Math.random() * 20) + 1; // Random number 1-20
    setPuzzle(`${num1} + ${num2}`); // Puzzle question
    setPuzzleAnswer(num1 + num2); // Correct answer
    setUserInput(""); // Reset input field
    setIsPuzzleSolved(false); // Lock toggle
  };

  // Run puzzle generation initially
  useEffect(() => {
    generatePuzzle();
  }, []);

  // Puzzle answer checker
  const checkPuzzle = () => {
    if (parseInt(userInput) === puzzleAnswer) {
      setIsPuzzleSolved(true);
      alert("🎉 Correct! You can now toggle the clock.");
    } else {
      alert("❌ Incorrect. Try again!");
    }
  };

  // Toggle between Analog and Digital clock
  const toggleClock = () => {
    setIsAnalog((prev) => !prev);
    generatePuzzle(); // Generate a new puzzle after toggling
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Arial', sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "30px", color: "#343a40" }}>Puzzle Clock</h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <button
          onClick={toggleClock}
          disabled={!isPuzzleSolved}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: isPuzzleSolved ? "#28a745" : "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: isPuzzleSolved ? "pointer" : "not-allowed",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          Switch to {isAnalog ? "Digital" : "Analog"} Clock
        </button>

        {/* Puzzle Section */}
        {!isPuzzleSolved && (
          <div>
            <h2 style={{ marginBottom: "20px", color: "#495057" }}>
              Solve the puzzle to unlock the toggle:
            </h2>
            <p style={{ marginBottom: "20px", fontSize: "18px", color: "#6c757d" }}>
              {puzzle} = ?
            </p>
            <input
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your answer"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ced4da",
                marginBottom: "20px",
                outline: "none",
              }}
            />
            <button
              onClick={checkPuzzle}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Submit
            </button>
          </div>
        )}

        {/* Display Clock */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {isAnalog ? (
            <Clock value={time} />
          ) : (
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {time.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PuzzleClock;
