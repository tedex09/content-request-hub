const TMDB_API_KEY = "c1dc975936a5b8fe2d8c5ca0a44aadad";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

interface TMDBSearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  media_type: "movie" | "tv";
}

interface TMDBResponse {
  results: TMDBSearchResult[];
  total_pages: number;
  total_results: number;
}

const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export const searchTMDB = async (query: string): Promise<TMDBSearchResult[]> => {
  const cacheKey = `search:${query}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from TMDB");
    }

    const data: TMDBResponse = await response.json();
    const results = data.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );

    cache.set(cacheKey, { data: results, timestamp: Date.now() });
    return results;
  } catch (error) {
    console.error("Error searching TMDB:", error);
    return [];
  }
};

export const getMediaDetails = async (mediaId: number, mediaType: "movie" | "tv") => {
  const cacheKey = `details:${mediaType}:${mediaId}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${mediaType}/${mediaId}?api_key=${TMDB_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${mediaType} details`);
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error(`Error fetching ${mediaType} details:`, error);
    return null;
  }
};