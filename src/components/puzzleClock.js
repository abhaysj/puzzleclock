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

    // Randomly choose a puzzle type
    const puzzleTypes = [
      "sequence",
      "arithmetic",
      "prime",
      "factor",
      "modulo",
      "sqrt",
      "cubeRoot",
      "percentage",
      "missing-number",
      "decimal-to-binary"
    ];
    const randomPuzzleType =
      puzzleTypes[Math.floor(Math.random() * puzzleTypes.length)];

    let puzzleText = "";
    let answer = "";

    // Switch based on the chosen puzzle type
    switch (randomPuzzleType) {
      case "sequence":
        // Generate a sequence and ask for the next number
        const sequenceStart = Math.floor(Math.random() * 5) + 1;
        const sequence = Array.from(
          { length: 5 },
          (_, i) => sequenceStart * Math.pow(2, i)
        ); // Doubling sequence

        puzzleText = `What is the next number in the series: ${sequence.join(
          ", "
        )}?`;
        answer = sequence[sequence.length - 1] * 2; // Next number in the doubling sequence
        break;

      case "arithmetic":
        // Randomly choose an arithmetic operation
        const operations = ["+", "-", "*", "/"];
        const randomOperation =
          operations[Math.floor(Math.random() * operations.length)];

        switch (randomOperation) {
          case "+":
            puzzleText = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
          case "-":
            puzzleText = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
          case "*":
            puzzleText = `${num1} * ${num2}`;
            answer = num1 * num2;
            break;
          case "/":
            // Ensure no division by zero
            const divisor = num2 === 0 ? 1 : num2;
            puzzleText = `${num1} / ${divisor}`;
            answer = parseFloat((num1 / divisor).toFixed(2)); // Rounded for better UX
            break;
          default:
            break;
        }
        break;

      case "prime":
        // Check if the number is prime
        const primeNum = Math.floor(Math.random() * 50) + 1;
        const isPrime = (n) => {
          for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
          }
          return n > 1;
        };

        puzzleText = `Is ${primeNum} a prime number? (yes/no)`;
        answer = isPrime(primeNum) ? "yes" : "no";
        break;

      case "factor":
        // Get all factors of a number
        const factorNum = Math.floor(Math.random() * 30) + 1;
        const getFactors = (n) => {
          let factors = [];
          for (let i = 1; i <= n; i++) {
            if (n % i === 0) {
              factors.push(i);
            }
          }
          return factors.join(", ");
        };

        puzzleText = `What are the factors of ${factorNum}? (comma-separated)`;
        answer = getFactors(factorNum);
        break;

      case "modulo":
        // Modulo operation
        const num3 = Math.floor(Math.random() * 20) + 1;
        const num4 = Math.floor(Math.random() * 20) + 1;
        puzzleText = `What is the remainder when ${num3} is divided by ${num4}?`;
        answer = num3 % num4;
        break;

      case "sqrt":
        // Square root of a number
        const sqrtNum = Math.floor(Math.random() * 10) + 1; // Ensure perfect square
        puzzleText = `What is the square root of ${sqrtNum * sqrtNum}?`;
        answer = sqrtNum;
        break;

      case "cubeRoot":
        // Cube root of a number
        const cubeNum = Math.floor(Math.random() * 10) + 1; // Ensure perfect cube
        puzzleText = `What is the cube root of ${cubeNum * cubeNum * cubeNum}?`;
        answer = cubeNum;
        break;

      case "percentage":
        // Percentage problem
        const total = Math.floor(Math.random() * 100) + 1; // Random total
        const percentage = Math.floor(Math.random() * 100) + 1; // Random percentage
        puzzleText = `What is ${percentage} percentage of ${total}?`;
        answer = parseFloat(((total * percentage) / 100).toFixed(2)); // Rounded for better UX
        break;

      case "missing-number":
        // Generate a series of numbers with one missing, and ask the user to guess the missing number
        const series = [2, 4, 8, 16]; // Example series
        const missingIndex = Math.floor(Math.random() * series.length);
        const missingNumber = series[missingIndex];
        series[missingIndex] = "?"; // Replace the missing number with a question mark

        puzzleText = `Find the missing number in the series: ${series.join(
          ", "
        )}`;
        answer = missingNumber;
        break;

      case "decimal-to-binary":
        // Ask the user to convert a decimal number to binary
        const decimalNumber = Math.floor(Math.random() * 100) + 1;
        puzzleText = `What is the binary representation of ${decimalNumber}?`;
        answer = decimalNumber.toString(2);
        break;

      default:
        break;
    }

    setPuzzle(puzzleText); // Set the puzzle question
    setPuzzleAnswer(answer); // Set the correct answer
    setUserInput(""); // Reset input field
    setIsPuzzleSolved(false); // Lock toggle until puzzle is solved
  };

  // Run puzzle generation initially
  useEffect(() => {
    generatePuzzle();
  }, []);

  // Puzzle answer checker
  const checkPuzzle = () => {
    const normalizedAnswer =
      typeof puzzleAnswer === "number"
        ? parseFloat(userInput)
        : userInput.trim().toLowerCase();
    const correctAnswer =
      typeof puzzleAnswer === "number"
        ? puzzleAnswer
        : puzzleAnswer.toString().toLowerCase();

    if (normalizedAnswer === correctAnswer) {
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
            <p
              style={{
                marginBottom: "20px",
                fontSize: "18px",
                color: "#6c757d",
              }}
            >
              {puzzle} = ?
            </p>
            <input
              type="text"
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
            <button
              onClick={generatePuzzle}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#ffc107",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                marginTop: "10px",
              }}
            >
              Change Puzzle
            </button>
          </div>
        )}

        {/* Clock Display */}
        {/* Clock Display */}
        {isAnalog ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Clock value={time} />
          </div>
        ) : (
          <h2 style={{ marginTop: "20px", fontSize: "24px", color: "#212529" }}>
            {time.toLocaleTimeString()}
          </h2>
        )}
      </div>
    </div>
  );
};

export default PuzzleClock;
