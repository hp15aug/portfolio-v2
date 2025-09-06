"use client";
import Project from "@/components/projects/Project";
import React from "react";
import Back from "@/components/Back";
import BlobCursor from "@/components/BlobCursor";
import Collaboration from "@/components/Collaboration";

// Make the container cover the viewport and position relative for BlobCursor
const page = () => {
  return (
    <div className="relative min-h-screen w-full overflow-auto bg-[#0a0a0a]">
      <div className="relative z-10">
        <BlobCursor
          blobType="circle"
          fillColor="#5227FF"
          trailCount={3}
          sizes={[40, 90, 40]}
          innerSizes={[20, 35, 25]}
          innerColor="rgba(255,255,255,0.8)"
          opacities={[0.6, 0.6, 0.6]}
          shadowColor="rgba(0,0,0,0.75)"
          shadowBlur={5}
          shadowOffsetX={10}
          shadowOffsetY={10}
          filterStdDeviation={30}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={20}
        />

        <Back />
        <Project />
        <Collaboration />
      </div>
    </div>
  );
};

export default page;
