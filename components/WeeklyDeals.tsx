import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight, Tag } from 'lucide-react';

export const WeeklyDeals: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              clearInterval(timer); // Timer finished
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 text-white overflow-hidden shadow-lg relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 transform rotate-45 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-5 rounded-full -ml-10 -mb-10 pointer-events-none"></div>
      
      <div className="relative p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-white/10">
            <Tag size={12} className="text-yellow-300" />
            <span>Weekly Flash Sale</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 leading-tight">
            Save 20% on all <span className="text-yellow-300">Organic Fruits</span>
          </h2>
          <p className="text-brand-50 mb-6 max-w-lg">
            Stock up on nature's candy. Fresh, organic, and locally sourced fruits are discounted until midnight.
          </p>
          
          <button className="bg-white text-brand-700 hover:bg-brand-50 font-bold py-3 px-6 rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm">
            Shop Deals <ArrowRight size={18} />
          </button>
        </div>

        <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 flex flex-col items-center min-w-[200px]">
          <div className="flex items-center gap-2 text-yellow-300 mb-2 font-semibold">
            <Timer size={20} />
            <span>Ending in</span>
          </div>
          <div className="flex gap-2 text-center">
            <div className="bg-white text-brand-800 rounded-lg p-2 w-12 h-14 flex flex-col items-center justify-center shadow-sm">
              <span className="font-bold text-xl leading-none">{formatTime(timeLeft.hours)}</span>
              <span className="text-[10px] uppercase font-medium text-gray-400 mt-1">Hr</span>
            </div>
            <div className="font-bold text-2xl pt-2">:</div>
            <div className="bg-white text-brand-800 rounded-lg p-2 w-12 h-14 flex flex-col items-center justify-center shadow-sm">
              <span className="font-bold text-xl leading-none">{formatTime(timeLeft.minutes)}</span>
              <span className="text-[10px] uppercase font-medium text-gray-400 mt-1">Min</span>
            </div>
            <div className="font-bold text-2xl pt-2">:</div>
            <div className="bg-white text-brand-800 rounded-lg p-2 w-12 h-14 flex flex-col items-center justify-center shadow-sm">
              <span className="font-bold text-xl leading-none">{formatTime(timeLeft.seconds)}</span>
              <span className="text-[10px] uppercase font-medium text-gray-400 mt-1">Sec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
