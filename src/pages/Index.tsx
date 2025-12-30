import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Sidebar from '@/components/store/Sidebar';
import ServiceCard from '@/components/store/ServiceCard';
import VPNSection from '@/components/store/VPNSection';
import ESIMSection from '@/components/store/ESIMSection';

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
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = () => {
      const stored = localStorage.getItem('heystore_services');
      if (stored) {
        const parsedServices = JSON.parse(stored);
        console.log('Loaded services from localStorage:', parsedServices);
        setServices(parsedServices);
      } else {
        localStorage.setItem('heystore_services', JSON.stringify(defaultServices));
        setServices(defaultServices);
      }
    };

    loadServices();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'heystore_services') {
        loadServices();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
      return <VPNSection countries={vpnCountries} />;
    }

    if (activeSection === 'esim') {
      return <ESIMSection countries={esimCountries} />;
    }

    if (activeSection === 'business' || activeSection === 'business-cases' || activeSection === 'server' || activeSection === 'email') {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icon name="Construction" size={64} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              В разработке
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Раздел скоро будет доступен
            </p>
          </div>
        </div>
      );
    }

    const filteredServices = getFilteredServices();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedService === service.id}
            onClick={() => setSelectedService(service.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        menuItems={menuItems}
        activeSection={activeSection}
        expandedSections={expandedSections}
        onSectionChange={setActiveSection}
        onToggleSection={toggleSection}
        onAdminClick={() => navigate('/admin')}
      />

      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {menuItems.find(item => item.id === activeSection)?.title || 
                 menuItems.flatMap(item => item.submenu || []).find(sub => sub.id === activeSection)?.title || 
                 'Каталог'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {activeSection.includes('kyc') && 'Профессиональная активация digital-сервисов'}
                {activeSection === 'vpn' && 'Защищённое подключение к глобальным сервисам'}
                {activeSection === 'esim' && 'Виртуальные SIM-карты для международных регистраций'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
