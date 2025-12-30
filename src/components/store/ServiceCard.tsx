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

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onClick: () => void;
}

const ServiceCard = ({ service, isSelected, onClick }: ServiceCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative rounded-xl overflow-hidden h-[280px] flex flex-col
        border-2 transition-all duration-200 text-left
        hover:shadow-lg hover:-translate-y-0.5
        ${isSelected 
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
  );
};

export default ServiceCard;
