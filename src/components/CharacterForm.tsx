import React, { useState } from 'react';
import { Character } from '../types';
import { Wand2 } from 'lucide-react';

interface CharacterFormProps {
  onSubmit: (characters: { character1: Character; character2: Character }) => void;
  isLoading: boolean;
}

export const CharacterForm: React.FC<CharacterFormProps> = ({ onSubmit, isLoading }) => {
  const [character1, setCharacter1] = useState<Character>({ name: '', background: '' });
  const [character2, setCharacter2] = useState<Character>({ name: '', background: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ character1, character2 });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">角色1</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              名称
            </label>
            <input
              type="text"
              value={character1.name}
              onChange={(e) => setCharacter1({ ...character1, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 
                       dark:bg-gray-700 dark:text-gray-100
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       dark:focus:ring-purple-400"
              placeholder="输入角色名称"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              背景说明
            </label>
            <textarea
              value={character1.background}
              onChange={(e) => setCharacter1({ ...character1, background: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 
                       dark:bg-gray-700 dark:text-gray-100
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       dark:focus:ring-purple-400"
              placeholder="描述角色的性别、背景故事、性格特点等"
              rows={3}
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">角色2</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              名称
            </label>
            <input
              type="text"
              value={character2.name}
              onChange={(e) => setCharacter2({ ...character2, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 
                       dark:bg-gray-700 dark:text-gray-100
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       dark:focus:ring-purple-400"
              placeholder="输入角色名称"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              背景说明
            </label>
            <textarea
              value={character2.background}
              onChange={(e) => setCharacter2({ ...character2, background: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 
                       dark:bg-gray-700 dark:text-gray-100
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       dark:focus:ring-purple-400"
              placeholder="描述角色的性别、背景故事、性格特点等"
              rows={3}
              required
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                   text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
                   transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 className="w-5 h-5" />
          {isLoading ? '生成中...' : '开始创作'}
        </button>
      </div>
    </form>
  );
};