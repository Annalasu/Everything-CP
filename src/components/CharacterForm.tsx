import React, { useState } from 'react';
import { Character } from '../types';
import { Sparkles } from 'lucide-react';

interface CharacterFormProps {
  onSubmit: (characters: { character1: Character; character2: Character }) => void;
  isLoading?: boolean;
}

export const CharacterForm: React.FC<CharacterFormProps> = ({ onSubmit, isLoading }) => {
  const [character1, setCharacter1] = useState<Character>({ name: '', background: '' });
  const [character2, setCharacter2] = useState<Character>({ name: '', background: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ character1, character2 });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-8">
      <div className="space-y-6">
        {[
          { character: character1, setCharacter: setCharacter1, label: '角色1' },
          { character: character2, setCharacter: setCharacter2, label: '角色2' },
        ].map(({ character, setCharacter, label }, index) => (
          <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">{label}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  名称
                </label>
                <input
                  type="text"
                  value={character.name}
                  onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  背景说明
                </label>
                <textarea
                  value={character.background}
                  onChange={(e) => setCharacter({ ...character, background: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium 
                 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50
                 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        {isLoading ? '生成中...' : '开始创作'}
      </button>
    </form>
  );
};