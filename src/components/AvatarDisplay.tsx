import React from 'react';

interface AvatarDisplayProps {
  imageUrl: string;
  characterName: string;
  position: 'left' | 'right';
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  imageUrl,
  characterName,
  position,
}) => {
  const positionClasses = {
    left: 'left-8 top-8',
    right: 'right-8 top-8',
  };

  return (
    <div className={`absolute ${positionClasses[position]} z-10`}>
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={characterName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 animate-pulse" />
          )}
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-medium text-gray-800">{characterName}</span>
        </div>
      </div>
    </div>
  );
};