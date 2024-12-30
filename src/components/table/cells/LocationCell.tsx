import React from 'react';
import { MapPin, Box, Circle, Grid } from 'lucide-react';
import { getLocationColor, formatLocation } from '../../../utils/locationUtils';

interface LocationCellProps {
  location: string;
}

export function LocationCell({ location }: LocationCellProps) {
  const { background, text, icon } = getLocationColor(location);

  const getIcon = () => {
    switch (icon) {
      case 'vesicle':
        return <Circle className="w-4 h-4" />;
      case 'golgi':
        return <Grid className="w-4 h-4" />;
      case 'cytosol':
        return <Box className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${background} ${text}`}
      title={location}
    >
      {getIcon()}
      <span className="truncate max-w-[150px]">
        {formatLocation(location)}
      </span>
    </div>
  );
}