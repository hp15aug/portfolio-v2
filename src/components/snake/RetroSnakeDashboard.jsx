"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

// SnakeLoader Component
const SnakeLoader = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING");
  const [dots, setDots] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    "INITIALIZING",
    "LOADING GRAPHICS",
    "SETTING UP GAME",
    "PREPARING SNAKE",
    "READY TO PLAY",
  ];

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const totalSteps = duration / interval;
    let step = 0;

    const progressInterval = setInterval(() => {
      step++;
      const progress = (step / totalSteps) * 100;
      setLoadingProgress(progress);

      // Update loading text based on progress
      const textStep = Math.floor((progress / 100) * (loadingSteps.length - 1));
      setCurrentStep(textStep);
      setLoadingText(loadingSteps[textStep]);

      if (progress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          onLoadComplete();
        }, 200);
      }
    }, interval);

    return () => clearInterval(progressInterval);
  }, [onLoadComplete]);

  // Animated dots effect
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 400);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-lg mx-auto text-center">
        {/* Animated Snake Icon */}
        <div className="mb-8 flex justify-center">
          <div
            className="w-16 h-16 bg-[#7CFC00] flex items-center justify-center text-black font-bold text-2xl border-2 border-[#00ff19] animate-pulse"
            style={{
              imageRendering: "pixelated",
              animation: "pulse 1s infinite",
            }}
          >
            🐍
          </div>
        </div>

        {/* Title */}
        <h1
          className="select-none mb-12 leading-none"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "3rem",
            letterSpacing: "0.08em",
            color: "#7CFC00",
            textShadow:
              "2px 2px 0 #000, 4px 4px 0 rgba(0,0,0,0.6), -1px -1px 0 #000",
            WebkitFontSmoothing: "none",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          SNAKE
        </h1>

        {/* Loading Container */}
        <div className="bg-[#081010] border-4 border-[#00ff19] p-8 rounded-sm shadow-2xl">
          {/* Loading Text */}
          <p
            className="mb-8 select-none"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.875rem",
              color: "#7CFC00",
              letterSpacing: "0.05em",
              minHeight: "1.5em",
            }}
          >
            {loadingText}
            {dots}
          </p>

          {/* Progress Bar Container */}
          <div className="mb-6">
            <div
              className="w-full h-6 border-2 border-[#00ff19] bg-[#000800] relative overflow-hidden"
              style={{ imageRendering: "pixelated" }}
            >
              {/* Progress Bar Fill */}
              <div
                className="h-full bg-[#7CFC00] transition-all duration-100 ease-out relative"
                style={{
                  width: `${loadingProgress}%`,
                  background:
                    "repeating-linear-gradient(90deg, #7CFC00 0, #7CFC00 4px, #00ff19 4px, #00ff19 8px)",
                }}
              >
                {/* Scanning line effect */}
                <div
                  className="absolute right-0 top-0 w-1 h-full bg-[#ffffff] opacity-80"
                  style={{
                    animation: loadingProgress < 100 ? "none" : "none",
                  }}
                />
              </div>
            </div>

            {/* Progress Percentage */}
            <p
              className="mt-3 text-[#c8ffb0] select-none"
              style={{
                fontFamily: "monospace",
                fontSize: "0.875rem",
              }}
            >
              {Math.floor(loadingProgress)}%
            </p>
          </div>

          {/* Loading Steps Indicator */}
          <div className="flex justify-center space-x-2">
            {loadingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 border border-[#00ff19] transition-all duration-200 ${
                  index <= currentStep ? "bg-[#7CFC00]" : "bg-transparent"
                }`}
                style={{ imageRendering: "pixelated" }}
              />
            ))}
          </div>

          {/* Retro loading message */}
          <p
            className="mt-6 select-none opacity-60"
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              color: "#c8ffb0",
            }}
          >
            <span style={{ opacity: 0.8 }}>Retro Console</span>
            <span className="mx-2">•</span>
            <span style={{ opacity: 0.6 }}>Loading v1.0</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default function RetroSnakeGame() {
  const [gameState, setGameState] = useState("loading"); // 'loading', 'menu', 'playing', 'paused', 'gameOver', 'settings'
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [settings, setSettings] = useState({
    speed: "Normal",
    difficulty: "Classic",
  });

  const gameLoopRef = useRef();
  const canvasRef = useRef();

  const btnVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.04 },
    tap: { scale: 0.96 },
  };

  // Handle loading completion
  const handleLoadingComplete = () => {
    setGameState("menu");
  };

  // Generate random food position
  const generateFood = useCallback((currentSnake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
      };
    } while (
      currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
  }, []);

  // Start game
  const startGame = useCallback(() => {
    resetGame();
    setGameState("playing");
  }, [resetGame]);

  // Game loop
  const gameLoop = useCallback(() => {
    setSnake((currentSnake) => {
      if (gameState !== "playing") return currentSnake;

      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= CANVAS_SIZE / GRID_SIZE ||
        head.y < 0 ||
        head.y >= CANVAS_SIZE / GRID_SIZE
      ) {
        setGameState("gameOver");
        return currentSnake;
      }

      // Check self collision
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameState("gameOver");
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          setHighScore((current) => Math.max(current, newScore));
          return newScore;
        });
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameState, generateFood]);

  // Handle keyboard input
  const handleKeyPress = useCallback(
    (e) => {
      if (gameState === "playing") {
        switch (e.key) {
          case "ArrowUp":
          case "w":
          case "W":
            e.preventDefault();
            setDirection((prev) => (prev.y === 0 ? { x: 0, y: -1 } : prev));
            break;
          case "ArrowDown":
          case "s":
          case "S":
            e.preventDefault();
            setDirection((prev) => (prev.y === 0 ? { x: 0, y: 1 } : prev));
            break;
          case "ArrowLeft":
          case "a":
          case "A":
            e.preventDefault();
            setDirection((prev) => (prev.x === 0 ? { x: -1, y: 0 } : prev));
            break;
          case "ArrowRight":
          case "d":
          case "D":
            e.preventDefault();
            setDirection((prev) => (prev.x === 0 ? { x: 1, y: 0 } : prev));
            break;
          case " ":
            e.preventDefault();
            setGameState("paused");
            break;
        }
      } else if (gameState === "paused" && e.key === " ") {
        e.preventDefault();
        setGameState("playing");
      }
    },
    [gameState]
  );

  // Set up game loop
  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(gameLoop, speed);
    } else {
      clearInterval(gameLoopRef.current);
    }

    return () => clearInterval(gameLoopRef.current);
  }, [gameLoop, gameState, speed]);

  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    ctx.fillStyle = "#7CFC00";
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Snake head - brighter
        ctx.fillStyle = "#00ff19";
      } else {
        ctx.fillStyle = "#7CFC00";
      }
      ctx.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE - 1,
        GRID_SIZE - 1
      );
    });

    // Draw food
    ctx.fillStyle = "#ff4d4d";
    ctx.fillRect(
      food.x * GRID_SIZE,
      food.y * GRID_SIZE,
      GRID_SIZE - 1,
      GRID_SIZE - 1
    );
  }, [snake, food]);

  const MenuScreen = () => (
    <main className="min-h-screen w-full bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-lg mx-auto text-center">
        <div className="w-12 h-12 mx-auto mb-4 bg-[#7CFC00] flex items-center justify-center text-black font-bold text-xl">
          🐍
        </div>

        <h1
          className="select-none mb-10 leading-none"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "2.75rem",
            letterSpacing: "0.08em",
            color: "#7CFC00",
            textShadow:
              "2px 2px 0 #000, 4px 4px 0 rgba(0,0,0,0.6), -1px -1px 0 #000",
            WebkitFontSmoothing: "none",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          SNAKE
        </h1>

        <div className="bg-[#081010] border-4 border-[#00ff19] p-6 rounded-sm shadow-2xl">
          <p
            className="mb-6 select-none"
            style={{
              fontFamily: "monospace",
              fontSize: "1rem",
              color: "#c8ffb0",
            }}
          >
            <span style={{ opacity: 0.9 }}>Retro Console</span>
            <span className="mx-2">•</span>
            <span style={{ opacity: 0.6 }}>v1.0</span>
          </p>

          {highScore > 0 && (
            <p className="mb-4 text-[#ffff00] font-mono">
              High Score: {highScore}
            </p>
          )}

          <div className="flex flex-col items-center">
            <button
              onClick={startGame}
              className="w-56 h-16 mb-4 flex items-center justify-center border-4 border-[#00ff19] select-none hover:scale-105 active:scale-95 transition-transform"
              style={{
                background:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 4px)",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "1rem",
                color: "#001b00",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                boxShadow: "inset 6px 6px 0 rgba(0,0,0,0.6)",
                backgroundColor: "#8fffa0",
              }}
            >
              Play
            </button>

            <button
              onClick={() => setGameState("settings")}
              className="w-56 h-16 mb-4 flex items-center justify-center border-4 border-[#00d084] select-none hover:scale-105 active:scale-95 transition-transform"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "1rem",
                color: "#f0f9f0",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                background: "linear-gradient(180deg,#0b3a2f,#083b2b)",
                boxShadow: "inset 4px 4px 0 rgba(0,0,0,0.6)",
              }}
            >
              Settings
            </button>
            <motion.button
              variants={btnVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => router.push("/pc")}
              className="w-56 h-16 mt-2 flex items-center justify-center border-4 border-[#ff4d4d] select-none"
              aria-label="Quit"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "1rem",
                color: "#fff5f5",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                background: "linear-gradient(180deg,#7a0000,#4b0000)",
                boxShadow: "inset 4px 4px 0 rgba(0,0,0,0.7)",
              }}
            >
              Quit
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
  const router = useRouter();
  const GameScreen = () => (
    <main className="min-h-screen w-full bg-black flex items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex items-center justify-between w-full max-w-md">
          <div className="text-[#7CFC00] font-mono text-lg">Score: {score}</div>
          <div className="text-[#ffff00] font-mono text-lg">
            High: {highScore}
          </div>
        </div>

        <div className="border-4 border-[#00ff19] bg-[#001100] p-2">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="block"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-[#c8ffb0] font-mono text-sm mb-2">
            Use WASD or Arrow Keys to move • SPACE to pause
          </p>
          <button
            onClick={() => setGameState("menu")}
            className="px-4 py-2 bg-[#7a0000] border-2 border-[#ff4d4d] text-[#fff5f5] font-mono text-sm hover:scale-105 active:scale-95 transition-transform"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </main>
  );

  const PauseScreen = () => (
    <main className="min-h-screen w-full bg-black bg-opacity-90 flex items-center justify-center p-6">
      <div className="text-center">
        <h2
          className="text-[#7CFC00] mb-6"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "2rem",
            textShadow: "2px 2px 0 #000",
          }}
        >
          PAUSED
        </h2>
        <p className="text-[#c8ffb0] font-mono mb-4">Press SPACE to continue</p>
        <button
          onClick={() => setGameState("menu")}
          className="px-4 py-2 bg-[#7a0000] border-2 border-[#ff4d4d] text-[#fff5f5] font-mono text-sm hover:scale-105 active:scale-95 transition-transform"
        >
          Quit to Menu
        </button>
      </div>
    </main>
  );

  const GameOverScreen = () => (
    <main className="min-h-screen w-full bg-black flex items-center justify-center p-6">
      <div className="text-center">
        <h2
          className="text-[#ff4d4d] mb-6"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "2rem",
            textShadow: "2px 2px 0 #000",
          }}
        >
          GAME OVER
        </h2>
        <div className="mb-6">
          <p className="text-[#7CFC00] font-mono text-xl mb-2">
            Score: {score}
          </p>
          {score === highScore && score > 0 && (
            <p className="text-[#ffff00] font-mono text-sm mb-2">
              NEW HIGH SCORE!
            </p>
          )}
          <p className="text-[#c8ffb0] font-mono text-sm">
            High Score: {highScore}
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={startGame}
            className="w-48 h-12 flex items-center justify-center border-2 border-[#00ff19] bg-[#8fffa0] text-[#001b00] font-mono font-bold hover:scale-105 active:scale-95 transition-transform"
          >
            PLAY AGAIN
          </button>
          <button
            onClick={() => setGameState("menu")}
            className="w-48 h-12 flex items-center justify-center border-2 border-[#ff4d4d] bg-[#7a0000] text-[#fff5f5] font-mono font-bold hover:scale-105 active:scale-95 transition-transform"
          >
            MAIN MENU
          </button>
        </div>
      </div>
    </main>
  );

  const SettingsScreen = () => (
    <main className="min-h-screen w-full bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto text-center">
        <h2
          className="text-[#7CFC00] mb-8"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "1.5rem",
            textShadow: "2px 2px 0 #000",
          }}
        >
          SETTINGS
        </h2>

        <div className="bg-[#081010] border-4 border-[#00ff19] p-6 rounded-sm">
          <div className="mb-6">
            <p className="text-[#c8ffb0] font-mono mb-3">Game Speed</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Slow", value: 200 },
                { label: "Normal", value: 150 },
                { label: "Fast", value: 100 },
                { label: "Extreme", value: 50 },
              ].map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => {
                    setSpeed(value);
                    setSettings((prev) => ({ ...prev, speed: label }));
                  }}
                  className={`w-full p-2 border-2 font-mono text-sm transition-all ${
                    settings.speed === label
                      ? "border-[#00ff19] bg-[#001100] text-[#7CFC00]"
                      : "border-[#004400] bg-[#000800] text-[#888888] hover:border-[#007700] hover:text-[#aaaaaa]"
                  }`}
                >
                  {label} {settings.speed === label && "✓"}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setGameState("menu")}
            className="w-full h-12 border-2 border-[#ff4d4d] bg-[#7a0000] text-[#fff5f5] font-mono font-bold hover:scale-105 active:scale-95 transition-transform"
          >
            BACK TO MENU
          </button>
        </div>
      </div>
    </main>
  );

  switch (gameState) {
    case "loading":
      return <SnakeLoader onLoadComplete={handleLoadingComplete} />;
    case "playing":
      return <GameScreen />;
    case "paused":
      return <PauseScreen />;
    case "gameOver":
      return <GameOverScreen />;
    case "settings":
      return <SettingsScreen />;
    default:
      return <MenuScreen />;
  }
}
