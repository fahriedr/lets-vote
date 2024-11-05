"use client"

import Navbar from "@/app/components/Navbar";
import PollingCard from "@/app/components/PollingCard";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  return (
    <div className="w-full flex justify-center">
      <PollingCard />
    </div>
  );
}
