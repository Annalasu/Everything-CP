import React from 'react';

interface AvatarDisplayProps {
  imageUrl: string;
  characterName: string;
  position: 'left' | 'right';
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ imageUrl, characterName, position }) => {
  return (
    <div className={`fixed top-32 ${position === 'left' ? 'left-8' : 'right-8'} 
                    flex flex-col items-center space-y-2 z-10`}>
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-200 
                    dark:border-purple-700 shadow-lg">
        <img 
          src={imageUrl} 
          alt={characterName} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full 
                    shadow-md text-gray-800 dark:text-gray-100 font-medium text-sm
                    border border-pink-100 dark:border-purple-800">
        {characterName}
      </div>
    </div>
  );
};