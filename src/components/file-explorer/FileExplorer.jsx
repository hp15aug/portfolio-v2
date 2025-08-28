"use client";
import React from "react";
import { useRouter } from "next/navigation";

const FileExplorer = ({ onClose }) => {
  const router = useRouter();
  return (
    <div className="w-screen h-[calc(100vh-40px)] border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#7F7F7F] border-b-[#7F7F7F] bg-[#ECE9D8] font-['Tahoma',_sans-serif] text-sm flex flex-col">
      {/* Title Bar */}
      <div className="title-bar h-7 bg-gradient-to-b from-[#0055E7] to-[#0047C1] flex items-center justify-between pl-2 flex-shrink-0">
        <span className="text-white font-bold">File Explorer</span>
        <div className="flex items-center">
          {/* Close Button */}
          <button
            onClick={router.back}
            className="w-5 h-5 bg-[#E86158] text-white font-bold flex items-center justify-center border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#000000] border-b-[#000000] mr-1 hover:bg-red-700 active:border-t-[#000000] active:border-l-[#000000] active:border-r-[#FFFFFF] active:border-b-[#FFFFFF]"
            aria-label="Close"
          >
            X
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="flex bg-[#ECE9D8] border-b text-black border-gray-400 px-1 flex-shrink-0">
        <span className="px-2 py-0.5">
          <u>F</u>ile
        </span>
        <span className="px-2 py-0.5">
          <u>E</u>dit
        </span>
        <span className="px-2 py-0.5">
          <u>V</u>iew
        </span>
        <span className="px-2 py-0.5">
          <u>F</u>avorites
        </span>
        <span className="px-2 py-0.5">
          <u>T</u>ools
        </span>
        <span className="px-2 py-0.5">
          <u>H</u>elp
        </span>
      </div>

      {/* Toolbar Placeholder */}
      <div className="h-8 bg-[#ECE9D8] border-b-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#7F7F7F] border-b-[#7F7F7F] flex-shrink-0"></div>

      {/* Main Content Area */}
      <div className="w-full flex-grow bg-white border-2 border-t-[#7F7F7F] border-l-[#7F7F7F] border-r-[#FFFFFF] border-b-[#FFFFFF]"></div>

      {/* Status Bar */}
      <div className="h-5 border-t border-gray-400 text-gray-700 px-2 flex items-center flex-shrink-0"></div>
    </div>
  );
};

export default FileExplorer;
