import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  badge?: string;
  hasSubmenu: boolean;
  isSubitem?: boolean;
  submenu?: { id: string; title: string; icon: string }[];
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeSection: string;
  expandedSections: string[];
  onSectionChange: (id: string) => void;
  onToggleSection: (id: string) => void;
}

const Sidebar = ({
  menuItems,
  activeSection,
  expandedSections,
  onSectionChange,
  onToggleSection
}: SidebarProps) => {
  return (
    <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          HEY, STORE!
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Активация digital-сервисов
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.hasSubmenu) {
                  onToggleSection(item.id);
                } else {
                  onSectionChange(item.id);
                }
              }}
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-lg 
                transition-all duration-200 text-left
                ${item.isSubitem ? 'pl-8 text-sm' : ''}
                ${activeSection === item.id || expandedSections.includes(item.id)
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full font-semibold">
                    {item.badge}
                  </span>
                )}
                {item.hasSubmenu && (
                  <Icon
                    name={expandedSections.includes(item.id) ? 'ChevronDown' : 'ChevronRight'}
                    size={16}
                  />
                )}
              </div>
            </button>

            {item.hasSubmenu && item.submenu && expandedSections.includes(item.id) && (
              <div className="ml-4 mt-1 space-y-1">
                {item.submenu.map((subitem) => (
                  <button
                    key={subitem.id}
                    onClick={() => onSectionChange(subitem.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2 rounded-lg 
                      transition-all duration-200 text-left text-sm
                      ${activeSection === subitem.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <Icon name={subitem.icon} size={18} />
                    <span>{subitem.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;