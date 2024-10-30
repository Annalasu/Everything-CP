import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config/env';

interface SettingsProps {
  onSave: (settings: typeof config.openai & { 
    apiBaseUrl: string,
    useSiliconFlow: boolean,
    siliconFlowKey: string 
  }) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    apiKey: localStorage.getItem('openai_api_key') || '',
    apiBaseUrl: localStorage.getItem('api_base_url') || config.apiBaseUrl,
    model: localStorage.getItem('openai_model') || config.openai.model,
    imageModel: localStorage.getItem('openai_image_model') || config.openai.imageModel,
    useSiliconFlow: localStorage.getItem('use_silicon_flow') === 'true',
    siliconFlowKey: localStorage.getItem('silicon_flow_key') || '',
  });

  const handleSave = () => {
    localStorage.setItem('openai_api_key', settings.apiKey);
    localStorage.setItem('api_base_url', settings.apiBaseUrl);
    localStorage.setItem('openai_model', settings.model);
    localStorage.setItem('openai_image_model', settings.imageModel);
    localStorage.setItem('use_silicon_flow', settings.useSiliconFlow.toString());
    localStorage.setItem('silicon_flow_key', settings.siliconFlowKey);
    onSave(settings);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl 
                 transform hover:-translate-y-0.5 transition-all z-50"
        title="设置"
      >
        <SettingsIcon className="w-6 h-6 text-gray-700" />
      </button>

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
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">API设置</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OpenAI API Key
                  </label>
                  <input
                    type="password"
                    value={settings.apiKey}
                    onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="sk-..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Base URL
                  </label>
                  <input
                    type="text"
                    value={settings.apiBaseUrl}
                    onChange={(e) => setSettings({ ...settings, apiBaseUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://api.openai.com/v1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    文本模型
                  </label>
                  <input
                    type="text"
                    value={settings.model}
                    onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="gpt-4-turbo-preview"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    图像模型
                  </label>
                  <input
                    type="text"
                    value={settings.imageModel}
                    onChange={(e) => setSettings({ ...settings, imageModel: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="dall-e-3"
                  />
                </div>

                <div className="space-y-4 border-t pt-4 mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="useSiliconFlow"
                      checked={settings.useSiliconFlow}
                      onChange={(e) => setSettings({ ...settings, useSiliconFlow: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="useSiliconFlow" className="ml-2 text-sm font-medium text-gray-700">
                      使用硅基流动生成图像
                    </label>
                  </div>

                  {settings.useSiliconFlow && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        硅基流动 API Key
                      </label>
                      <input
                        type="password"
                        value={settings.siliconFlowKey}
                        onChange={(e) => setSettings({ ...settings, siliconFlowKey: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="输入硅基流动 API Key"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 flex justify-end">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg
                           hover:bg-purple-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  保存设置
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};