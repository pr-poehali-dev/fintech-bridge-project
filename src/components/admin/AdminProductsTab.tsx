import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ServiceForm from './ServiceForm';

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
  priority?: number;
}

interface AdminProductsTabProps {
  services: Service[];
  editingService: Service | null;
  isAddingNew: boolean;
  darkMode: boolean;
  onAddNew: () => void;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onSave: (service: Service) => void;
  onCancel: () => void;
  onPriorityChange: (id: string, direction: 'up' | 'down') => void;
}

const AdminProductsTab = ({
  services,
  editingService,
  isAddingNew,
  darkMode,
  onAddNew,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onPriorityChange
}: AdminProductsTabProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Управление товарами
        </h2>
        <Button onClick={onAddNew}>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить товар
        </Button>
      </div>

      {(editingService || isAddingNew) && editingService && (
        <ServiceForm
          service={editingService}
          onSave={onSave}
          onCancel={onCancel}
          darkMode={darkMode}
        />
      )}

      <div className="grid grid-cols-1 gap-4 mt-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="relative">
              {service.backgroundImage && (
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url(${service.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%'
                  }}
                />
              )}
              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {service.logoSvg ? (
                      <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 bg-white dark:bg-gray-900 rounded-lg p-2">
                        <img src={service.logoSvg} alt={service.name} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                        <Icon name={service.icon} size={24} className="text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {service.type} • {service.category}
                      </p>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 space-y-1">
                        {service.line1 && <p>{service.line1}</p>}
                        {service.line2 && <p>{service.line2}</p>}
                        {service.line3 && <p>{service.line3}</p>}
                        {!service.line1 && !service.line2 && !service.line3 && <p>{service.description}</p>}
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {service.price}
                      </p>
                      {(service.backgroundImage || service.logoSvg) && (
                        <div className="flex gap-2 mt-2">
                          {service.backgroundImage && (
                            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                              Фон
                            </span>
                          )}
                          {service.logoSvg && (
                            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                              Логотип
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPriorityChange(service.id, 'up')}
                        className="h-8 px-2"
                      >
                        <Icon name="ChevronUp" size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPriorityChange(service.id, 'down')}
                        className="h-8 px-2"
                      >
                        <Icon name="ChevronDown" size={14} />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(service)}
                    >
                      <Icon name="Pencil" size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(service.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsTab;