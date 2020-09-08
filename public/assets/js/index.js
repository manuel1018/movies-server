import { getMovies } from './fetch.js'
const card = 'card-';
const emptyMessage = document.getElementsByClassName('emptyMessage hide')[0];
const btnSearchMovie = document.getElementById('search');
const movie = document.getElementById('input');
const container = document.getElementsByClassName('wrapper')[0];
const buttonsNavigator = document.getElementsByClassName('btnNextPrev hide')[0];
const prevButton = document.getElementsByClassName('btnPrev')[0];
const nextButton = document.getElementsByClassName('btnNext')[0];
const numberResults = document.getElementsByClassName('number-results')[0];
let cardImages = [];

prevButton.addEventListener('click', getPrevSelection);
nextButton.addEventListener('click', getNextSelection);
btnSearchMovie.addEventListener('click', searchMovie);
window.addEventListener('load', createImages);


let listMovies;
let wantedMovie;
let indexMoviesPage;

function searchMovie() {
    disablePrevButton();
    enableNextButton();
    indexMoviesPage = 1;
    wantedMovie = movie.value;
    if (wantedMovie.trim() !== '') {
        listMovies = getMovies(wantedMovie);
        listMovies
            .then((data) => {
                const { Search: movies, totalResults: total, Response: response } = data;
                if (response === 'True') {
                    let scoreResults = parseInt(total) > 10 ? indexMoviesPage * 10 : parseInt(total);
                    numberResults.innerHTML = `Resultados ${scoreResults} de ${total}`
                    emptyMessage.className = 'emptyMessage hide';
                    container.className = 'wrapper show';
                    buttonsNavigator.className = 'btnNextPrev show';
                    fillContainerWithImages(movies);
                    let totalInt = parseInt(total);
                    let totalImages = totalInt > 10 ? 10 : totalInt;
                    hideEmptyCards(totalImages);
                } else {
                    container.className = 'wrapper hide';
                    buttonsNavigator.className = 'btnNextPrev hide';
                    emptyMessage.className = 'emptyMessage show';
                    numberResults.innerHTML = `Resultados 0`;
                }
            })
            .catch(console.warn);
    }
}

function createImages() {
    for (let i = 0; i < 10; i++)
        cardImages[i] = document.getElementsByClassName(card + (i + 1))[0];
}

function hideEmptyCards(limite) {
    for (let i = limite; i < 10; i++)
        cardImages[i].style.display = "none";
}

function fillContainerWithImages(list) {
    for (let i = 0; i < list.length; i++) {
        cardImages[i].style.display = "block";
        if (list[i].Poster === "N/A") {
            cardImages[i].firstChild.setAttribute("src", '/assets/img/empty.jpg');
        } else {
            cardImages[i].firstChild.setAttribute("src", list[i].Poster);
        }
        cardImages[i].querySelector('h3').innerHTML = list[i].Title;
        cardImages[i].querySelector('p').innerHTML = list[i].Year;
    }
}

function getNextSelection() {
    enablePrevButton();
    ++indexMoviesPage;
    console.log("Index next: " + indexMoviesPage);
    listMovies = getMovies(wantedMovie, indexMoviesPage);
    listMovies
        .then((data) => {
            const { Search: movies, totalResults: total, Response: response } = data;
            if (response === 'True') {
                let scoreResults = indexMoviesPage * 10 < parseInt(total) ? indexMoviesPage * 10 : parseInt(total);
                numberResults.innerHTML = `Resultados ${scoreResults} de ${total}`
                emptyMessage.className = 'emptyMessage hide';
                container.className = 'wrapper show';
                buttonsNavigator.className = 'btnNextPrev show';
                fillContainerWithImages(movies);
                let totalInt = parseInt(total);
                console.log(`Pages: ${totalInt}`)
                let totalImages = totalInt > 10 ? 10 : totalInt;
                hideEmptyCards(totalImages);
                if (totalInt <= (indexMoviesPage * 10)) { //isEndOfPages
                    disableNextButton();
                    let totalImages = totalInt - (indexMoviesPage - 1) * 10;
                    if (totalImages !== 10)
                        hideEmptyCards(totalImages);
                }
            } else {
                // disableNextButton();
            }
        })
        .catch(console.warn);
}

function getPrevSelection() {
    enableNextButton();

    --indexMoviesPage;
    listMovies = getMovies(wantedMovie, indexMoviesPage);
    listMovies
        .then((data) => {
            const { Search: movies, totalResults: total, Response: response } = data;
            if (response === 'True') {
                numberResults.innerHTML = `Resultados ${indexMoviesPage*10} de ${total}`
                emptyMessage.className = 'emptyMessage hide';
                container.className = 'wrapper show';
                buttonsNavigator.className = 'btnNextPrev show';

                fillContainerWithImages(movies);
                let totalInt = parseInt(total);
                let totalImages = totalInt > 10 ? 10 : totalInt;
                hideEmptyCards(totalImages);
                if (indexMoviesPage === 1)
                    disablePrevButton();

            } else {

            }
        })
        .catch(console.warn);
}

function enableNextButton() {
    nextButton.disabled = false;
    nextButton.style.backgroundColor = '#534bae';
}

function disableNextButton() {
    nextButton.disabled = true;
    nextButton.style.backgroundColor = '#6d2020';
}

function enablePrevButton() {
    prevButton.disabled = false;
    prevButton.style.backgroundColor = '#534bae';
}

function disablePrevButton() {
    prevButton.disabled = true;
    prevButton.style.backgroundColor = '#6d2020';
}