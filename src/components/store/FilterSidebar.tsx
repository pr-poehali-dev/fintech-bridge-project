import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface FilterSidebarProps {
  onFiltersChange: (filters: Filters) => void;
}

export interface Filters {
  paymentMethods: {
    visa: boolean;
    mastercard: boolean;
    applePay: boolean;
    googlePay: boolean;
  };
  features: {
    cardReissue: boolean;
    highPaymentApproval: boolean;
    cryptoSupport: boolean;
  };
  accounts: {
    sepa: boolean;
    eurIban: boolean;
    swift: boolean;
    usdAch: boolean;
  };
  currencies: string[];
  billingRegions: string[];
}

const FilterSidebar = ({ onFiltersChange }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<Filters>({
    paymentMethods: {
      visa: false,
      mastercard: false,
      applePay: false,
      googlePay: false,
    },
    features: {
      cardReissue: false,
      highPaymentApproval: false,
      cryptoSupport: false,
    },
    accounts: {
      sepa: false,
      eurIban: false,
      swift: false,
      usdAch: false,
    },
    currencies: [],
    billingRegions: [],
  });

  const updateFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const togglePaymentMethod = (method: keyof Filters['paymentMethods']) => {
    const newFilters = {
      ...filters,
      paymentMethods: {
        ...filters.paymentMethods,
        [method]: !filters.paymentMethods[method],
      },
    };
    updateFilters(newFilters);
  };

  const toggleFeature = (feature: keyof Filters['features']) => {
    const newFilters = {
      ...filters,
      features: {
        ...filters.features,
        [feature]: !filters.features[feature],
      },
    };
    updateFilters(newFilters);
  };

  const resetFilters = () => {
    const emptyFilters: Filters = {
      paymentMethods: {
        visa: false,
        mastercard: false,
        applePay: false,
        googlePay: false,
      },
      features: {
        cardReissue: false,
        highPaymentApproval: false,
        cryptoSupport: false,
      },
      accounts: {
        sepa: false,
        eurIban: false,
        swift: false,
        usdAch: false,
      },
      currencies: [],
      billingRegions: [],
    };
    updateFilters(emptyFilters);
  };

  const toggleAccount = (account: keyof Filters['accounts']) => {
    const newFilters = {
      ...filters,
      accounts: {
        ...filters.accounts,
        [account]: !filters.accounts[account],
      },
    };
    updateFilters(newFilters);
  };

  const hasActiveFilters = 
    Object.values(filters.paymentMethods).some(v => v) ||
    Object.values(filters.features).some(v => v) ||
    Object.values(filters.accounts).some(v => v) ||
    filters.currencies.length > 0 ||
    filters.billingRegions.length > 0;

  return (
    <aside className="w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Фильтры
          </h2>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Сбросить
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Подбор по признакам
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Способы оплаты
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.paymentMethods.visa}
                onChange={() => togglePaymentMethod('visa')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <Icon name="CreditCard" size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">VISA</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.paymentMethods.mastercard}
                onChange={() => togglePaymentMethod('mastercard')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <Icon name="CreditCard" size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Mastercard</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.paymentMethods.applePay}
                onChange={() => togglePaymentMethod('applePay')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm">🍎</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Apple Pay</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.paymentMethods.googlePay}
                onChange={() => togglePaymentMethod('googlePay')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <Icon name="Smartphone" size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Google Pay</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Возможности
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.features.cardReissue}
                onChange={() => toggleFeature('cardReissue')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <Icon name="RefreshCw" size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Перевыпуск карт</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.features.highPaymentApproval}
                onChange={() => toggleFeature('highPaymentApproval')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <Icon name="TrendingUp" size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Высокая проходимость</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.features.cryptoSupport}
                onChange={() => toggleFeature('cryptoSupport')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <Icon name="Coins" size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Поддержка крипты</span>
            </label>

          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Счета
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.accounts.sepa}
                onChange={() => toggleAccount('sepa')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <Icon name="Building2" size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">SEPA</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.accounts.eurIban}
                onChange={() => toggleAccount('eurIban')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <Icon name="CreditCard" size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">EUR IBAN</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.accounts.swift}
                onChange={() => toggleAccount('swift')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <Icon name="Zap" size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">SWIFT</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.accounts.usdAch}
                onChange={() => toggleAccount('usdAch')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <Icon name="DollarSign" size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">USD ACH</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;