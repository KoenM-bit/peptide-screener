import React from 'react';
import { Heart } from 'lucide-react';

interface LikeCellProps {
  fragment: string;
  isLiked: boolean;
  onToggleLike: (fragment: string) => void;
}

export function LikeCell({ fragment, isLiked, onToggleLike }: LikeCellProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleLike(fragment);
      }}
      className={`p-1 rounded-full transition-colors
        ${isLiked 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-gray-500'}`}
    >
      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
    </button>
  );
}