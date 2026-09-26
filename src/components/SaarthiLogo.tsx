import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  lightText?: boolean;
  compact?: boolean;
}

export const SaarthiLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 32, 
  showText = true, 
  lightText = false,
  compact = false
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Geometric Symbol: Pathway + Open Book + Leaf Growth */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Background shield/circle container subtle */}
        <rect width="36" height="36" rx="8" fill="#123B5D" />
        
        {/* Left Book Page / Pathway upward */}
        <path 
          d="M7 25C11.5 24.2 15 22.5 18 19V9C14.5 11.5 11 12.2 7 12.8V25Z" 
          fill="#FFFFFF" 
          fillOpacity="0.95"
        />
        
        {/* Right Book Page / Leaf curve in Forest Green */}
        <path 
          d="M29 25C24.5 24.2 21 22.5 18 19V9C21.5 11.5 25 12.2 29 12.8V25Z" 
          fill="#247A5A" 
        />
        
        {/* Center Growth Spine / Pathway Arrow */}
        <path 
          d="M18 7.5L20.2 11.5H15.8L18 7.5Z" 
          fill="#176B87" 
        />
        <circle cx="18" cy="27" r="1.8" fill="#FFFFFF" fillOpacity="0.8" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-bold tracking-tight text-lg ${lightText ? 'text-white' : 'text-[#123B5D]'}`}>
              SAARTHI
            </span>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#247A5A]/15 text-[#247A5A] border border-[#247A5A]/30">
              ST
            </span>
          </div>
          {!compact && (
            <span className={`text-[11px] leading-tight font-medium ${lightText ? 'text-slate-300' : 'text-[#64757D]'}`}>
              Scholarship & Fellowship Management
            </span>
          )}
        </div>
      )}
    </div>
  );
};
