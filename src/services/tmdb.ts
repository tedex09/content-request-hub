import { toast } from "sonner";

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

export const searchTMDB = async (query: string): Promise<TMDBSearchResult[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from TMDB");
    }

    const data: TMDBResponse = await response.json();
    return data.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );
  } catch (error) {
    toast.error("Error searching TMDB");
    return [];
  }
};

export const getMediaDetails = async (
  mediaId: number,
  mediaType: "movie" | "tv"
) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${mediaType}/${mediaId}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${mediaType} details`);
    }

    return await response.json();
  } catch (error) {
    toast.error(`Error fetching ${mediaType} details`);
    return null;
  }
};