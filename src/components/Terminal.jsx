"use client";
import React from "react";

export default function Terminal({
  title = "Terminal",
  prefix = "- ",
  tool = "npx ",
  command = "create-react-app@latest",
}) {
  return (
    <div className="p-4 border border-[#c5c5c5] rounded-xl bg-[#d9d9d92f] backdrop-blur-md min-w-[60%]">
      <div className="flex flex-col gap-4 relative z-10 border border-[#525252] rounded-lg overflow-hidden">
        <div className="flex flex-col font-mono">
          {/* Header */}
          <div className="flex items-center justify-between min-h-[40px] px-3 bg-[#202425] rounded-t-lg">
            <p className="flex items-center gap-2 h-10 font-semibold text-[#8e8e8e] truncate select-none">
              <svg
                width="18"
                height="18"
                className="text-[#006adc] mt-[2px]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"></path>
              </svg>
              {title}
            </p>
          </div>

          {/* Body */}
          <div className="flex flex-col relative overflow-x-auto p-4 text-white bg-black rounded-b-lg whitespace-nowrap">
            <pre className="flex flex-row items-center text-[16px]">
              <code className="text-[#575757]">{prefix}</code>
              <code className="text-[#e34ba9]">{tool}</code>
              <code
                className="cmd relative flex items-center"
                data-cmd={command}
              ></code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
