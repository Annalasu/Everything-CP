import React, { useState, useCallback } from 'react';
import { CharacterForm } from './components/CharacterForm';
import { StoryDisplay } from './components/StoryDisplay';
import { AvatarDisplay } from './components/AvatarDisplay';
import { CPImage } from './components/CPImage';
import { Settings } from './components/Settings';
import { Character, GenerateResponse } from './types';
import { OpenAIService } from './services/openai';
import { Heart } from 'lucide-react';
import { config } from './config/env';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [showCPImage, setShowCPImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<{ character1: Character; character2: Character } | null>(null);

  const handleSettingsSave = useCallback((newSettings: typeof config.openai & { apiBaseUrl: string }) => {
    OpenAIService.updateConfig({
      apiKey: newSettings.apiKey,
      apiBaseUrl: newSettings.apiBaseUrl,
      model: newSettings.model,
      imageModel: newSettings.imageModel,
    });
  }, []);

  const handleSubmit = async (chars: { character1: Character; character2: Character }) => {
    try {
      setLoading(true);
      setError(null);
      setCharacters(chars);
      const response = await OpenAIService.generate(chars);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!characters) return;
    try {
      setLoading(true);
      setError(null);
      setShowCPImage(false);
      const response = await OpenAIService.generate(characters);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '重新生成失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100">
      <div className="container mx-auto px-4 py-8 relative">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">万物CP</h1>
          <p className="text-gray-600">让AI为你创造独特的CP故事</p>
        </header>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        {result && characters && (
          <>
            <AvatarDisplay
              imageUrl={result.avatars.character1}
              characterName={characters.character1.name}
              position="left"
            />
            <AvatarDisplay
              imageUrl={result.avatars.character2}
              characterName={characters.character2.name}
              position="right"
            />
          </>
        )}

        {!result && <CharacterForm onSubmit={handleSubmit} isLoading={loading} />}

        {result && (
          <div className="space-y-8">
            <StoryDisplay
              story={result.story}
              loading={loading}
              onRegenerate={handleRegenerate}
            />

            <div className="text-center">
              <button
                onClick={() => setShowCPImage(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                         text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
                         transition-all"
              >
                <Heart className="w-5 h-5" />
                开磕
              </button>
            </div>
          </div>
        )}

        <CPImage 
          imageUrl={result?.cpImage || ''} 
          visible={showCPImage} 
          onClose={() => setShowCPImage(false)} 
        />
        <Settings onSave={handleSettingsSave} />
      </div>
    </div>
  );
}

export default App;