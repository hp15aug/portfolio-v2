"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5250);
    return () => clearTimeout(timer);
  }, []);

  // if (loading) return <Loader />;

  return (
    <div>
      <Header />
    </div>
  );
}
