"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Icon({ image, label, path }) {
  const [selected, setSelected] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [pressed, setPressed] = useState(false);
  const router = useRouter();
  const iconRef = useRef(null);

  // Handle double click
  useEffect(() => {
    if (clicks === 2) {
      router.push(path);
      setClicks(0);
    }
    const timer = setTimeout(() => setClicks(0), 300);
    return () => clearTimeout(timer);
  }, [clicks, path, router]);

  // Deselect if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (iconRef.current && !iconRef.current.contains(e.target)) {
        setSelected(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={iconRef}
      className={`flex flex-col items-center cursor-pointer select-none w-20 p-1 relative
        ${selected ? "bg-blue-800" : ""}
      `}
      onClick={() => {
        setSelected(true);
        setClicks((c) => c + 1);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {/* Icon container with ONLY retro borders */}
      <div
        className={`
          w-16 h-16 mb-2 flex items-center justify-center relative
          ${
            pressed
              ? "border-2 border-t-gray-600 border-l-gray-600 border-r-white border-b-white"
              : "border-2 border-transparent"
          }
        `}
      >
        <Image
          src={image}
          alt={label}
          width={48}
          height={48}
          className="pointer-events-none object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {/* Icon Label */}
      <p
        className={`text-xs text-center px-1 font-mono leading-tight
          ${selected ? "bg-blue-800 text-white" : "text-white"}
        `}
      >
        {label}
      </p>
    </div>
  );
}
