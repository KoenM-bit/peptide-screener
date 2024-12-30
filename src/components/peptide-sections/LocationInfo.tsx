import React from 'react';
import { MapPin, Box, Circle, Grid } from 'lucide-react';
import { getLocationColor, formatLocation } from '../../utils/locationUtils';

interface LocationInfoProps {
  subcellularLocation: string;
  subcellularMainLocation: string;
}

export function LocationInfo({ subcellularLocation, subcellularMainLocation }: LocationInfoProps) {
  const mainLocationData = getLocationColor(subcellularMainLocation);
  const detailedLocationData = getLocationColor(subcellularLocation);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'vesicle':
        return <Circle className="w-6 h-6" />;
      case 'golgi':
        return <Grid className="w-6 h-6" />;
      case 'cytosol':
        return <Box className="w-6 h-6" />;
      default:
        return <MapPin className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold">Cellular Location</h2>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Main Location</div>
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${mainLocationData.background} ${mainLocationData.text}`}>
            {getIcon(mainLocationData.icon)}
            <span className="text-lg">{formatLocation(subcellularMainLocation)}</span>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Detailed Location</div>
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${detailedLocationData.background} ${detailedLocationData.text}`}>
            {getIcon(detailedLocationData.icon)}
            <span className="text-lg">{formatLocation(subcellularLocation)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}