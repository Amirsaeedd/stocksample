import { TrendingUp } from 'lucide-react';

interface NavigationProps {
  currentSection: number;
}

function Navigation({ currentSection }: NavigationProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
          <TrendingUp className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">APEX</span>
        </div>

        <div className="flex gap-8">
          {['home', 'about', 'features', 'contact'].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`text-sm uppercase tracking-wider transition-colors ${
                currentSection === index ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
