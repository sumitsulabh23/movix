# OMDB API Integration

This app uses the OMDB API to fetch real movie data. However, it works out of the box with high-quality mock data.

## Using Mock Data (Default)

The app comes with curated mock movie data featuring real IMDB movies with posters. No setup required!

## Using Real OMDB API (Optional)

To use live data from OMDB:

1. Get a free API key at: http://www.omdbapi.com/apikey.aspx
2. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
3. Add your API key to `.env`:
   ```
   VITE_OMDB_API_KEY=your_actual_api_key_here
   ```
4. Restart the dev server

The app will automatically use the real API when a key is detected, otherwise it falls back to mock data.

## Features

- ✅ Works immediately with mock data
- ✅ Seamless fallback if API fails
- ✅ City-specific movie collections
- ✅ Real IMDB movie posters
- ✅ Search functionality
