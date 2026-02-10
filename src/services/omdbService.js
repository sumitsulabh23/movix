// Get your free API key at: http://www.omdbapi.com/apikey.aspx
const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '';
const BASE_URL = 'https://www.omdbapi.com/';

// Mock data fallback when API key is not available
const mockMovieData = {
    'Mumbai': [
        { id: 'tt15398776', title: 'Oppenheimer', year: '2023', poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt9362722', title: 'Spider-Man: Across the Spider-Verse', year: '2023', poster: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt1630029', title: 'Avatar: The Way of Water', year: '2022', poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt6710474', title: 'Everything Everywhere All at Once', year: '2022', poster: 'https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_SX300.jpg', type: 'movie' },
        { id: 'tt10872600', title: 'Spider-Man: No Way Home', year: '2021', poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt1877830', title: 'The Batman', year: '2022', poster: 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg', type: 'movie' },
    ],
    'Delhi': [
        { id: 'tt0468569', title: 'The Dark Knight', year: '2008', poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0816692', title: 'Interstellar', year: '2014', poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt1375666', title: 'Inception', year: '2010', poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0109830', title: 'Forrest Gump', year: '1994', poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0137523', title: 'Fight Club', year: '1999', poster: 'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0133093', title: 'The Matrix', year: '1999', poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', type: 'movie' },
    ],
    'Bangalore': [
        { id: 'tt0111161', title: 'The Shawshank Redemption', year: '1994', poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0068646', title: 'The Godfather', year: '1972', poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0071562', title: 'The Godfather Part II', year: '1974', poster: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0110912', title: 'Pulp Fiction', year: '1994', poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0120737', title: 'The Lord of the Rings: The Fellowship of the Ring', year: '2001', poster: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0167260', title: 'The Lord of the Rings: The Return of the King', year: '2003', poster: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', type: 'movie' },
    ],
    'Hyderabad': [
        { id: 'tt0076759', title: 'Star Wars: Episode IV - A New Hope', year: '1977', poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0080684', title: 'Star Wars: Episode V - The Empire Strikes Back', year: '1980', poster: 'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0086190', title: 'Star Wars: Episode VI - Return of the Jedi', year: '1983', poster: 'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0088763', title: 'Back to the Future', year: '1985', poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0082971', title: 'Raiders of the Lost Ark', year: '1981', poster: 'https://m.media-amazon.com/images/M/MV5BNTU2ODkyY2MtMjU1NC00NjE1LWEzYjgtMWQ3MzRhMTE0NDc0XkEyXkFqcGdeQXVyMjM4MzQ4OTQ@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0099685', title: 'Goodfellas', year: '1990', poster: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', type: 'movie' },
    ],
    'Chennai': [
        { id: 'tt0073486', title: 'One Flew Over the Cuckoo\'s Nest', year: '1975', poster: 'https://m.media-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0050083', title: '12 Angry Men', year: '1957', poster: 'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0047478', title: 'Seven Samurai', year: '1954', poster: 'https://m.media-amazon.com/images/M/MV5BOWE4ZDdhNmMtN2Y5Mi00ZDViLWI0MmQtMGMzZDYyMDUyNWZlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0038650', title: 'It\'s a Wonderful Life', year: '1946', poster: 'https://m.media-amazon.com/images/M/MV5BZjc4NDZhZWMtNGEzYS00ZWU2LThlM2ItNTA0YzQ0OTExMTE2XkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0102926', title: 'The Silence of the Lambs', year: '1991', poster: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', type: 'movie' },
        { id: 'tt0114369', title: 'Se7en', year: '1995', poster: 'https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', type: 'movie' },
    ]
};

export const omdbService = {
    /**
     * Search movies by title
     * @param {string} query 
     * @returns {Promise<Array>}
     */
    async searchMovies(query) {
        if (!API_KEY) {
            console.warn('OMDB API key not configured. Using mock data.');
            return [];
        }

        try {
            const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data.Response === 'True') {
                return data.Search.map(movie => ({
                    id: movie.imdbID,
                    title: movie.Title,
                    year: movie.Year,
                    poster: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750?text=No+Poster',
                    type: movie.Type
                }));
            }
            console.warn('OMDB search returned no results:', data.Error);
            return [];
        } catch (error) {
            console.error('Error fetching movies from OMDB:', error);
            return [];
        }
    },

    /**
     * Get detailed info for a specific movie by ID
     * @param {string} id 
     * @returns {Promise<Object|null>}
     */
    async getMovieDetails(id) {
        if (!API_KEY) {
            console.warn('OMDB API key not configured. Using mock data.');
            // Find in mock data
            for (const cityMovies of Object.values(mockMovieData)) {
                const movie = cityMovies.find(m => m.id === id);
                if (movie) {
                    return {
                        ...movie,
                        rating: '8.5',
                        language: 'English',
                        plot: 'An amazing cinematic experience.',
                        genre: 'Action, Drama',
                        director: 'Christopher Nolan',
                        actors: 'Great Cast'
                    };
                }
            }
            return null;
        }

        try {
            const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data.Response === 'True') {
                return {
                    id: data.imdbID,
                    title: data.Title,
                    year: data.Year,
                    rating: data.imdbRating,
                    language: data.Language,
                    poster: data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/500x750?text=No+Poster',
                    plot: data.Plot,
                    genre: data.Genre,
                    director: data.Director,
                    actors: data.Actors
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching movie details from OMDB:', error);
            return null;
        }
    },

    /**
     * Get movies for a specific city based on predefined search terms
     * @param {string} city 
     * @returns {Promise<Array>}
     */
    async getMoviesByCity(city) {
        // If no API key, use mock data
        if (!API_KEY) {
            console.warn('OMDB API key not configured. Using mock data. Get your free key at: http://www.omdbapi.com/apikey.aspx');
            const cityMovies = mockMovieData[city] || mockMovieData['Mumbai'];
            return cityMovies.map(movie => ({ ...movie, city }));
        }

        // City-specific search terms - fetch multiple to ensure we have content
        const cityMappings = {
            'Mumbai': ['Avengers', 'Spider-Man', 'Iron Man'],
            'Delhi': ['Batman', 'Superman', 'Wonder Woman'],
            'Bangalore': ['Matrix', 'Inception', 'Interstellar'],
            'Hyderabad': ['Avatar', 'Titanic', 'Gladiator'],
            'Chennai': ['Star Wars', 'Jurassic Park', 'Harry Potter']
        };

        const searchTerms = cityMappings[city] || ['Marvel', 'Action', 'Adventure'];

        // Fetch movies from all search terms for the city
        const moviePromises = searchTerms.map(term => this.searchMovies(term));
        const movieArrays = await Promise.all(moviePromises);

        // Flatten and deduplicate by ID
        const allMovies = movieArrays.flat();
        const uniqueMovies = Array.from(
            new Map(allMovies.map(movie => [movie.id, movie])).values()
        );

        // If API returned no results, fall back to mock data
        if (uniqueMovies.length === 0) {
            console.warn('No results from OMDB API, using mock data fallback');
            const cityMovies = mockMovieData[city] || mockMovieData['Mumbai'];
            return cityMovies.map(movie => ({ ...movie, city }));
        }

        // Tag movies with the city and return up to 12 movies
        return uniqueMovies.slice(0, 12).map(movie => ({ ...movie, city }));
    }
};
