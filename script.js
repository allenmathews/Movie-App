const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=adfe4f4c4e7af569052cb0ab4bdbc61d&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=adfe4f4c4e7af569052cb0ab4bdbc61d&query='

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

const countEl = document.querySelector("span");

const movieBar = document.getElementById("movieBar")
const movieArray = [''];
const movieform = document.getElementById("movieform")


// fetch(API_URL)
//     .then(response => response.json())
//     .then(data =>
//         showMovies(data.results)
//     )

// .catch(error => {
//     console.log('Error:',
//         error)
// })

//Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}


function showMovies(movies) {
    main.innerHTMl = ' ';
    console.log(main.innerHTML, 'currentMainInnerHTML')
    console.log(movies)
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <button data-title="${title}"  onclick = "likeMovie(event)">Like</button>
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                
                    </div>
                    <div class="overview">
                <h3>Overview</h3>
                ${overview}
             </div>
        `
        main.appendChild(movieEl)
    })
}

function likeMovie(e) {
    const movieLikes = document.getElementById("movieLikes")
    count = parseInt(movieLikes.innerText)

    if (e.target.innerText === 'Like') {
        count++;
        movieArray.push(e.target.dataset.title)
        movieLikes.innerText = count;
        e.target.innerText = 'Unlike'
        renderLikedMovies()
    } else {
        count--;
        movieLikes.innerText = count;
        e.target.innerText = 'Like'
    }
}



function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        main.innerHTML = '';
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
        alert("Please input a movie name!")
    }
})

function likeMovie(e) {
    const movieLikes = document.getElementById("movieLikes")
    count = parseInt(movieLikes.innerText)

    if (e.target.innerText === 'Like') {
        count++;
        movieArray.push(e.target.dataset.title)
        movieLikes.innerText = count;
        e.target.innerText = 'Unlike'
        renderLikedMovies()
    } else {
        count--;
        movieLikes.innerText = count;
        e.target.innerText = 'Like'
    }
}

const buttons = Array.from(document.querySelectorAll('button'));
// attach eventListener to each like button to listen for the click
buttons.forEach(function attachClickEvent(btn) {
    btn.onClick = function ClickFiredOnThisButton(clickEvent) {
        // clickEvent has fired on this particular button 
        // -- write some code to add this movie to the likes movie container
    }
})

function renderLikedMovies() {
    movieArray.forEach(movie => {
        movieform.append(movie)
    })
    main.appendChild(movie)

}

function renderUnLikedMovies() {
    movieArray.forEach(movie => {
        movieform.removeChild(movie)
    })
}