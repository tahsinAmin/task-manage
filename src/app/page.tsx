"use client"
import { Board } from "./components/Board";
import { Navbar } from "./components/Navbar";
import { populateData } from "./utils";

export default function Home() {
  const initialTasks = populateData();
  return (
    <>
      <Navbar />
      <Board initialTasks={initialTasks} />
    </>
  );
}
