"use client";

import PriceFormatter from "@/utils/PriceFormatter";
import { useEffect, useState } from "react";

interface Props {
  latestUsage: number;
  quotaUsage: number;
  type: string;
}

export default function CircularProgressBar({
  latestUsage,
  quotaUsage,
  type,
}: Props) {
  const size = 280;
  const strokeWidth = 42;

  const [progress, setProgress] = useState(0);
  const [excessProgress, setExcessProgress] = useState(0);
  const [excessMarker, setExcessMarker] = useState({
    x: size / 2,
    y: size / 2,
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;
  const excessOffset = circumference - (excessProgress / 100) * circumference;

  useEffect(() => {
    const targetProgress = (latestUsage / quotaUsage) * 100;
    let start = 0;
    const duration = 1200;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const progressPercentage =
        easeInOutQuad(Math.min(elapsed / duration, 1)) * targetProgress;

      setProgress(progressPercentage);
      setExcessProgress(
        progressPercentage >= 100 ? progressPercentage % 100 : 0
      );

      const angleExcess = ((progressPercentage % 100) / 100) * 2 * Math.PI;
      setExcessMarker({
        x: size / 2 + radius * Math.cos(angleExcess),
        y: size / 2 + radius * Math.sin(angleExcess),
      });

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [latestUsage, quotaUsage, radius]);

  return (
    <div className="relative w-fit mx-auto">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          name="base-progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-neutral-900"
          strokeWidth={strokeWidth}
          fill="none"
          filter="url(#inner-shadow)"
        />
        <circle
          name="progress-bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progress-gradient)"
          className="transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress > 100 ? 0 : offset}
          strokeLinecap="round"
        />
        {progress % 100 !== 0 && excessProgress > 10 && (
          <circle
            name="excess-stroke-marker"
            cx={excessMarker.x}
            cy={excessMarker.y}
            r={strokeWidth / 2 - 1}
            fill="#721B88"
            filter="url(#drop-shadow)"
          />
        )}
        <circle
          name="excess-progress-bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#721B88"
          className="transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={excessOffset}
          strokeLinecap="round"
        />

        <circle
          name="inner-circle"
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth / 2}
          fill="#282C34"
        />
        <circle
          name="outer-circle"
          cx={size / 2}
          cy={size / 2}
          r={radius + strokeWidth}
          className="stroke-#282C34"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <defs>
          <radialGradient id="progress-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5C0771" />
            <stop offset="100%" stopColor="#721B88" />
          </radialGradient>
          <filter
            id="inner-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feComponentTransfer in="SourceAlpha">
              <feFuncA type="table" tableValues="1 0" />
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="10" />
            <feOffset dx="0" dy="0" result="offsetblur" />
            <feFlood floodColor="black" floodOpacity="0.3" result="color" />
            <feComposite in2="offsetblur" operator="in" />
            <feComposite in2="SourceAlpha" operator="in" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode />
            </feMerge>
          </filter>
          <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="10"
              floodColor="black"
              floodOpacity="0.3"
            />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2px]">
        <span className="text-sm font-normal text-neutral-300">คงเหลือ (บาท)</span>
        <h1 className="text-2xl font-bold text-neutral-100">
          {type === "bath"
            ? PriceFormatter(latestUsage)
            : latestUsage.toFixed(3)}
        </h1>
        {quotaUsage > 0 && (
          <h2 className="text-base font-normal text-neutral-200">
            /
            {type === "bath"
              ? PriceFormatter(quotaUsage)
              : quotaUsage.toFixed(3)}
          </h2>
        )}
      </div>
    </div>
  );
}
