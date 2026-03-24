'use client';

import { useEffect, useState } from 'react';
import { Cake, Heart } from 'lucide-react';

const HOME_DATE    = new Date(2018, 4, 27); // May 27, 2018
const BIRTHDAY     = new Date(2018, 1, 5);  // Feb 5, 2018

function calcCounts(now: Date) {
  const diffMs = now.getTime() - HOME_DATE.getTime();
  const totalDays = Math.floor(diffMs / 86400000);

  const years  = Math.floor(totalDays / 365.25);
  const months = Math.floor((totalDays - years * 365.25) / 30.44);
  const days   = Math.floor(totalDays - years * 365.25 - months * 30.44);

  const age = now.getFullYear() - BIRTHDAY.getFullYear() -
    (now < new Date(now.getFullYear(), 1, 5) ? 1 : 0);

  let nextBirthday = new Date(now.getFullYear(), 1, 5);
  if (now >= nextBirthday) nextBirthday = new Date(now.getFullYear() + 1, 1, 5);
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86400000);

  return { years, months, days, age, daysUntilBirthday };
}

export default function DaysCounter() {
  const [counts, setCounts] = useState(calcCounts(new Date()));

  useEffect(() => {
    // recalc at midnight
    const now = new Date();
    const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
    const t = setTimeout(() => setCounts(calcCounts(new Date())), msUntilMidnight);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-primary rounded-2xl p-7 text-on-primary shadow-sm overflow-hidden relative">
      {/* Decorative chocolate drops */}
      <span className="absolute -top-3 -right-3 text-[80px] opacity-5 select-none rotate-12">🍫</span>

      <p className="text-on-primary/60 text-xs font-bold uppercase tracking-widest mb-1">ivy と一緒に</p>
      <div className="font-display text-4xl font-black mb-1 leading-none">
        {counts.years}<span className="text-xl font-bold ml-0.5">年</span>
        {counts.months}<span className="text-xl font-bold ml-0.5">ヶ月</span>
        {counts.days}<span className="text-xl font-bold ml-0.5">日</span>
      </div>
      <p className="text-on-primary/50 text-xs mb-5">2018年5月27日から</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/10 rounded-xl p-3 flex flex-col gap-1">
          <span className="text-on-primary/60 text-[11px] font-bold uppercase tracking-wider">年齢</span>
          <span className="font-display text-2xl font-black">{counts.age}<span className="text-base font-bold">歳</span></span>
        </div>
        <div className="bg-white/10 rounded-xl p-3 flex flex-col gap-1">
          <span className="text-on-primary/60 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Cake size={11} /> 誕生日まで
          </span>
          <span className="font-display text-2xl font-black">
            {counts.daysUntilBirthday}<span className="text-base font-bold">日</span>
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs text-on-primary/40 flex items-center gap-1">
        <Heart size={10} className="fill-on-primary/40" /> 2/5生まれのチョコラブ
      </p>
    </div>
  );
}
