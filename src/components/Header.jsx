import React from "react";
import Terminal from "./Terminal";
import DesktopIcon from "./DesktopIcon";

const Header = () => {
  return (
    <div className="min-h-screen relative bg-black">
      {/* Classic dark wallpaper pattern */}
      <div className="absolute inset-0 opacity-20"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-12 px-4">
        {/* Terminal Section with dark 3D border */}
        <div className="w-full max-w-4xl border-4 border-t-gray-600 border-l-gray-600 border-r-gray-300 border-b-gray-300 bg-gray-800 p-2 shadow-lg">
          <Terminal
            title="Hardik's Portfolio"
            prefix=">"
            tool="Welcome to "
            command=" my Portfolio"
          />
        </div>

        {/* Desktop Icon Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h2
              className="text-xl font-bold text-white font-mono bg-gray-700 px-4 py-2 border-2 border-t-gray-500 border-l-gray-500 border-r-gray-300 border-b-gray-300
              transition-transform duration-300 ease-in-out 
              hover:scale-105   "
            >
              DOUBLE CLICK TO RUN PC
            </h2>
          </div>
          <DesktopIcon image="/pc-icon.png" label="run.exe" path="/pc" />
        </div>
      </div>
    </div>
  );
};

export default Header;
