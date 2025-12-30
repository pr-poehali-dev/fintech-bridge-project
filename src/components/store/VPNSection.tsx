import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VPNCountry {
  flag: string;
  name: string;
  premium: boolean;
}

interface VPNSectionProps {
  countries: VPNCountry[];
}

const VPNSection = ({ countries }: VPNSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <p className="text-blue-900 dark:text-blue-100 text-sm">
          Защищённое соединение с чистыми IP-адресами для доступа к глобальным сервисам
        </p>
      </div>

      <div className="space-y-3">
        {countries.map((country) => (
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
};

export default VPNSection;
