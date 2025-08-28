import FileExplorer from "@/components/file-explorer/FileExplorer";
import FolderIcon from "@/components/file-explorer/FolderIcon";
import WindowsXPFileExplorer from "@/components/file-explorer/WindowsXPFileExplorer";
import Taskbar from "@/components/pc/Taskbar";
import React from "react";

const page = () => {
  return (
    <div>
      <FileExplorer />
      <div className="absolute top-24 left-2 flex flex-row">
        <div>
          <FolderIcon
            image="/pc/explorer2.png"
            label="About Me"
            path="/about"
          />
        </div>

        <div>
          <FolderIcon image="/pc/explorer2.png" label="Resume" path="/resume" />
        </div>

        <div>
          <FolderIcon
            image="/pc/explorer2.png"
            label="Projects"
            path="/projects"
          />
        </div>

        <div className="">
          <FolderIcon
            image="/pc/explorer2.png"
            label="Contact"
            path="/contact"
          />
        </div>
      </div>
      {/* <WindowsXPFileExplorer /> */}
      <Taskbar />
    </div>
  );
};

export default page;
