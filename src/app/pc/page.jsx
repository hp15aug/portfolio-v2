"use client";
import Hero from "@/components/pc/Hero";
import PCLoader from "@/components/pc/PCloader";
import Taskbar from "@/components/pc/Taskbar";
import React, { useEffect, useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if PC loader has been shown before in this session
    const hasPCLoaderBeenShown = sessionStorage.getItem("pcLoaderShown");

    if (!hasPCLoaderBeenShown) {
      // First time visiting - show loader
      const timer = setTimeout(() => {
        setLoading(false);
        // Mark PC loader as shown for this session
        sessionStorage.setItem("pcLoaderShown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Loader already shown - skip it
      setLoading(false);
    }
  }, []);

  if (loading) return <PCLoader />;

  return (
    <div>
      <Hero />
      <Taskbar />
    </div>
  );
};

export default page;
