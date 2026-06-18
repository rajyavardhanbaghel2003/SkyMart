import React from 'react';
import { useRouteError, useNavigate, Link } from 'react-router';
import { WifiOff, AlertTriangle, RefreshCcw, Home, Zap } from 'lucide-react';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    // Determine type of error
    const status = error?.status || error?.statusCode || 500;
    const is404 = status === 404;
    const is429 = status === 429;
    const isOffline = !navigator.onLine || error?.message?.toLowerCase().includes('network');

    const config = is404
        ? {
              icon: <AlertTriangle size={40} className="text-yellow-400" />,
              title: 'Product Not Found',
              subtitle: "We couldn't find what you're looking for.",
              color: 'yellow-400',
              glowColor: 'rgba(250,204,21,0.15)',
          }
        : is429
        ? {
              icon: <WifiOff size={40} className="text-primary" />,
              title: 'Too Many Requests',
              subtitle: 'The server is being accessed too fast. Wait a moment and try again.',
              color: '[#c8f400]',
              glowColor: 'rgba(200,244,0,0.15)',
          }
        : isOffline
        ? {
              icon: <WifiOff size={40} className="text-red-400" />,
              title: 'No Internet Connection',
              subtitle: "Check your connection and try reloading.",
              color: 'red-400',
              glowColor: 'rgba(248,113,113,0.15)',
          }
        : {
              icon: <AlertTriangle size={40} className="text-red-400" />,
              title: 'Something Went Wrong',
              subtitle: error?.data || error?.message || 'An unexpected error occurred.',
              color: 'red-400',
              glowColor: 'rgba(248,113,113,0.15)',
          };

    return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 relative overflow-hidden">

            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        'linear-gradient(#c8f400 1px, transparent 1px), linear-gradient(90deg, #c8f400 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Glow blob */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: config.glowColor }}
            />

            {/* Card */}
            <div className="relative z-10 bg-[#111] border border-white/10 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 justify-center mb-8">
                    <div className='w-8 h-8 bg-primary rounded-xl flex items-center justify-center'>
                        <Zap className="w-4 text-bg fill-bg" />
                    </div>
                    <span className="font-heading font-bold text-lg text-white">
                        Sky<span className="text-primary">Mart</span>
                    </span>
                </Link>

                {/* Icon */}
                <div
                    className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                    style={{ background: config.glowColor, border: `1px solid ${config.glowColor}` }}
                >
                    {config.icon}
                </div>

                {/* Status code */}
                <p className="text-white/20 text-xs uppercase tracking-[0.2em] font-bold mb-2">
                    Error {status}
                </p>

                {/* Title */}
                <h1 className="font-heading font-bold text-2xl text-white mb-3">
                    {config.title}
                </h1>

                {/* Subtitle */}
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                    {config.subtitle}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate(0)}
                        className="w-full bg-primary hover:bg-buttonHover text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                    >
                        <RefreshCcw size={16} />
                        Try Again
                    </button>
                    <Link
                        to="/"
                        className="w-full border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60 hover:text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all"
                    >
                        <Home size={16} />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
