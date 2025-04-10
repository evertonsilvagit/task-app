"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [weekday, setWeekDay] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const weekday = now.toLocaleDateString("pt-BR", { weekday: "long" });
      const formattedDate = now.toLocaleDateString("pt-BR");
      const formattedTime = now.toLocaleTimeString("pt-BR", { hour12: false });

      setWeekDay(weekday);
      setDate(formattedDate);
      setTime(formattedTime);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex justify-around items-center h-20 shadow-sm bg-white">
      <div className="text-gray-600 text-lg capitalize">{date}</div>
      <div className="text-gray-600 text-4xl capitalize">{time}</div>
      <div className="text-gray-600 text-lg capitalize">{weekday}</div>
    </header>
  );
}
