export interface LocationData {
  background: string;
  text: string;
  icon: string;
}

export function getLocationColor(location: string): LocationData {
  const normalizedLocation = location?.toLowerCase() || '';

  if (normalizedLocation.includes('vesicle')) {
    return {
      background: 'bg-purple-100',
      text: 'text-purple-800',
      icon: 'vesicle'
    };
  }

  if (normalizedLocation.includes('golgi')) {
    return {
      background: 'bg-blue-100',
      text: 'text-blue-800',
      icon: 'golgi'
    };
  }

  if (normalizedLocation.includes('cytosol')) {
    return {
      background: 'bg-green-100',
      text: 'text-green-800',
      icon: 'cytosol'
    };
  }

  return {
    background: 'bg-gray-100',
    text: 'text-gray-800',
    icon: 'default'
  };
}

export function formatLocation(value: string): string {
  if (!value || value === 'NA') return 'Unknown';
  return value.split(';').map(loc => loc.trim()).join(', ');
}