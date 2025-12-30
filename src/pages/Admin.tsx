import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const DEFAULT_PASSWORD = 'HeyStore2025!Secure#Admin';

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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    if (!localStorage.getItem('admin_password')) {
      localStorage.setItem('admin_password', DEFAULT_PASSWORD);
    }
    loadServices();
  }, []);

  const loadServices = () => {
    const stored = localStorage.getItem('heystore_services');
    if (stored) {
      setServices(JSON.parse(stored));
    }
  };

  const saveServices = (newServices: Service[]) => {
    localStorage.setItem('heystore_services', JSON.stringify(newServices));
    setServices(newServices);
  };

  const getStoredPassword = () => {
    return localStorage.getItem('admin_password') || DEFAULT_PASSWORD;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === getStoredPassword()) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError('');
    setChangePasswordSuccess('');

    if (currentPassword !== getStoredPassword()) {
      setChangePasswordError('Текущий пароль неверен');
      return;
    }

    if (newPassword.length < 8) {
      setChangePasswordError('Новый пароль должен быть не менее 8 символов');
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangePasswordError('Пароли не совпадают');
      return;
    }

    localStorage.setItem('admin_password', newPassword);
    setChangePasswordSuccess('Пароль успешно изменён');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    setTimeout(() => {
      setShowChangePassword(false);
      setChangePasswordSuccess('');
    }, 2000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSaveService = (service: Service) => {
    let newServices: Service[];
    if (isAddingNew) {
      newServices = [...services, service];
    } else {
      newServices = services.map(s => s.id === service.id ? service : s);
    }
    saveServices(newServices);
    setEditingService(null);
    setIsAddingNew(false);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Удалить этот товар?')) {
      const newServices = services.filter(s => s.id !== id);
      saveServices(newServices);
    }
  };

  const handleAddNew = () => {
    const newService: Service = {
      id: `service_${Date.now()}`,
      name: '',
      type: 'Финтех',
      category: 'kyc-fintech',
      icon: 'CreditCard',
      description: '',
      price: '0 USDT',
      cta: 'Подключить'
    };
    setEditingService(newService);
    setIsAddingNew(true);
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
        <div className="w-full max-w-md p-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Админ-панель
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="Введите пароль"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>
              
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Icon name="ArrowLeft" size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              HEY, STORE! — Админ
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Товары
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Настройки
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Управление товарами
              </h2>
              <Button onClick={handleAddNew}>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить товар
              </Button>
            </div>

            {editingService && (
              <ServiceForm
                service={editingService}
                onSave={handleSaveService}
                onCancel={() => {
                  setEditingService(null);
                  setIsAddingNew(false);
                }}
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
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                              {service.description}
                            </p>
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingService(service);
                              setIsAddingNew(false);
                            }}
                          >
                            <Icon name="Pencil" size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
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
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Настройки
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Изменить пароль
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Обновите пароль для входа в админ-панель
                  </p>
                </div>
                <Button onClick={() => setShowChangePassword(!showChangePassword)}>
                  {showChangePassword ? 'Скрыть' : 'Изменить'}
                </Button>
              </div>

              {showChangePassword && (
                <form onSubmit={handleChangePassword} className="mt-6 max-w-md space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Текущий пароль
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Новый пароль
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      required
                      minLength={8}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Подтвердите новый пароль
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  {changePasswordError && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {changePasswordError}
                    </p>
                  )}
                  {changePasswordSuccess && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {changePasswordSuccess}
                    </p>
                  )}
                  <div className="flex gap-3">
                    <Button type="submit">
                      Сохранить
                    </Button>
                    <Button type="button" variant="outline" onClick={() => {
                      setShowChangePassword(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setChangePasswordError('');
                      setChangePasswordSuccess('');
                    }}>
                      Отмена
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const ServiceForm = ({ 
  service, 
  onSave, 
  onCancel,
  darkMode 
}: { 
  service: Service; 
  onSave: (service: Service) => void; 
  onCancel: () => void;
  darkMode: boolean;
}) => {
  const [formData, setFormData] = useState(service);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'background' | 'logo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (type === 'background') {
        setFormData({ ...formData, backgroundImage: result });
      } else {
        setFormData({ ...formData, logoSvg: result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-blue-500 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {service.name ? 'Редактировать товар' : 'Новый товар'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Название
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Тип
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            >
              <option>Финтех</option>
              <option>Криптобиржа</option>
              <option>Крипто-карта</option>
              <option>Платформа</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Категория
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            >
              <option value="kyc-fintech">Финтехи и банки</option>
              <option value="kyc-crypto">Криптобиржи</option>
              <option value="kyc-platforms">Платформы</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Иконка (Lucide)
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              placeholder="CreditCard, Wallet, Bitcoin..."
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Описание
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            rows={2}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Цена
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              placeholder="120 USDT"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Текст кнопки
            </label>
            <input
              type="text"
              value={formData.cta}
              onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Визуальное оформление
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Фоновое изображение
                <span className="text-xs text-gray-500 ml-2">(400x250px рекомендуется)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'background')}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.backgroundImage && (
                <div className="mt-2">
                  <img src={formData.backgroundImage} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, backgroundImage: undefined })}
                    className="text-xs text-red-600 dark:text-red-400 mt-1 hover:underline"
                  >
                    Удалить
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SVG логотип
                <span className="text-xs text-gray-500 ml-2">(100x100px рекомендуется)</span>
              </label>
              <input
                type="file"
                accept=".svg,image/svg+xml"
                onChange={(e) => handleImageUpload(e, 'logo')}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.logoSvg && (
                <div className="mt-2">
                  <img src={formData.logoSvg} alt="Logo" className="w-20 h-20 object-contain rounded-lg bg-gray-100 dark:bg-gray-700 p-2" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logoSvg: undefined })}
                    className="text-xs text-red-600 dark:text-red-400 mt-1 hover:underline"
                  >
                    Удалить
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">
            Сохранить
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Admin;