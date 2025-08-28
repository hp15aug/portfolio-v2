"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Taskbar() {
  const router = useRouter();
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDate(now.toLocaleDateString());
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-gray-200 border-t border-gray-400 flex items-center justify-between px-2 font-mono text-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        {/* Start Button */}
        <button className="retro-btn cursor-pointer">
          <img src="/pc/start.png" alt="Start" className="h-6 w-6 mr-2" />
          <span className="text-black font-mono font-bold">Start</span>
        </button>

        {/* File Explorer */}
        <button className="retro-btn cursor-pointer">
          <img
            src="/pc/explorer2.png"
            alt="Explorer"
            className="h-6 w-6 mr-2"
          />
          <span className="text-black">Explorer</span>
        </button>

        {/* Snake Game */}
        <button
          className="retro-btn cursor-pointer"
          onClick={() => router.push("/snake")}
        >
          <img src="/pc/snake.png" alt="Snake" className="h-6 w-6 mr-2" />
          <span className="text-black">Snake</span>
        </button>
      </div>

      {/* Right Section - Date/Time */}
      <div className="flex items-center px-3 py-1 bg-gray-300 border border-gray-500 shadow-inner">
        <span className="text-black font-mono">{time}</span>
        <span className="text-black font-mono ml-2">{date}</span>
      </div>
    </div>
  );
}
