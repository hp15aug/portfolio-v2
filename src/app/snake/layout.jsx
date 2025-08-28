// app/layout.jsx
// import "@/styles/globals.css";
import "@/styles/snake.css";
import { Press_Start_2P } from "next/font/google";

// Import the Press Start 2P font
const pressStart2P = Press_Start_2P({
  weight: "400", // only available weight
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start",
});

export const metadata = {
  title: "Snake Game",
  description: "Retro Snake Game in Next.js",
};

export default function SnakeLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={` ${pressStart2P.variable} bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
