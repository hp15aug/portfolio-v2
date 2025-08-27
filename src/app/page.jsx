"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return <div>This is the home page</div>;
}
