import React, { useEffect, useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

interface StoryDisplayProps {
  story: string;
  loading: boolean;
  onRegenerate: () => void;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, loading, onRegenerate }) => {
  const [displayedStory, setDisplayedStory] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (loading) {
      setDisplayedStory('');
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < story.length) {
        setDisplayedStory((prev) => prev + story[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [story, loading]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">故事内容</h3>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            title="复制内容"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={onRegenerate}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            title="重新生成"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="prose prose-sm max-w-none">
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{displayedStory}</p>
        )}
      </div>
    </div>
  );
};