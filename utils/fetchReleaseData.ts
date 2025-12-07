// utils/fetchReleaseData.ts
import { ReleaseData } from '@/types/release';

export const fetchReleaseData = async (): Promise<ReleaseData> => {
  // Determine basePath based on environment
  const basePath = process.env.NODE_ENV === 'production' ? '/coomer_mobile_pages' : '';
  
  try {
    const response = await fetch(`${basePath}/releases.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch releases.json: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching release data:', error);
    throw error;
  }
};

// Optional: Helper to get just current release
export const getCurrentRelease = async () => {
  const data = await fetchReleaseData();
  return data.current;
};

// Optional: Helper to get just changelog
export const getChangelog = async () => {
  const data = await fetchReleaseData();
  return data.changelog;
};