import Icon from '@/components/ui/icon';
import MastercardLogo from '@/components/ui/MastercardLogo';
import VisaLogo from '@/components/ui/VisaLogo';

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
  acceptsVisa?: boolean;
  acceptsMastercard?: boolean;
}

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onClick: () => void;
}

const ServiceCard = ({ service, isSelected, onClick }: ServiceCardProps) => {
  console.log(`ServiceCard [${service.name}]:`, {
    hasBackground: !!service.backgroundImage,
    backgroundLength: service.backgroundImage?.length,
    backgroundPreview: service.backgroundImage?.substring(0, 50)
  });

  return (
    <button
      onClick={onClick}
      className={`
        group relative rounded-xl overflow-hidden h-[280px] flex flex-col
        transition-all duration-200 text-left
        hover:shadow-lg hover:-translate-y-0.5
        ${isSelected ? 'ring-4 ring-blue-500 shadow-lg' : ''}
      `}
    >
      <div className="absolute inset-0 bg-white dark:bg-gray-800" />
      
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
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          {service.logoSvg ? (
            <div className="w-14 h-14 p-[2px] flex items-center justify-center rounded-lg bg-white/95 backdrop-blur-sm">
              <div className="w-full h-full flex items-center justify-center">
                <img src={service.logoSvg} alt={service.name} className="w-full h-full object-contain" />
              </div>
            </div>
          ) : (
            <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <Icon name={service.icon} size={22} className="text-blue-600 dark:text-blue-400" />
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-black mb-2 w-fit">
          <span className="bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {service.name}
          </span>
        </h3>
        
        <p className="text-xs text-black mb-3 w-fit">
          <span className="bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {service.type}
          </span>
        </p>
        
        <p className="text-sm text-black mb-3 flex-1 line-clamp-2">
          <span className="bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full inline">
            {service.description}
          </span>
        </p>
        
        {(service.acceptsVisa || service.acceptsMastercard) && (
          <div className="flex gap-2 justify-end mb-2">
            {service.acceptsVisa && (
              <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                <VisaLogo width={40} height={13} />
              </div>
            )}
            {service.acceptsMastercard && (
              <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                <MastercardLogo width={32} height={20} />
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-100 bg-white -mx-5 -mb-5 px-5 pb-5">
          <div className="flex items-center justify-between w-full">
            <span className="text-base font-bold text-black">
              {service.price}
            </span>
            <div className="flex items-center text-sm font-medium text-black">
              {service.cta}
              <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ServiceCard;