import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AdminSettingsTabProps {
  showChangePassword: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  changePasswordError: string;
  changePasswordSuccess: string;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onToggleChangePassword: () => void;
  onChangePassword: (e: React.FormEvent) => void;
}

const AdminSettingsTab = ({
  showChangePassword,
  currentPassword,
  newPassword,
  confirmPassword,
  changePasswordError,
  changePasswordSuccess,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onToggleChangePassword,
  onChangePassword
}: AdminSettingsTabProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Настройки
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Безопасность
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Управление паролем администратора
            </p>
          </div>
          <Button onClick={onToggleChangePassword}>
            {showChangePassword ? 'Отменить' : 'Изменить пароль'}
          </Button>
        </div>

        {showChangePassword && (
          <form onSubmit={onChangePassword} className="mt-6 space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Текущий пароль
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => onCurrentPasswordChange(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
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
                onChange={(e) => onNewPasswordChange(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Подтвердите новый пароль
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
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

            <Button type="submit" className="w-full">
              Изменить пароль
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSettingsTab;
