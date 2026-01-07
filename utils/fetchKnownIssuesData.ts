// utils/fetchKnownIssuesData.ts
interface KnownIssue {
  issue: string;
  notes?: string[];
}

interface KnownIssuesData {
  title: string;
  issues: KnownIssue[];
}

export const fetchKnownIssuesData = async (): Promise<KnownIssuesData> => {
  // Determine basePath based on environment
  const basePath = process.env.NODE_ENV === 'production' ? '/coomer_mobile_pages' : '';
  
  try {
    const response = await fetch(`${basePath}/known_issues.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch known_issues.json: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching known issues data:', error);
    throw error;
  }
};
