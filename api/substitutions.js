/**
 * Vercel Serverless Function
 * Proxy for fetching substitutions from ZSE API
 * Workaround for CORS issues when accessing from browser
 * 
 * Endpoint: /api/substitutions
 * Method: GET
 * Query params: ?class=1A (optional)
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get class parameter if provided
    const { class: className } = req.query;

    // Main API endpoint
    const apiUrl = 'https://zastepstwa.zse.bydgoszcz.pl/api';
    
    // Fetch substitutions from school API
    const response = await fetch(`${apiUrl}/substitutions`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });

    if (!response.ok) {
      console.error(`School API error: ${response.status}`);
      // Return empty array if API fails (graceful degradation)
      return res.status(200).json({
        substitutions: [],
        cached: false,
        timestamp: new Date().toISOString(),
        error: `School API returned ${response.status}`,
      });
    }

    const data = await response.json();

    // Filter by class if requested
    if (className && Array.isArray(data.substitutions)) {
      const filtered = data.substitutions.filter(sub => 
        sub.class === className || 
        (sub.affectedClasses && sub.affectedClasses.includes(className))
      );
      
      return res.status(200).json({
        substitutions: filtered,
        cached: false,
        timestamp: new Date().toISOString(),
        totalCount: data.substitutions.length,
        filteredCount: filtered.length,
      });
    }

    // Return all substitutions
    return res.status(200).json({
      substitutions: data.substitutions || [],
      cached: false,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('API Proxy Error:', error);

    // Graceful fallback - return empty substitutions
    return res.status(200).json({
      substitutions: [],
      cached: false,
      timestamp: new Date().toISOString(),
      error: error.message || 'Failed to fetch substitutions',
    });
  }
}
