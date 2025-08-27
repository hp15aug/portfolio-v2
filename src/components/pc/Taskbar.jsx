"use client";
import { useState, useEffect } from "react";

export default function Taskbar() {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setDate(now.toLocaleDateString());
    }, 1000 * 60); // every 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-gray-200 border-t border-gray-400 flex items-center justify-between px-2 font-mono text-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        {/* Start Button */}
        <button className="flex items-center px-3 py-2 bg-gray-300 border border-gray-500 shadow-inner hover:bg-gray-400">
          <img src="/pc/start.png" alt="Start" className="h-6 w-6 mr-2" />
          <span className="text-black font-mono font-bold">Start</span>
        </button>

        {/* File Explorer */}
        <button className="flex items-center px-3 py-2 bg-gray-300 border border-gray-500 shadow-inner hover:bg-gray-400">
          <img src="/pc/explorer.png" alt="Explorer" className="h-6 w-6 mr-2" />
          <span className="text-black font-mono">Explorer</span>
        </button>

        {/* Snake Game */}
        <button className="flex items-center px-3 py-2 bg-gray-300 border border-gray-500 shadow-inner hover:bg-gray-400">
          <img src="/pc/snake.png" alt="Snake" className="h-6 w-6 mr-2" />
          <span className="text-black font-mono">Snake</span>
        </button>
      </div>

      {/* Right Section - Date/Time */}
      <div className="flex items-center px-4 py-2 bg-gray-300 border border-gray-500 shadow-inner">
        <span className="text-black font-mono">{time}</span>
        <span className="text-black font-mono ml-3">{date}</span>
      </div>
    </div>
  );
}
