import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onSearch?: (query: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header = ({ onSearch, darkMode, onToggleDarkMode }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1 max-w-xl relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            type="text"
            placeholder="Поиск товаров и услуг"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
          >
            <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Icon name="User" size={20} />
            <span>Войти</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Icon name="ShoppingCart" size={20} />
            <span>Корзина</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Icon name="MessageCircle" size={20} />
            <span>Поддержка</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;