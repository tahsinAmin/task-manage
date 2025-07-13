"use client"
import { Board } from "./components/Board";
import { Navbar } from "./components/Navbar";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Navbar setIsModalOpen={setIsModalOpen} />
      <Board isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}
