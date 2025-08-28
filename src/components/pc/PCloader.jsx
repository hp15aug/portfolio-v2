import React from "react";

const PCLoader = () => {
  return (
    <div className="xp-boot-screen">
      <div className="xp-logo-container">
        <div className="xp-logo">
          <div className="microsoft-text">Microsoft</div>
          <div className="windows-text">
            Windows <span className="xp-text">95</span>
          </div>
          <div className="professional-text">Professional</div>
        </div>
      </div>

      <div className="loading-section">
        <div className="loading-bar-container">
          <div className="loading-bar-track">
            <div className="loading-bar-fill">
              <div className="loading-segment segment-1"></div>
              <div className="loading-segment segment-2"></div>
              <div className="loading-segment segment-3"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-text">
        <div className="loading-text">Loading...</div>
        <div className="copyright-text">Copyright © hp15aug</div>
      </div>

      <style jsx>{`
        .xp-boot-screen {
          background: #000000;
          color: #ffffff;
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: "Tahoma", "Segoe UI", sans-serif;
          overflow: hidden;
          position: relative;
        }

        .xp-logo-container {
          margin-bottom: 80px;
        }

        .xp-logo {
          text-align: left;
          width: 280px;
        }

        .microsoft-text {
          font-size: 15px;
          font-weight: 400;
          color: #ffffff;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }

        .microsoft-text::after {
          content: "®";
          font-size: 10px;
          vertical-align: super;
          margin-left: 2px;
        }

        .windows-text {
          font-size: 48px;
          font-weight: 700;
          color: #ffffff;
          line-height: 42px;
          margin-bottom: 2px;
          letter-spacing: -1px;
        }

        .xp-text {
          font-size: 24px;
          color: #ff6600;
          font-weight: 700;
          margin-left: 8px;
          vertical-align: top;
          line-height: 42px;
        }

        .professional-text {
          font-size: 26px;
          font-weight: 300;
          color: #cccccc;
          margin-left: 8px;
          letter-spacing: 0.5px;
        }

        .loading-section {
          margin-bottom: 40px;
        }

        .loading-bar-container {
          width: 180px;
          height: 16px;
          background: #000000;
          border: 2px solid #5a5a5a;
          border-radius: 8px;
          padding: 2px;
          overflow: hidden;
        }

        .loading-bar-track {
          width: 100%;
          height: 100%;
          background: #1a1a1a;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        .loading-bar-fill {
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
        }

        .loading-segment {
          width: 12px;
          height: 8px;
          background: linear-gradient(
            to bottom,
            #4a8cf7 0%,
            #2563eb 25%,
            #1d4ed8 50%,
            #2563eb 75%,
            #4a8cf7 100%
          );
          border-radius: 1px;
          margin-right: 2px;
          animation: slideAnimation 2s infinite linear;
          box-shadow: 0 0 2px rgba(74, 140, 247, 0.5);
        }

        .segment-1 {
          animation-delay: 0s;
        }

        .segment-2 {
          animation-delay: 0.3s;
        }

        .segment-3 {
          animation-delay: 0.6s;
        }

        @keyframes slideAnimation {
          0% {
            transform: translateX(-60px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(200px);
            opacity: 0;
          }
        }

        .bottom-text {
          position: absolute;
          bottom: 60px;
          text-align: center;
        }

        .loading-text {
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 20px;
          animation: fadeInOut 2s infinite ease-in-out;
        }

        .copyright-text {
          font-size: 11px;
          color: #888888;
          letter-spacing: 0.3px;
        }

        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default PCLoader;
