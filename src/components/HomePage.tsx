import { useEffect, useState, useRef } from 'react';
import { TrendingUp, ArrowDown } from 'lucide-react';

interface Candle {
  id: number;
  x: number;
  y: number;
  direction: 'up' | 'down';
  timestamp: number;
}

function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [candles, setCandles] = useState<Candle[]>([]);
  const candleIdRef = useRef(0);
  const homePageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!homePageRef.current) return;

      const rect = homePageRef.current.getBoundingClientRect();
      const isClickInSection = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!isClickInSection) return;

      const centerX = window.innerWidth / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceFromCenter = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      const threshold = 250;
      const direction = distanceFromCenter < threshold ? 'up' : 'down';

      const newCandle: Candle = {
        id: candleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        direction,
        timestamp: Date.now(),
      };

      setCandles(prev => [...prev, newCandle]);

      setTimeout(() => {
        setCandles(prev => prev.filter(c => c.id !== newCandle.id));
      }, 1500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.02;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.02;
  const opacity = Math.max(1 - scrollY / 500, 0);

  return (
    <section
      ref={homePageRef}
      id="home"
      className="section min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-8 p-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className="border border-white/20"
              style={{
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-6" style={{ opacity }}>
        <div className="mb-8 inline-block">
          <TrendingUp className="w-20 h-20 mx-auto animate-pulse" />
        </div>

        <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter">
          APEX
        </h1>

        <p className="text-xl md:text-2xl text-white/70 mb-12 tracking-wide">
          Redefining Stock Market Intelligence
        </p>

        <div className="flex items-center justify-center gap-4 text-sm tracking-wider">
          <span className="text-white/50">INNOVATE</span>
          <span className="w-12 h-[1px] bg-white/30" />
          <span className="text-white/50">INVEST</span>
          <span className="w-12 h-[1px] bg-white/30" />
          <span className="text-white/50">SUCCEED</span>
        </div>
      </div>

      {candles.map(candle => (
        <div
          key={candle.id}
          className="fixed pointer-events-none z-20 text-white"
          style={{
            left: `${candle.x}px`,
            top: `${candle.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <TrendingArrow direction={candle.direction} />
        </div>
      ))}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
}

interface TrendingArrowProps {
  direction: 'up' | 'down';
}

function TrendingArrow({ direction }: TrendingArrowProps) {
  const isUp = direction === 'up';

  return (
    <div className="relative w-12 h-12">
      <style>{`
        @keyframes trendingUp {
          0% {
            opacity: 1;
            transform: translateY(20px) scale(0.8);
          }
          15% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          85% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px) scale(0.8);
          }
        }

        @keyframes trendingDown {
          0% {
            opacity: 1;
            transform: translateY(-20px) scale(0.8);
          }
          15% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          85% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
        }

        .trending-container {
          animation: ${isUp ? 'trendingUp' : 'trendingDown'} 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      <div className="trending-container w-full h-full flex items-center justify-center">
        {isUp ? (
          <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="17 6 23 6 23 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="17 18 23 18 23 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default HomePage;
