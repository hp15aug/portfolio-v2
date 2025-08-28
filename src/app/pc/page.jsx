"use client";
import Hero from "@/components/pc/Hero";
import PCLoader from "@/components/pc/PCloader";
import Taskbar from "@/components/pc/Taskbar";
import React, { useEffect, useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // if (loading) return <PCLoader />;
  return (
    <div>
      <Hero />
      <Taskbar />
    </div>
  );
};

export default page;
