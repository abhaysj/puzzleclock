import React, { useState, useEffect } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import "./Pendulum.css";

const PuzzleClock = () => {
  const [time, setTime] = useState(new Date());
  const [isAnalog, setIsAnalog] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [puzzle, setPuzzle] = useState("");
  const [puzzleAnswer, setPuzzleAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in seconds
  const [isRunning, setIsRunning] = useState(true); // Stopwatch active status

  const [pendulumConfig, setPendulumConfig] = useState({
    showPendulum: false,
    containerBg: "#ffffff",
    rodColor: "#000",
    bobColor: "#d32f2f",
  });

  const maxPuzzles = 9; // Define maximum puzzles

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Generate puzzle
  const generatePuzzle = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    function reverseString(str) {
      return str.split("").reverse().join("");
    }

    function getNextFibonacci(num) {
      let a = 0,
        b = 1;
      while (b <= num) {
        [a, b] = [b, a + b];
      }
      return b; // The first Fibonacci number greater than `num`
    }

    function isPrime(num) {
      if (num <= 1) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    }

    const puzzles = [
      { question: `Reverse the word "React".`, answer: reverseString("React") },
      {
        question: `What is the next Fibonacci number after ${num1}?`,
        answer: getNextFibonacci(num1),
      },
      {
        question: `Is ${num1} a prime number?`,
        answer: isPrime(num1) ? "Yes" : "No",
      },
      {
        question: `What is ${num1} raised to the power of ${num2}?`,
        answer: Math.pow(num1, num2),
      },
      { question: `${num1} + ${num2}`, answer: num1 + num2 },
      { question: `What is the square root of ${num1 * num1}?`, answer: num1 },
      { question: `${num1} * ${num2}`, answer: num1 * num2 },
      { question: `What is ${num1} % ${num2}?`, answer: num1 % num2 },
      { question: `Convert ${num1} to binary.`, answer: num1.toString(2) },
    ];

    // Ensure the puzzleIndex is within bounds
    if (puzzleIndex < puzzles.length) {
      setPuzzle(puzzles[puzzleIndex].question);
      setPuzzleAnswer(puzzles[puzzleIndex].answer);
      setUserInput("");
      setIsPuzzleSolved(false);
    } else {
      setPuzzle("🎉 All puzzles solved!");
      setPuzzleAnswer(null);
    }
  };

  useEffect(() => {
    generatePuzzle();
  }, [puzzleIndex]);

  const checkPuzzle = () => {
    if (puzzleAnswer === null) return;

    const normalizedAnswer =
      typeof puzzleAnswer === "number"
        ? parseFloat(userInput)
        : userInput.trim().toLowerCase();
    const correctAnswer =
      typeof puzzleAnswer === "number"
        ? puzzleAnswer
        : puzzleAnswer.toString().toLowerCase();

    if (normalizedAnswer === correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
      setIsPuzzleSolved(true);
      alert("🎉 Correct!");
    } else {
      setIncorrectAnswers((prev) => prev + 1);
      alert("❌ Incorrect. Try again!");
    }
  };

  const proceedToNextLevel = () => {
    if (isPuzzleSolved) {
      if (puzzleIndex === 0) setIsAnalog(true);
      else if (puzzleIndex === 1)
        setPendulumConfig((prev) => ({ ...prev, showPendulum: true }));
      else if (puzzleIndex === 2)
        setPendulumConfig((prev) => ({ ...prev, containerBg: "#ffeb3b" }));
      else if (puzzleIndex === 3)
        setPendulumConfig((prev) => ({ ...prev, rodColor: "#007bff" }));
      else if (puzzleIndex === 4)
        setPendulumConfig((prev) => ({ ...prev, bobColor: "#4caf50" }));
      else if (puzzleIndex === 5)
        setPendulumConfig((prev) => ({ ...prev, bobColor: "orange" }));
      else if (puzzleIndex === 6)
        setPendulumConfig((prev) => ({ ...prev, rodColor: "red" }));
      else if (puzzleIndex === 7)
        setPendulumConfig((prev) => ({ ...prev, containerBg: "greenyellow" }));
      else if (puzzleIndex === 8)
        setPendulumConfig((prev) => ({ ...prev, bobColor: "lightblue" }));

      setPuzzleIndex((prev) => prev + 1);
      if (puzzleIndex == maxPuzzles-1) {
        setIsRunning(false); // Stop the stopwatch
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#343a40" }}>Puzzle Clock</h1>

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "20px", // Space between the clock and pendulum
          }}
        >
          {isAnalog ? (
            <Clock value={time} />
          ) : (
            <h2 style={{ fontSize: "24px", color: "#212529" }}>
              {time.toLocaleTimeString()}
            </h2>
          )}

          {pendulumConfig.showPendulum && (
            <div
              className="pendulum-container"
              style={{
                backgroundColor: pendulumConfig.containerBg,
                height: "120px",
                width: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                marginTop: "-1px",
                marginRight: "90px",
                position: "relative",
                flexDirection: "row",
              }}
            >
              <div
                className="pendulum-rod"
                style={{
                  backgroundColor: pendulumConfig.rodColor,
                  width: "5px",
                  height: "150px",
                  marginBottom: "20px",
                  marginTop: "0px",
                  marginRight: "5px",
                  marginLeft: "0.5px",
                }}
              >
                <div
                  className="pendulum-bob"
                  style={{
                    backgroundColor: pendulumConfig.bobColor,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h2>Solve the puzzle:</h2>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>{puzzle}</p>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your answer"
          style={{
            padding: "10px",
            width: "100%",
            fontSize: "16px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={checkPuzzle}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        <button
          onClick={proceedToNextLevel}
          disabled={!isPuzzleSolved || puzzleIndex >= maxPuzzles}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor:
              isPuzzleSolved && puzzleIndex < maxPuzzles
                ? "#28a745"
                : "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor:
              isPuzzleSolved && puzzleIndex < maxPuzzles
                ? "pointer"
                : "not-allowed",
          }}
        >
          Next
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>
          Stopwatch: {Math.floor(elapsedTime / 60)}:
          {elapsedTime % 60 < 10 ? "0" : ""}
          {elapsedTime % 60}
        </h3>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>Correct Answers: {correctAnswers}</p>
        <p>Incorrect Answers: {incorrectAnswers}</p>
      </div>
    </div>
  );
};

export default PuzzleClock;
