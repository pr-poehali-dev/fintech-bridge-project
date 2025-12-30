import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ArnoldMascot from '@/components/ArnoldMascot';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const services = [
    {
      id: 'vpn',
      title: 'Бесплатный VPN',
      icon: 'Shield',
      x: '12%',
      y: '20%'
    },
    {
      id: 'kyc',
      title: 'Верификация КУС',
      icon: 'UserCheck',
      x: '88%',
      y: '20%'
    },
    {
      id: 'esim',
      title: 'Мировые eSIM',
      icon: 'Radio',
      x: '12%',
      y: '80%'
    },
    {
      id: 'business',
      title: 'IT для бизнеса',
      icon: 'Lightbulb',
      x: '88%',
      y: '80%'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-[#6B9AC4] dark:bg-[#4A7BA7] text-foreground min-h-screen">
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#6B9AC4]/95 dark:bg-[#4A7BA7]/95 backdrop-blur-sm border-b border-[#5A8AB4]/30">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-2xl text-[#2C3E50] dark:text-white">HEY, STORE!</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-white/10"
            >
              <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} className="text-[#2C3E50] dark:text-white" />
            </Button>
          </div>
        </header>

        <main className="pt-20">
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16">
            <div className="container mx-auto px-4 relative z-10">
              <div className="relative max-w-6xl mx-auto h-[800px]">
                <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <line 
                    x1="50%" 
                    y1="50%" 
                    x2="12%" 
                    y2="20%" 
                    stroke="#2C3E50" 
                    strokeWidth="2.5"
                    className="dark:stroke-white/50"
                    strokeLinecap="round"
                  />
                  <line 
                    x1="50%" 
                    y1="50%" 
                    x2="88%" 
                    y2="20%" 
                    stroke="#2C3E50" 
                    strokeWidth="2.5"
                    className="dark:stroke-white/50"
                    strokeLinecap="round"
                  />
                  <line 
                    x1="50%" 
                    y1="50%" 
                    x2="12%" 
                    y2="80%" 
                    stroke="#2C3E50" 
                    strokeWidth="2.5"
                    className="dark:stroke-white/50"
                    strokeLinecap="round"
                  />
                  <line 
                    x1="50%" 
                    y1="50%" 
                    x2="88%" 
                    y2="80%" 
                    stroke="#2C3E50" 
                    strokeWidth="2.5"
                    className="dark:stroke-white/50"
                    strokeLinecap="round"
                  />
                  
                  <image 
                    href="https://cdn.poehali.dev/files/2025-12-30 12.11.24.jpg"
                    x="20%"
                    y="38%"
                    width="60%"
                    height="24%"
                    preserveAspectRatio="xMidYMid meet"
                  />
                  
                  {services.map((service) => (
                    <g key={service.id}>
                      <circle
                        cx={service.x}
                        cy={service.y}
                        r="70"
                        fill="#6B9AC4"
                        className="dark:fill-[#4A7BA7]"
                        stroke="#2C3E50"
                        strokeWidth="3"
                        className="dark:stroke-white/60 cursor-pointer transition-all hover:r-75"
                      />
                      <circle
                        cx={service.x}
                        cy={service.y}
                        r="28"
                        fill="#5A8AB4"
                        className="dark:fill-[#3A6A97]"
                        stroke="#2C3E50"
                        strokeWidth="2"
                        className="dark:stroke-white/60"
                      />
                      <foreignObject 
                        x={`calc(${service.x} - 14px)`} 
                        y={`calc(${service.y} - 14px)`} 
                        width="28" 
                        height="28"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name={service.icon} size={20} className="text-[#2C3E50] dark:text-white" />
                        </div>
                      </foreignObject>
                    </g>
                  ))}
                </svg>
                
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="absolute transform -translate-x-1/2 translate-y-20 animate-fade-in pointer-events-none"
                    style={{ 
                      left: service.x, 
                      top: service.y,
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <p className="text-sm md:text-base font-medium text-[#2C3E50] dark:text-white text-center max-w-[140px] leading-tight">
                      {service.title}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 dark:bg-black/20 rounded-full text-sm font-medium text-[#2C3E50] dark:text-white backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Resource Center
                </div>
                <p className="mt-6 text-base md:text-lg text-[#2C3E50] dark:text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Цифровой мост для пользователей и предпринимателей из СНГ в глобальную финансовую экосистему
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white/10 dark:bg-black/10 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#2C3E50] dark:text-white">
                  Один интерфейс для B2C и B2B
                </h2>
                <p className="text-base md:text-lg text-[#2C3E50] dark:text-white/80 mb-16 text-center leading-relaxed max-w-3xl mx-auto">
                  Мы создаём инфраструктуру для доступа к глобальным финансовым сервисам. Спокойный, технический, экспертный подход к цифровой мобильности.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center group">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-[3px] border-[#2C3E50] dark:border-white/60 bg-[#6B9AC4] dark:bg-[#4A7BA7] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="Shield" size={36} className="text-[#2C3E50] dark:text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-[#2C3E50] dark:text-white">Бесплатный VPN</h3>
                    <p className="text-sm text-[#2C3E50] dark:text-white/70">Операционная безопасность и чистые IP</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-[3px] border-[#2C3E50] dark:border-white/60 bg-[#6B9AC4] dark:bg-[#4A7BA7] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="UserCheck" size={36} className="text-[#2C3E50] dark:text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-[#2C3E50] dark:text-white">Верификация КУС</h3>
                    <p className="text-sm text-[#2C3E50] dark:text-white/70">Быстрый старт без барьеров</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-[3px] border-[#2C3E50] dark:border-white/60 bg-[#6B9AC4] dark:bg-[#4A7BA7] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="Radio" size={36} className="text-[#2C3E50] dark:text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-[#2C3E50] dark:text-white">Мировые eSIM</h3>
                    <p className="text-sm text-[#2C3E50] dark:text-white/70">Зарубежные номера и мобильность</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-[3px] border-[#2C3E50] dark:border-white/60 bg-[#6B9AC4] dark:bg-[#4A7BA7] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="Lightbulb" size={36} className="text-[#2C3E50] dark:text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-[#2C3E50] dark:text-white">IT для бизнеса</h3>
                    <p className="text-sm text-[#2C3E50] dark:text-white/70">B2B инфраструктура и масштабирование</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-12 border-t border-[#2C3E50]/20 dark:border-white/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-bold text-xl text-[#2C3E50] dark:text-white">HEY, STORE!</span>
              
              <div className="flex items-center gap-6 text-sm text-[#2C3E50] dark:text-white/80">
                <a href="https://blog.heystore.net" target="_blank" rel="noopener noreferrer" className="hover:text-[#2C3E50] dark:hover:text-white transition-colors">
                  Блог
                </a>
                <a href="#" className="hover:text-[#2C3E50] dark:hover:text-white transition-colors">
                  Документация
                </a>
                <a href="#" className="hover:text-[#2C3E50] dark:hover:text-white transition-colors">
                  Поддержка
                </a>
              </div>
              
              <p className="text-sm text-[#2C3E50] dark:text-white/80">
                © 2024 HEY, STORE!
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;