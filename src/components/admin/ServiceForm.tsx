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
  line1?: string;
  line2?: string;
  line3?: string;
  price: string;
  cta: string;
  backgroundImage?: string;
  logoSvg?: string;
  acceptsVisa?: boolean;
  acceptsMastercard?: boolean;
  acceptsApplePay?: boolean;
  acceptsGooglePay?: boolean;
  cardReissue?: boolean;
  highPaymentApproval?: boolean;
  cryptoSupport?: boolean;
  sepaIban?: boolean;
  achUsd?: boolean;
  supportedCurrencies?: string[];
  swift?: boolean;
  billingRegions?: string[];
  cardBillingCountries?: string[];
  priority?: number;
}

interface ServiceFormProps {
  service: Service;
  onSave: (service: Service) => void;
  onCancel: () => void;
  darkMode: boolean;
}

const API_URL = 'https://functions.poehali.dev/692cf256-c3fb-49b8-9844-ae94296d195a';

interface Country {
  code: string;
  name: string;
  flag: string;
}

const ServiceForm = ({ service, onSave, onCancel, darkMode }: ServiceFormProps) => {
  const [formData, setFormData] = useState<Service>(service);
  const [backgroundPreview, setBackgroundPreview] = useState<string | undefined>(service.backgroundImage);
  const [logoPreview, setLogoPreview] = useState<string | undefined>(service.logoSvg);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    setFormData(service);
    setBackgroundPreview(service.backgroundImage);
    setLogoPreview(service.logoSvg);
  }, [service]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${API_URL}?resource=countries`);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'background' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'background') {
          setBackgroundPreview(result);
          setFormData({ ...formData, backgroundImage: result });
        } else {
          setLogoPreview(result);
          setFormData({ ...formData, logoSvg: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {service.name ? 'Редактировать товар' : 'Добавить товар'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Название
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Категория
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              >
                <option value="kyc-fintech">Финтехи и банки</option>
                <option value="kyc-crypto">Криптобиржи</option>
                <option value="kyc-platforms">Платформы</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Иконка
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="CreditCard"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Приоритет (чем выше, тем выше в списке)
              </label>
              <input
                type="number"
                value={formData.priority || 0}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Описание (общее, используется если строки не заполнены)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              rows={2}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Строки описания (гибкое управление)
            </label>
            <div>
              <input
                type="text"
                value={formData.line1 || ''}
                onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="Строка 1"
              />
            </div>
            <div>
              <input
                type="text"
                value={formData.line2 || ''}
                onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="Строка 2"
              />
            </div>
            <div>
              <input
                type="text"
                value={formData.line3 || ''}
                onChange={(e) => setFormData({ ...formData, line3: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="Строка 3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Цена
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Способы оплаты и карты
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.acceptsVisa || false}
                    onChange={(e) => setFormData({ ...formData, acceptsVisa: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">VISA</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.acceptsMastercard || false}
                    onChange={(e) => setFormData({ ...formData, acceptsMastercard: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">Mastercard</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.acceptsApplePay || false}
                    onChange={(e) => setFormData({ ...formData, acceptsApplePay: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">Apple Pay</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.acceptsGooglePay || false}
                    onChange={(e) => setFormData({ ...formData, acceptsGooglePay: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">Google Pay</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Возможности и функции
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.cardReissue || false}
                    onChange={(e) => setFormData({ ...formData, cardReissue: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">Перевыпуск карт</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.highPaymentApproval || false}
                    onChange={(e) => setFormData({ ...formData, highPaymentApproval: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">Высокая проходимость</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.cryptoSupport || false}
                    onChange={(e) => setFormData({ ...formData, cryptoSupport: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">Поддержка крипты</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.sepaIban || false}
                    onChange={(e) => setFormData({ ...formData, sepaIban: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">SEPA IBAN</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.achUsd || false}
                    onChange={(e) => setFormData({ ...formData, achUsd: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">ACH USD</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.swift || false}
                    onChange={(e) => setFormData({ ...formData, swift: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">SWIFT</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Валюты (через запятую)
              </label>
              <input
                type="text"
                value={formData.supportedCurrencies?.join(', ') || ''}
                onChange={(e) => setFormData({ ...formData, supportedCurrencies: e.target.value.split(',').map(c => c.trim()).filter(Boolean) })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="USD, EUR, GBP"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Регионы биллинга (через запятую)
              </label>
              <input
                type="text"
                value={formData.billingRegions?.join(', ') || ''}
                onChange={(e) => setFormData({ ...formData, billingRegions: e.target.value.split(',').map(r => r.trim()).filter(Boolean) })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="Европа, США"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Текст кнопки
            </label>
            <input
              type="text"
              value={formData.cta}
              onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Адрес карт
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {countries.map((country) => (
                <label key={country.code} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.cardBillingCountries?.includes(country.code) || false}
                    onChange={(e) => {
                      const currentCountries = formData.cardBillingCountries || [];
                      const newCountries = e.target.checked
                        ? [...currentCountries, country.code]
                        : currentCountries.filter(c => c !== country.code);
                      setFormData({ ...formData, cardBillingCountries: newCountries });
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm text-gray-900 dark:text-white">{country.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Визуальное оформление
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Фоновое изображение (любой формат)
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Изображение будет растянуто на всю карточку в полной яркости. Нижняя полоска с ценой останется белой.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'background')}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {backgroundPreview && (
                  <div className="mt-2 relative">
                    <div className="w-full aspect-video bg-white dark:bg-gray-800 rounded-lg overflow-hidden relative">
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${backgroundPreview})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                          Превью (100% яркость)
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setBackgroundPreview(undefined);
                        setFormData({ ...formData, backgroundImage: undefined });
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  SVG логотип (100x100 рекомендуется)
                </label>
                <input
                  type="file"
                  accept=".svg,image/svg+xml"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {logoPreview && (
                  <div className="mt-2 relative inline-block">
                    <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-2 flex items-center justify-center">
                      <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLogoPreview(undefined);
                        setFormData({ ...formData, logoSvg: undefined });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onCancel}>
              Отмена
            </Button>
            <Button type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;