"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AboutAI = () => {
  const router = useRouter();
  const [output, setOutput] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const contentLines = [
    "$ ./initialize_about_me.sh",
    "",
    "Initializing About Me system...",
    "Fetching user profile data...",
    "Rendering ASCII terminal header...",
    "",
    `
 mm    mm                            mm     ##     mm                  mmmmmm
 ##    ##                            ##     ""     ##                  ##""""#m
 ##    ##   m#####m   ##m####   m###m##   ####     ## m##"             ##    ##   m#####m  ##m####m   m####m    ##m####  ##    ##
 ########   " mmm##   ##"      ##"  "##     ##     ##m##               ######"    " mmm##  ##"   ##  ##mmmm##   ##"      ##    ##
 ##    ##  m##"""##   ##       ##    ##     ##     ##"##m              ##        m##"""##  ##    ##  ##""""""   ##       ##    ##
 ##    ##  ##mmm###   ##       "##mm###  mmm##mmm  ##  "#m             ##        ##mmm###  ##    ##  "##mmmm#   ##       ##mmm###
 ""    ""   """" ""   ""         """ ""  """"""""  ""   """            ""         """" ""  ""    ""    """""    ""        """" ""
`,
    "",
    "Name:           Hardik Paneru",
    "Role:           Full-stack Developer",
    "Status:         [ACTIVE]",
    "",
    "Tech Stack:",
    "├── Frontend:   HTML, CSS, JavaScript, React, Next.js, Tailwind CSS",
    "├── Backend:    Node.js, Express.js",
    "├── Database:   MongoDB",
    "└── Tools:      Git, GitHub, Vercel",
    "",
    "Loading project showcase...",
    "",
    "PROJECTS:",
    "├── [✓] Spectrogram Visualization System",
    "├── [✓] Email Reply Agent",
    "├── [✓] iL7 Studios Official Website",
    "└── [✓] Portfolio Website",
    "",
  ];

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (currentLineIndex >= contentLines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = contentLines[currentLineIndex];

    // Instant render for ASCII art block (line 5 with the multiline string)
    if (currentLineIndex === 5) {
      setOutput((prev) => prev + currentLine + "\n");
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
      return;
    }

    if (currentCharIndex >= currentLine.length) {
      // Move to next line after a pause
      const nextLineTimeout = setTimeout(
        () => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
          setOutput((prev) => prev + "\n");
        },
        currentLine === "" ? 20 : 30
      ); // Shorter pause for empty lines

      return () => clearTimeout(nextLineTimeout);
    } else {
      // Type next character
      const typingTimeout = setTimeout(() => {
        setOutput((prev) => prev + currentLine[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, getTypingSpeed(currentLine[currentCharIndex], currentLineIndex));

      return () => clearTimeout(typingTimeout);
    }
  }, [currentLineIndex, currentCharIndex, contentLines]);

  // Variable typing speed for more realistic effect
  const getTypingSpeed = (char, lineIndex) => {
    if (lineIndex === 6) return 0;

    if (char === " ") return 5;
    if (char === "\n") return 10;
    if ([".", "!", "?"].includes(char)) return 15;
    if ([",", ";", ":"].includes(char)) return 10;

    return Math.random() * 10 + 5; // 5-15ms per character
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      router.back();
    }
  };

  useEffect(() => {
    if (isComplete) {
      window.addEventListener("keypress", handleKeyPress);
      return () => window.removeEventListener("keypress", handleKeyPress);
    }
  }, [isComplete]);

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen p-6 overflow-hidden">
      <div className="max-w-full">
        <div className="mb-4 text-sm opacity-70">
          Terminal - Hardik@portfolio:~
        </div>

        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {output}
          {showCursor && (
            <span className="bg-green-400 text-black animate-pulse">█</span>
          )}
        </div>

        {isComplete && (
          <div className="mt-8">
            <div
              onClick={() => router.back()}
              onKeyPress={(e) => e.key === "Enter" && router.back()}
              className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer inline-block transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 rounded px-1"
              tabIndex={0}
            >
              $ back
            </div>
            <span className="text-green-400 ml-2 inline-block align-bottom animate-pulse">
              █
            </span>
          </div>
        )}
      </div>

      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent bg-repeat-y animate-pulse opacity-30"></div>
      </div>
    </div>
  );
};

export default AboutAI;
