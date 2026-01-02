import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import AdminProductsTab from '@/components/admin/AdminProductsTab';
import AdminSettingsTab from '@/components/admin/AdminSettingsTab';

const DEFAULT_PASSWORD = 'HeyStore2025!Secure#Admin';

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

const API_URL = 'https://functions.poehali.dev/692cf256-c3fb-49b8-9844-ae94296d195a';

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
    migrateFromLocalStorage();
  }, []);

  const loadServices = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to load services:', error);
    }
  };

  const migrateFromLocalStorage = async () => {
    const stored = localStorage.getItem('heystore_services');
    if (stored) {
      const localServices = JSON.parse(stored);
      try {
        for (const service of localServices) {
          await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(service)
          });
        }
        localStorage.removeItem('heystore_services');
        await loadServices();
      } catch (error) {
        console.error('Migration failed:', error);
      }
    }
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

  const handleSaveService = async (service: Service) => {
    try {
      const method = isAddingNew ? 'POST' : 'PUT';
      await fetch(API_URL, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      });
      await loadServices();
      setEditingService(null);
      setIsAddingNew(false);
    } catch (error) {
      console.error('Failed to save service:', error);
      alert('Ошибка при сохранении');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('Удалить этот товар?')) {
      try {
        await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
        await loadServices();
      } catch (error) {
        console.error('Failed to delete service:', error);
        alert('Ошибка при удалении');
      }
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
      cta: 'Подключить',
      priority: 0
    };
    setEditingService(newService);
    setIsAddingNew(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsAddingNew(false);
  };

  const handleCancelEdit = () => {
    setEditingService(null);
    setIsAddingNew(false);
  };

  const handlePriorityChange = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(s => s.id === id);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const newServices = [...services];
    [newServices[currentIndex], newServices[targetIndex]] = [newServices[targetIndex], newServices[currentIndex]];

    const updatedServices = newServices.map((service, index) => ({
      ...service,
      priority: newServices.length - index
    }));

    setServices(updatedServices);

    try {
      await Promise.all(
        updatedServices.map(service =>
          fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(service)
          })
        )
      );
    } catch (error) {
      console.error('Failed to update priorities:', error);
      await loadServices();
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminLoginForm
        password={password}
        error={error}
        darkMode={darkMode}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        onToggleDarkMode={toggleDarkMode}
      />
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
          <AdminProductsTab
            services={services}
            editingService={editingService}
            isAddingNew={isAddingNew}
            darkMode={darkMode}
            onAddNew={handleAddNew}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
            onSave={handleSaveService}
            onCancel={handleCancelEdit}
            onPriorityChange={handlePriorityChange}
          />
        )}

        {activeTab === 'settings' && (
          <AdminSettingsTab
            showChangePassword={showChangePassword}
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            changePasswordError={changePasswordError}
            changePasswordSuccess={changePasswordSuccess}
            onCurrentPasswordChange={setCurrentPassword}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onToggleChangePassword={() => setShowChangePassword(!showChangePassword)}
            onChangePassword={handleChangePassword}
          />
        )}
      </main>
    </div>
  );
};

export default Admin;