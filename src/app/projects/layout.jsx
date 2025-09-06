"use client";

import React from "react";
import "./projects.css"; // import scoped css for /projects page

export default function ProjectsLayout({ children }) {
  return <div className="projects-wrapper">{children}</div>;
}
