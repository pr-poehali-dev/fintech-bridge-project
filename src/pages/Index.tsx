import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Service {
  id: string;
  name: string;
  type: string;
  category: string;
  icon: string;
  description: string;
  price: string;
  cta: string;
  backgroundImage?: string;
  logoSvg?: string;
}

const defaultServices: Service[] = [
  { id: 'wise', name: 'Wise', type: 'Финтех', category: 'kyc-fintech', icon: 'CreditCard', description: 'Мультивалютный банк с IBAN', price: '120 USDT', cta: 'Подключить' },
  { id: 'revolut', name: 'Revolut', type: 'Финтех', category: 'kyc-fintech', icon: 'Wallet', description: 'Швейцарский нож финансов', price: '350 USDT', cta: 'Подключить' },
  { id: 'payoneer', name: 'Payoneer', type: 'Финтех', category: 'kyc-fintech', icon: 'Briefcase', description: 'Платежи для фрилансеров', price: '100 USDT', cta: 'Подключить' },
  { id: 'grey', name: 'Grey', type: 'Финтех', category: 'kyc-fintech', icon: 'Building2', description: 'Аналог Wise с USD-картой', price: '120 USDT', cta: 'Подключить' },
  { id: 'neteller', name: 'Neteller', type: 'Финтех', category: 'kyc-fintech', icon: 'DollarSign', description: 'Электронный кошелёк', price: '120 USDT', cta: 'Подключить' },
  { id: 'skrill', name: 'Skrill', type: 'Финтех', category: 'kyc-fintech', icon: 'Wallet2', description: 'Платёжная система', price: '120 USDT', cta: 'Подключить' },
  { id: 'bybit', name: 'Bybit', type: 'Криптобиржа', category: 'kyc-crypto', icon: 'Bitcoin', description: 'Виртуальная карта с V2', price: '45 USDT', cta: 'Подключить' },
  { id: 'bitget', name: 'Bitget', type: 'Криптобиржа', category: 'kyc-crypto', icon: 'Coins', description: 'Биржа с IBAN FR/DE', price: '120 USDT', cta: 'Подключить' },
  { id: 'kraken', name: 'Kraken', type: 'Криптобиржа', category: 'kyc-crypto', icon: 'TrendingUp', description: 'Торговля криптовалютой', price: '100 USDT', cta: 'Подключить' },
  { id: 'redotpay', name: 'RedotPay', type: 'Крипто-карта', category: 'kyc-crypto', icon: 'CreditCard', description: 'Крипто → фиат карта', price: '40 USDT', cta: 'Подключить' },
  { id: 'etherfi', name: 'Ether.fi', type: 'Крипто-карта', category: 'kyc-crypto', icon: 'Sparkles', description: 'Стейкинг + карта в Apple Pay', price: '100 USDT', cta: 'Подключить' },
  { id: 'tuyo', name: 'TUYO', type: 'Крипто-карта', category: 'kyc-crypto', icon: 'Zap', description: 'Шлюз фиат ⇄ крипта без комиссий', price: '150 USDT', cta: 'Подключить' },
  { id: 'paypal', name: 'PayPal', type: 'Платформа', category: 'kyc-platforms', icon: 'ShoppingBag', description: 'Онлайн платежи + Perplexity Pro', price: '120 USDT', cta: 'Подключить' },
  { id: 'spenda', name: 'Spenda', type: 'Платформа', category: 'kyc-platforms', icon: 'CreditCard', description: 'USD/NGN карта для подписок', price: '90 USDT', cta: 'Подключить' },
  { id: 'hexacard', name: 'HexaCard', type: 'Платформа', category: 'kyc-platforms', icon: 'Sparkle', description: 'Турецкие цены на подписки', price: '150 USDT', cta: 'Подключить' }
];

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('kyc');
  const [expandedSections, setExpandedSections] = useState<string[]>(['kyc']);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('heystore_services');
    if (stored) {
      setServices(JSON.parse(stored));
    } else {
      localStorage.setItem('heystore_services', JSON.stringify(defaultServices));
      setServices(defaultServices);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const vpnCountries = [
    { flag: '🇪🇸', name: 'Испания', premium: false },
    { flag: '🇩🇪', name: 'Германия', premium: true },
    { flag: '🇮🇹', name: 'Италия', premium: true },
    { flag: '🇸🇪', name: 'Швеция', premium: true },
    { flag: '🇬🇧', name: 'Великобритания', premium: true },
    { flag: '🇮🇱', name: 'Израиль', premium: true },
    { flag: '🇸🇬', name: 'Сингапур', premium: true }
  ];

  const esimCountries = [
    { flag: '🇬🇧', name: 'Великобритания', code: '+44' },
    { flag: '🇦🇺', name: 'Австралия', code: '+61' },
    { flag: '🇨🇦', name: 'Канада', code: '+1' },
    { flag: '🇺🇸', name: 'США', code: '+1' }
  ];

  const menuItems = [
    {
      id: 'kyc',
      title: 'Активация сервисов',
      icon: 'UserCheck',
      hasSubmenu: true,
      submenu: [
        { id: 'kyc-fintech', title: 'Финтехи и банки', icon: 'Building' },
        { id: 'kyc-crypto', title: 'Криптобиржи', icon: 'Bitcoin' },
        { id: 'kyc-platforms', title: 'Платформы', icon: 'Globe' }
      ]
    },
    {
      id: 'vpn',
      title: 'Премиум VPN',
      badge: 'FREE',
      icon: 'Shield',
      hasSubmenu: false
    },
    {
      id: 'esim',
      title: 'Мировые eSIM',
      icon: 'Smartphone',
      hasSubmenu: false
    },
    {
      id: 'business',
      title: 'IT для бизнеса',
      icon: 'Laptop',
      hasSubmenu: false
    },
    {
      id: 'business-cases',
      title: 'Кейсы',
      icon: 'Briefcase',
      hasSubmenu: false,
      isSubitem: true
    },
    {
      id: 'server',
      title: 'Аренда сервера',
      icon: 'Server',
      hasSubmenu: false
    },
    {
      id: 'email',
      title: 'Почта',
      icon: 'Mail',
      hasSubmenu: false
    }
  ];

  const toggleSection = (id: string) => {
    if (expandedSections.includes(id)) {
      setExpandedSections(expandedSections.filter(s => s !== id));
    } else {
      setExpandedSections([...expandedSections, id]);
    }
  };

  const getFilteredServices = () => {
    if (activeSection === 'kyc') {
      return services;
    }
    return services.filter(s => s.category === activeSection);
  };

  const renderContent = () => {
    if (activeSection === 'vpn') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <p className="text-blue-900 dark:text-blue-100 text-sm">
              Защищённое соединение с чистыми IP-адресами для доступа к глобальным сервисам
            </p>
          </div>

          <div className="space-y-3">
            {vpnCountries.map((country) => (
              <button
                key={country.name}
                className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{country.flag}</span>
                  <span className="text-lg font-medium text-white">{country.name}</span>
                </div>
                {country.premium && (
                  <span className="text-2xl">💎</span>
                )}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
            <Icon name="Gem" size={48} className="mx-auto mb-3 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Premium доступ
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Получите доступ ко всем серверам с символом 💎
            </p>
            <Button className="w-full">
              Подключить Premium
            </Button>
          </div>
        </div>
      );
    }

    if (activeSection === 'esim') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <p className="text-blue-900 dark:text-blue-100 text-sm">
              Зарубежные номера телефонов для регистрации в международных сервисах
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {esimCountries.map((country) => (
              <div
                key={country.name}
                className="flex flex-col items-center justify-center px-6 py-8 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-blue-500"
              >
                <span className="text-6xl mb-4">{country.flag}</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {country.name}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {country.code}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Скоро: глобальный eSIM</h3>
            <p className="text-sm opacity-90">
              Единая SIM-карта для всех стран мира
            </p>
          </div>
        </div>
      );
    }

    const filteredServices = getFilteredServices();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`
              group relative rounded-xl overflow-hidden h-[280px] flex flex-col
              border-2 transition-all duration-200 text-left
              hover:shadow-lg hover:-translate-y-0.5
              ${selectedService === service.id 
                ? 'border-blue-500 shadow-lg' 
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }
            `}
          >
            {service.backgroundImage && (
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${service.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
            
            <div className={`relative z-10 p-5 flex flex-col h-full ${service.backgroundImage ? 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm' : 'bg-white dark:bg-gray-800'}`}>
              <div className="flex items-start justify-between mb-3">
                {service.logoSvg ? (
                  <div className="w-14 h-14 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-700 p-2 flex items-center justify-center">
                    <img src={service.logoSvg} alt={service.name} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <Icon name={service.icon} size={22} className="text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {service.name}
              </h3>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {service.type}
              </p>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex-1 line-clamp-2">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-100 dark:border-gray-700">
                <span className="text-base font-bold text-gray-900 dark:text-white">
                  {service.price}
                </span>
                <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                  {service.cta}
                  <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-[#1a1a1a] text-foreground min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Арнольд слева */}
              <svg width="60" height="30" viewBox="0 0 974.28 376.03" className="flex-shrink-0">
                <defs>
                  <style>
                    {`.cls-1 { fill: #00adee; }
                    .cls-2 { fill: #fcd2b3; }
                    .cls-3 { fill: #fff; }
                    .cls-4 { fill: #faaf3f; }
                    .cls-5 { fill: #2e2e2e; }`}
                  </style>
                </defs>
                <g id="hairs">
                  <path className="cls-4" d="M479.88,162.77c-42.38,1.38-77.88,7.12-104.57,12.95-34.05,7.44-75.67,16.84-123.04,42.85-12.43,6.83-37.8,21.38-66.41,44.84-14.87,12.19-26.85,23.68-35.9,33-.47-.59-1.23-1.4-2.34-2.12-.97-.63-1.89-.98-2.56-1.18-2.05-.93-4.85-2.09-8.27-3.18,0,0-4.97-1.46-10.68-2.58-18.77-3.68-35.15-2.64-46.99-.75,2.3-2.28,4.78-4.56,7.45-6.8,16.38-13.65,33.94-20.54,48.11-24.16-2.14-2.49-5.58-5.94-10.44-9.06-8.17-5.22-16.04-6.64-23.12-7.55-21.71-2.78-44.61-1.69-53.69-1.13,1.9-3.01,4.82-7.21,8.95-11.71,12.85-14.06,27.25-20,37.67-24.18,8.01-3.21,19.77-7.01,34.65-8.68-2.32-1.76-5.91-4.34-10.53-7.05,0,0-13.37-7.82-31.69-12.2-16.6-3.98-47.35-6.73-86.47-3.93,2.23-2.82,5.38-6.58,9.37-10.78,2.41-2.53,13.63-14.17,31.95-25.9,20.02-12.81,37.53-18.71,43.89-20.7,12.63-3.98,23.7-5.92,31.95-6.92-4.11-4.38-9.75-9.76-17.05-15.1-2.12-1.58-11.38-8.25-24.28-13.81-20.82-9.02-40.81-10.69-53.27-10.8,4.98-1.69,11.98-4,20.46-6.46,18.28-5.33,44.67-13.06,76.7-15.55,17.78-1.38,42.82-1.58,72.86,3.89-2.12-3.55-4.66-7.19-7.65-10.78-16.16-19.39-37.13-27.25-49.87-30.64,3.01-.61,7.43-1.45,12.79-2.17,25.1-3.34,51.35-1.63,84.37,7.34,105.73,28.68,188.83,95.8,188.83,95.8,21.89,17.7,39.59,34.83,53.27,49.24,1.92,2.06,3.77,4.05,5.56,5.97Z"/>
                </g>
                <path id="face" className="cls-2" d="M855.77,332.61c-5.98,9.58-15.2,12.75-18.19,13.74-10.42,3.41-19.39.84-34.39-3.68-7.16-2.17-16.98-5.74-28.09-11.73-76.96,21.91-183.3,43.74-310.93,45.03-127.01,1.29-233.3-18.18-310.49-38.39-1.85,1.65-4.6,3.86-8.21,6.03-7.97,4.77-15.11,6.21-20.13,7.19-11.76,2.24-20.57,1.02-22.36.75-6.07-.9-9.86-1.47-13.81-4.54-.8-.63-7.65-6.12-8.19-15.48-.36-6.24,2.3-10.83,3.73-13.2,4.17-7.01,10.22-10.08,15.66-12.86,13.5-6.87,25.8-6.21,28.32-6.03,7.5.52,13.43,2.55,17.16,4.16,1.03-1.81,2.08-3.64,3.1-5.45.33-.59.67-1.15,1-1.74-.31-.29,20.89-21.06,35.9-33,9.8-7.77,34.88-27.5,66.41-44.84,47.37-26.01,88.99-35.41,123.04-42.85,26.69-5.83,62.19-11.57,104.57-12.95.83.93,1.65,1.83,2.45,2.71,3.59.43,7.16.88,10.76,1.31,16.89,2.08,33.81,4.14,50.7,6.21.65.07,1.32.16,1.96.25,4.42.52,8.79,1.06,13.21,1.6.04-.88.09-1.83.18-2.85,5.09,1.36,11.67,3.25,19.79,5.6,16.27,4.7,40.84,11.89,72.03,25.83,25,11.18,28.36,15.22,83.66,47.12,0,0,31.87,18.39,46.44,35.84.03.03,1.31,1.58,3.08,3.68,1.01,1.21,1.87,2.23,2.52,3.01,3.61-2.06,8.99-4.72,15.89-6.69,8.46-2.42,23.63-6.73,38.34.66,3.57,1.81,15.33,7.73,18.86,21.11,3.26,12.47-2.92,22.76-3.97,24.43Z"/>
                <path id="hat" className="cls-1" d="M577.28,152.58c-5.63,2.51-13.52,16.82-18.32,22.29-2.35,2.68-4.65,4.26-6.4,5.45-5.17,3.54-10.04,4.73-13.39,6.05-10.96,4.29-20.98,5.13-36.73,6.46-.54.05-4.73.29-13.14.79,0,0-13.1.77-30.53-.38-3.75-.25-8.01-.61-10.26-3.73-.91-1.27-1.99-3.71-1.34-6.46.51-2.21,1.92-3.59,2.5-4.11,7.79-5.18,15.6-10.35,23.39-15.53.2-1.54.54-3.84,1.27-6.6,1.45-5.67,4.44-13.31,10.67-20.5,7.7-8.86,16.38-12.5,19.1-13.54,10.04-3.84,18.83-3.25,23.07-2.67.56-.97,1.58-2.37,3.3-3.34,4.35-2.49,11.14-1.02,12.72,2.82.29.68.6,1.94.07,3.86,1.47.47,3.55,1.22,5.96,2.33,1.67.77,7.16,3.35,12.79,7.93,8.15,6.63,12.93,14.43,15.29,18.87Z"/>
                <path className="cls-4" d="M974.28,184.28c-4.82-.43-11.65-.9-19.84-.99-6.87-.09-31.11-.09-63.46,7.03-12.01,2.64-22.74,5.02-36.71,10.71-13.9,5.7-24.9,12.18-32.74,17.42,3.28.47,7.85,1.29,13.23,2.67,4.73,1.22,15.33,3.95,24.46,9.04,5.47,3.05,16.71,10.46,26.13,26.78-3.93-.7-9.64-1.45-16.54-1.33-19.14.31-33.2,7-45.61,13.06-9.54,4.66-22.69,12.26-36.55,24.44-20.39-16.28-38.58-29.05-52.87-38.52-17.29-11.45-46.05-30.31-83.66-47.12-31.2-13.94-55.76-21.13-72.03-25.83-8.12-2.35-14.71-4.25-19.79-5.6,10.52-20.82,26.27-46.34,49.77-71.6,48.86-52.54,104.42-75.19,135.29-85.01,0,0,51.77-16.47,111.15-19.01,7.12-.29,14.26-.38,14.26-.38,9.15-.09,17.16.11,23.63.38-14.37,3.5-25.37,8.34-32.85,12.18-8.17,4.23-13.95,8.18-24.41,15.37-11.54,7.91-21,15.39-25.39,18.87-3.44,2.71-6.27,5.04-8.28,6.71,17.49-1.15,32.4-.34,43.78.84,16.36,1.72,28.56,4.61,37.89,6.82,15.02,3.59,25.8,6.21,38.74,11.96,9.97,4.43,24.26,12.07,39.5,25.42-5.49.41-12.45,1.11-20.48,2.35-7.45,1.13-20.53,3.48-35.7,8.02-13.5,4.05-32.4,10.98-53.89,23.1,5.04.14,11.98.52,20.17,1.67,16.58,2.35,28.81,6.53,38,9.72,12.54,4.34,20.91,7.25,31.08,13.06,8.64,4.95,21.15,13.45,33.72,27.77Z"/>
                <path id="eye_l" className="cls-3" d="M224.38,261.34c13.15-4.15,81.69-14.86,96.18-14.87,1.23,1.97,2.79,5,3.67,8.92.86,3.87.33,14.14-3.48,21.89-5.57,11.33-19.23,19.59-35.67,21.33-25.77,4.51-48.62-3.51-57.07-19.61-1.81-3.46-3.99-9.23-3.62-17.67Z"/>
                <path id="eye_r" className="cls-3" d="M581.13,239.64c15.83,2.13,79.87,12.22,95.16,14.97-.03,1.23-.16,2.96-.66,4.95-3.92,15.72-24.81,25.26-41.21,26.67-17.45,1.51-34.49-5.8-43.9-16.78-2.25-2.63-7.17-8.37-9.04-17.43-1.05-5.11-.76-9.5-.35-12.38Z"/>
                <circle className="cls-5" cx="621.88" cy="266.02" r="14.8"/>
                <circle className="cls-5" cx="289.26" cy="273.77" r="14.8"/>
              </svg>
              
              <span className="font-bold text-2xl text-gray-900 dark:text-white">HEY, STORE!</span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} className="text-gray-900 dark:text-white" />
            </Button>
          </div>
        </header>

        <div className="flex pt-[73px]">
          {/* Левая навигация */}
          <aside className="fixed left-0 top-[73px] bottom-0 w-72 bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
            <nav className="px-3 py-4">
              {menuItems.map((item) => {
                if (item.isSubitem) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`
                        w-full flex items-center pl-11 pr-3 py-2 rounded-md mb-1 relative
                        transition-colors duration-150
                        ${activeSection === item.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <Icon name={item.icon} size={18} className="absolute left-11 flex-shrink-0" />
                      <span className="text-sm font-medium ml-7">{item.title}</span>
                    </button>
                  );
                }

                return (
                  <div key={item.id} className="mb-1">
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        if (item.hasSubmenu) toggleSection(item.id);
                      }}
                      className={`
                        w-full flex items-center px-3 py-2 rounded-md relative
                        transition-colors duration-150
                        ${activeSection === item.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <Icon name={item.icon} size={20} className="absolute left-3 flex-shrink-0" />
                      <span className="font-medium ml-8">{item.title}</span>
                      {(item.badge || item.hasSubmenu) && (
                        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-xs font-semibold bg-blue-500 text-white rounded">
                              {item.badge}
                            </span>
                          )}
                          {item.hasSubmenu && (
                            <Icon 
                              name="ChevronDown" 
                              size={16}
                              className={`transition-transform duration-200 ${expandedSections.includes(item.id) ? 'rotate-180' : ''}`}
                            />
                          )}
                        </div>
                      )}
                    </button>

                    {/* Подменю */}
                    {item.hasSubmenu && expandedSections.includes(item.id) && (
                      <div className="mt-1">
                        {item.submenu?.map((subitem) => (
                          <button
                            key={subitem.id}
                            onClick={() => setActiveSection(subitem.id)}
                            className={`
                              w-full flex items-center pl-11 pr-3 py-2 rounded-md mb-1 relative
                              transition-colors duration-150
                              ${activeSection === subitem.id
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                              }
                            `}
                          >
                            <Icon name={subitem.icon} size={18} className="absolute left-11 flex-shrink-0" />
                            <span className="text-sm ml-7">{subitem.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Основной контент */}
          <main className="ml-72 flex-1 flex">
            <div className="flex-1 p-8 pr-0 pb-16">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {menuItems.find(m => m.id === activeSection)?.title || 
                   menuItems.flatMap(m => m.submenu || []).find(s => s.id === activeSection)?.title}
                </h1>
                {activeSection !== 'vpn' && activeSection !== 'esim' && (
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Цифровой мост для пользователей и предпринимателей из СНГ в глобальную финансовую экосистему
                  </p>
                )}
              </div>

              {renderContent()}
            </div>

            {/* Правый сайдбар */}
            <aside className="w-80 p-8 border-l border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
              <div className="sticky top-24">
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <Icon name="Info" size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Выберите сервис для<br />просмотра деталей
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </main>
        </div>

        <footer className="ml-72 py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-bold text-xl text-gray-900 dark:text-white">HEY, STORE!</span>
              
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <a href="https://blog.heystore.net" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Блог
                </a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Документация
                </a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Поддержка
                </a>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
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