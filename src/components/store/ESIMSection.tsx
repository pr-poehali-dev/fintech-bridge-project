import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ESIMCountry {
  flag: string;
  name: string;
  code: string;
}

interface ESIMSectionProps {
  countries: ESIMCountry[];
}

const ESIMSection = ({ countries }: ESIMSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <p className="text-blue-900 dark:text-blue-100 text-sm">
          Зарубежные номера телефонов для регистрации в международных сервисах
        </p>
      </div>

      <div className="space-y-3">
        {countries.map((country) => (
          <button
            key={country.name}
            className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{country.flag}</span>
              <div className="text-left">
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {country.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {country.code}
                </div>
              </div>
            </div>
            <Icon name="Phone" size={20} className="text-gray-400" />
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
            <Icon name="Smartphone" size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Как это работает?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>Виртуальная SIM-карта активируется мгновенно</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>Поддержка SMS для подтверждений</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>Работает на любом смартфоне с eSIM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Button className="w-full">
        Заказать eSIM
      </Button>
    </div>
  );
};

export default ESIMSection;
