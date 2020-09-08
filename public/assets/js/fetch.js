const url = 'http://www.omdbapi.com/?s=';
const api = '&apikey=e155e2c9';
const page = '&page='
let movie = "batman";

export async function getMovies(movie, numPage = 1) {
    // const peticion = await fetch(url + movie + api);
    const peticion = await fetch(url + movie + page + numPage + api);
    const movieData = await peticion.json();
    return movieData;
}