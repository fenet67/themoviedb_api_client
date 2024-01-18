const matchGenres = (movies, genres) => {
    let res = movies.map(movie => {
        movie.genres = [];
        movie.genre_ids.forEach(id => movie.genres.push(genres.get(id)));
        return movie;
    });
    return res;
}

class TMD_Rest {
    API_KEY = "07f1d90eb87e733772964f4985011ace";
    BASE_URL = "https://api.themoviedb.org/3/";
    genres

    async getTrendingMovies() {
        const url = `${this.BASE_URL}trending/movie/day?api_key=${this.API_KEY}`;
        const req = await fetch(url);
        let { results } = await req.json();

        // get genres ids and names
        const { genres } = await this.getGenres();
        let dict = new Map();
        genres.forEach((genre) => dict.set(genre.id, genre.name));
        results = matchGenres(results, dict);

        return results;
    }

    async getPopularMovies() {
        const url = `${this.BASE_URL}movie/popular?api_key=${this.API_KEY}&language=en-US&page=1`;
        const req = await fetch(url);
        let { results } = await req.json();

        // get genres ids and names
        const { genres } = await this.getGenres();
        let dict = new Map();
        genres.forEach((genre) => dict.set(genre.id, genre.name));
        results = matchGenres(results, dict);

        return results;
    }

    async getTopRatedMovies() {
        const url = `${this.BASE_URL}movie/top_rated?api_key=${this.API_KEY}&language=en-US&page=1`;
        const req = await fetch(url);
        let { results } = await req.json();

        // get genres ids and names
        const { genres } = await this.getGenres();
        let dict = new Map();
        genres.forEach((genre) => dict.set(genre.id, genre.name));
        results = matchGenres(results, dict);

        return results;
    }

    async searchMovie(query) {
        const url = `${this.BASE_URL}search/movie?query=${query}&api_key=${this.API_KEY}`;
        const req = await fetch(url);
        let { results } = await req.json();

        // get genres ids and names
        const { genres } = await this.getGenres();
        let dict = new Map();
        genres.forEach((genre) => dict.set(genre.id, genre.name));
        results = matchGenres(results, dict);

        return results;
    }

    async getMovieDetail(id) {
        const url = `${this.BASE_URL}movie/${id}?api_key=${this.API_KEY}&language=en-US`;
        const req = await fetch(url);
        const res = await req.json();
        return res;
    }

    async getGenres() {
        const url = `${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}&language=en-US`;
        if (this.genres) {
            return this.genres
        }

        const req = await fetch(url);
        const res = await req.json();
        this.genres = res
        return res;
    }

}