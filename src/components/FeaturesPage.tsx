import { useEffect, useState, useRef } from 'react';
import { Activity, Zap, Shield, TrendingUp, Bell, LineChart } from 'lucide-react';

function FeaturesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cardVisibility, setCardVisibility] = useState<boolean[]>(Array(6).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCardVisibility(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  const features = [
    {
      icon: Activity,
      title: 'Real-Time Analytics',
      description: 'Live market data and instant insights to keep you ahead of the curve.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast Execution',
      description: 'Execute trades in milliseconds with our optimized infrastructure.',
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Your data and investments protected by military-grade encryption.',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Intelligence',
      description: 'AI-powered forecasting to identify trends before they happen.',
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Custom notifications for price movements and market opportunities.',
    },
    {
      icon: LineChart,
      title: 'Advanced Charting',
      description: 'Professional-grade tools for technical analysis and visualization.',
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden"
    >
      <div className="absolute top-20 right-20 w-96 h-96 border border-white/5 rounded-full" />
      <div className="absolute bottom-20 left-20 w-96 h-96 border border-white/5 rounded-full" />

      <style>{`
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleInUp {
          0% {
            opacity: 0;
            transform: scaleY(0.8) translateY(40px);
          }
          100% {
            opacity: 1;
            transform: scaleY(1) translateY(0);
          }
        }

        .feature-card-animate {
          animation-fill-mode: both;
        }

        .feature-card-animate.left {
          animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-card-animate.right {
          animation: slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-card-animate.center {
          animation: scaleInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter opacity-100 animate-fadeIn">
            Features
          </h2>
          <p className="text-xl text-white/70 max-w-2xl opacity-100 animate-fadeIn">
            Powerful tools designed for modern investors who demand excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const position = index % 3 === 0 ? 'left' : index % 3 === 2 ? 'right' : 'center';
            const animationDelay = index * 100;

            return (
              <div
                key={feature.title}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className={`group border border-white/20 p-8 transition-all duration-300 cursor-pointer feature-card-animate ${position} ${
                  hoveredIndex === index ? 'bg-white text-black shadow-2xl scale-105' : 'bg-transparent hover:bg-white/5'
                } ${cardVisibility[index] ? '' : 'opacity-0'}`}
                style={{ animationDelay: `${animationDelay}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`mb-6 transition-all duration-300 ${hoveredIndex === index ? 'scale-110 -rotate-12' : ''}`}>
                  <Icon
                    className={`w-12 h-12 transition-colors ${
                      hoveredIndex === index ? 'text-black' : 'text-white'
                    }`}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p
                  className={`transition-colors ${
                    hoveredIndex === index ? 'text-black/70' : 'text-white/60'
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesPage;
