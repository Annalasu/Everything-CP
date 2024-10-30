import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onSubmit: (password: string) => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_SITE_PASSWORD) {
      onSubmit(password);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6"
          >
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full 
                           flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                请输入访问密码
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3 py-2 pr-10 rounded-lg border 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           ${error ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="输入密码"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5
                           text-gray-500 hover:text-gray-700 dark:text-gray-400 
                           dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 
                           dark:hover:bg-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  密码错误，请重试
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 
                         text-white rounded-lg shadow-md hover:shadow-lg transform 
                         hover:-translate-y-0.5 transition-all"
              >
                确认
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 