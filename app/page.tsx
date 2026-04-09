"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Jan 1, 2026 = Thursday → index 3 (Mon=0)
  const startDay = 3;

  const calendarDates = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: 31 }, (_, i) => i + 1),
  ];

  // Govt holidays (India)
  const holidays = [1, 14, 26];

  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  const today = new Date().getDate();

  // Load notes
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(saved);
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem("notes", notes);
  }, [notes]);

  const handleClick = (date: number) => {
    if (!startDate || endDate) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date > startDate) setEndDate(date);
      else setStartDate(date);
    }
  };

  const isInRange = (date: number) => {
    return startDate && endDate && date >= startDate && date <= endDate;
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl">

        {/* HERO */}
        <div className="relative h-64">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="hero"
            className="w-full h-full object-cover brightness-110"
          />

          <div className="absolute bottom-0 left-0 w-full h-20 bg-white 
            [clip-path:polygon(0_100%,100%_0,100%_100%)]">
          </div>

          <div className="absolute bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg">
            <p className="text-sm">2026</p>
            <h2 className="text-xl font-bold">JANUARY</h2>
          </div>
        </div>

        {/* MAIN */}
        <div className="p-6 space-y-6">

          {/* CALENDAR WITH VIDEO */}
          <div className="relative rounded-xl overflow-hidden">

            {/* VIDEO BACKGROUND */}
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover opacity-65"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-white/70"></div>

            {/* CALENDAR CONTENT */}
            <div className="relative z-10 p-4">

              {/* DAYS */}
              <div className="grid grid-cols-7 text-center font-bold mb-3">
                {days.map((day, i) => (
                  <div
                    key={day}
                    className={`${i === 6 ? "text-red-500" : ""}`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* DATES */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {calendarDates.map((date, index) => {
                  const isSunday = index % 7 === 6;

                  return (
                    <div key={index}>
                      {date && (
                        <div
                          onClick={() => handleClick(date)}
                          className={`p-2 rounded-full text-sm font-bold cursor-pointer transition-all duration-200
                            
                            ${date === startDate ? "bg-blue-600 text-white scale-105" : ""}
                            ${date === endDate ? "bg-blue-600 text-white scale-105" : ""}
                            ${isInRange(date) ? "bg-blue-200" : ""}
                            ${date === today ? "border-2 border-blue-500" : ""}
                            
                            ${isSunday ? "text-red-500" : ""}
                            ${holidays.includes(date) ? "text-red-600 font-extrabold" : ""}
                            
                            hover:bg-blue-100 hover:scale-105
                          `}
                        >
                          {date}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* RANGE SUMMARY */}
              {startDate && endDate && (
                <div className="mt-4 text-center text-blue-600 font-medium">
                  Selected: Jan {startDate} → Jan {endDate} ({endDate - startDate + 1} days)
                </div>
              )}

              {/* CLEAR BUTTON */}
              {(startDate || endDate) && (
                <div className="text-center mt-2">
                  <button
                    onClick={clearSelection}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Clear Selection
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* NOTES */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Notes</h2>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write notes for your selected dates..."
              className="w-full h-48 p-3 rounded-lg border 
              bg-[repeating-linear-gradient(white,white_28px,#e5e7eb_29px)] 
              outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

        </div>

      </div>
    </div>
  );
}