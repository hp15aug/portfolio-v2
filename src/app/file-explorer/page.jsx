import FileExplorer from "@/components/file-explorer/FileExplorer";
import FolderIcon from "@/components/file-explorer/FolderIcon";
import Taskbar from "@/components/pc/Taskbar";
import React from "react";

const page = () => {
  return (
    <div>
      <FileExplorer />
      <div className="absolute top-24 left-2 flex flex-row">
        <div>
          <FolderIcon image="/pc/about.png" label="About Me" path="/about" />
        </div>

        <a
          target="blank"
          href="https://drive.google.com/drive/folders/1x-5r9RobFMQWBcHwkXZ1JZymNkIVq06v"
        >
          <FolderIcon
            image="/pc/resume.png"
            label="Resume"
            path="https://drive.google.com/drive/folders/1x-5r9RobFMQWBcHwkXZ1JZymNkIVq06v"
          />
        </a>

        <div>
          <FolderIcon
            image="/pc/projects.png"
            label="Projects"
            path="/projects"
          />
        </div>

        <div className="">
          <FolderIcon image="/pc/contact.png" label="Contact" path="/contact" />
        </div>
        <div>
          <FolderIcon
            image="/pc/experience.png"
            label="Experience"
            path="/experience"
          />
        </div>
        <div>
          <FolderIcon image="/pc/skills.png" label="Skills" path="/skills" />
        </div>
      </div>
      <Taskbar />
    </div>
  );
};

export default page;
