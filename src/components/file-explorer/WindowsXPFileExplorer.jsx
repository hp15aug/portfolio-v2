"use client";
import React from "react";

export default function WindowsXPFileExplorer({
  title = "My Computer",
  onClose,
}) {
  return (
    <div className="w-full h-[600px] max-w-4xl mx-auto mt-8 shadow-2xl rounded-md overflow-hidden bg-gray-100 border border-gray-400">
      {/* Title bar */}
      <div
        className="flex items-center justify-between h-9 px-3"
        style={{ background: "linear-gradient(180deg,#0066cc,#004c99)" }}
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-white select-none">
          <div className="w-4 h-4 bg-white/10 rounded-sm" />
          <span>{title}</span>
        </div>

        {/* Right-side close button (XP style) */}
        <button
          aria-label="Close"
          onClick={() => onClose && onClose()}
          className="flex items-center justify-center w-7 h-7 -mr-1 rounded-sm shadow-inner"
          style={{
            background: "linear-gradient(180deg,#ff6b6b,#cc3b3b)",
            boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.25)",
          }}
        >
          <span className="text-black font-bold leading-none">×</span>
        </button>
      </div>

      {/* Menu / Address bar area */}
      <div className="p-3 border-b border-gray-300 bg-white">
        <div className="flex items-center gap-2">
          <div className="text-xs font-medium text-gray-600">Address:</div>
          <div className="flex-1">
            <input
              readOnly
              value={"C:\\"}
              className="w-full text-xs px-2 py-1 rounded-sm border border-gray-300 bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Toolbar (no icons, only text buttons) */}
      <div className="p-2 bg-gray-50 border-b border-gray-300">
        <div className="flex gap-2 text-sm">
          <button className="px-2 py-1 rounded-sm border border-gray-300 bg-white text-gray-700 text-xs">
            File
          </button>
          <button className="px-2 py-1 rounded-sm border border-gray-300 bg-white text-gray-700 text-xs">
            Edit
          </button>
          <button className="px-2 py-1 rounded-sm border border-gray-300 bg-white text-gray-700 text-xs">
            View
          </button>
          <button className="px-2 py-1 rounded-sm border border-gray-300 bg-white text-gray-700 text-xs">
            Tools
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex h-[460px] bg-white">
        {/* Left pane - folder tree (text only) */}
        <aside className="w-44 p-3 border-r border-gray-200 bg-gray-50 text-sm overflow-auto">
          <div className="font-medium mb-2">Folders</div>
          <ul className="space-y-1 text-gray-700">
            <li className="pl-1">Desktop</li>
            <li className="pl-1">My Documents</li>
            <li className="pl-1">My Computer</li>
            <li className="pl-1">C:\</li>
            <li className="pl-1">D:\</li>
            <li className="pl-1">Network</li>
          </ul>
        </aside>

        {/* Right pane - file list (no icons) */}
        <section className="flex-1 p-3 overflow-auto">
          <div className="mb-2 text-xs text-gray-500">Details</div>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs text-gray-600 border-b border-gray-200">
                <th className="py-2">Name</th>
                <th className="py-2">Type</th>
                <th className="py-2">Size</th>
                <th className="py-2">Modified</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 14 }).map((_, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-100 even:bg-white text-gray-800 cursor-default"
                >
                  <td className="py-2">{`File_${i + 1}.txt`}</td>
                  <td className="py-2 text-gray-600">Text Document</td>
                  <td className="py-2 text-gray-600">{(i + 1) * 4} KB</td>
                  <td className="py-2 text-gray-600">
                    2025-08-{String((i % 28) + 1).padStart(2, "0")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* Footer status bar */}
      <div className="h-8 px-3 flex items-center text-xs text-gray-700 bg-gray-100 border-t border-gray-300">
        <div className="flex-1">{`14 items`}</div>
        <div>Ready</div>
      </div>
    </div>
  );
}
