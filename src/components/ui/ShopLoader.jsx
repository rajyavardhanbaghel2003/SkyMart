import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

const ShopLoader = ({ label = "Loading products..." }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress from 0 to 94 quickly, then pause — resets to 0 on re-mount
        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 4 + 1;
            if (current >= 94) {
                current = 94; // Hold at 94 until real data arrives
                clearInterval(interval);
            }
            setProgress(Math.min(Math.round(current), 100));
        }, 40);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d0d]">
            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(#c8f400 1px, transparent 1px), linear-gradient(90deg, #c8f400 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Outer scanning rings */}
            <div className="relative flex items-center justify-center mb-10">
                {/* Ring 3 — slowest */}
                <div
                    className="absolute w-52 h-52 rounded-full border border-[#c8f400]/10"
                    style={{ animation: 'spin 4s linear infinite' }}
                />
                {/* Ring 2 */}
                <div
                    className="absolute w-40 h-40 rounded-full border border-dashed border-[#c8f400]/20"
                    style={{ animation: 'spin 3s linear infinite reverse' }}
                />
                {/* Ring 1 — fastest, solid with a gap */}
                <div
                    className="absolute w-28 h-28 rounded-full"
                    style={{
                        border: '2px solid transparent',
                        borderTopColor: '#c8f400',
                        borderRightColor: '#c8f400',
                        animation: 'spin 1s linear infinite',
                    }}
                />

                {/* Center orb */}
                <div className="relative w-16 h-16 rounded-full bg-[#c8f400]/10 border border-[#c8f400]/30 flex items-center justify-center">
                    {/* Pulse glow */}
                    <div
                        className="absolute inset-0 rounded-full bg-[#c8f400]/20"
                        style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
                    />
                    <Zap
                        className="w-7 h-7 text-[#c8f400] fill-[#c8f400] relative z-10"
                        style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
                    />
                </div>

                {/* Corner tick marks */}
                {[0, 90, 180, 270].map((deg) => (
                    <div
                        key={deg}
                        className="absolute w-3 h-3"
                        style={{
                            transform: `rotate(${deg}deg) translateY(-56px)`,
                        }}
                    >
                        <div className="w-full h-[2px] bg-[#c8f400]" />
                    </div>
                ))}
            </div>

            {/* Brand */}
            <div className="flex items-center gap-2 mb-6">
                <span className="font-heading font-bold text-xl text-white">
                    Sky<span className="text-[#c8f400]">Mart</span>
                </span>
            </div>

            {/* Progress bar track */}
            <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden mb-3">
                <div
                    className="h-full bg-[#c8f400] rounded-full transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Percentage + label */}
            <div className="flex items-center justify-between w-64">
                <p className="text-white/40 text-xs font-body">{label}</p>
                <span className="font-heading font-bold text-[#c8f400] text-sm tabular-nums">
                    {progress}%
                </span>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%       { opacity: 0.6; transform: scale(0.9); }
                }
            `}</style>
        </div>
    );
};

export default ShopLoader;
