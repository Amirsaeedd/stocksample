import { useEffect, useState, useRef } from 'react';
import { BarChart3, Users, Globe } from 'lucide-react';

function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: BarChart3, label: 'Markets Analyzed', value: '150+' },
    { icon: Users, label: 'Active Clients', value: '10K+' },
    { icon: Globe, label: 'Countries', value: '45+' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
            About APEX
          </h2>

          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                Founded on the principle that financial intelligence should be accessible,
                powerful, and intuitive, APEX has revolutionized how investors approach
                the stock market.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                We combine cutting-edge technology with deep market expertise to deliver
                insights that matter. Our platform empowers investors to make informed
                decisions with confidence.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 border-2 border-white/10 transform translate-x-4 translate-y-4" />
              <div className="relative bg-white/5 border-2 border-white/20 p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-white/70">
                  To democratize financial markets by providing sophisticated tools
                  and real-time insights that level the playing field for all investors.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`border border-white/20 p-8 text-center hover:bg-white/5 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Icon className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/60 uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
