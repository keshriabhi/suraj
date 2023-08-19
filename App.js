// ! --STEP 2-----------------

const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", searchMovies);

function searchMovies() {
  const searchText = searchBar.value.trim();
  if (searchText) {
  }
}
let searchTimeout;

searchBar.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(searchMovies, 300);
});

function searchMovies() {
  const searchText = searchBar.value.trim();
  if (searchText) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
      searchText
    )}`;

    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        const searchResults = data.results;
        movieContainer.innerHTML = "";

        if (searchResults.length === 0) {
          movieContainer.textContent = "No matching movies found.";
          return;
        }

        searchResults.forEach((movie) => {
          const movieCard = createMovieCard(movie);
          movieContainer.appendChild(movieCard);
        });
      });
  } else {
    movieContainer.innerHTML ="";
    fetchNowPlayingMovies();
  }
}

// ! --STEP 3-----------------
const movieContainer =document.querySelector(".movie-container");

const apiKey = "eda08b1cc545e927809e4bfb1fed1676";
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

fetch(nowPlayingUrl)
  .then((response) =>response.json())
  .then((data) => {
    const movies = data.results;
    movies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieContainer.appendChild(movieCard);
    });
  });

function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  const movieImage = document.createElement("img");
  movieImage.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
  movieImage.alt =`${movie.title} Poster`;

  const movieTitle =document.createElement("h2");
  movieTitle.textContent =movie.title;

  const movieLanguage =document.createElement("p");
  movieLanguage.classList.add("lang");
  movieLanguage.textContent = `${movie.original_language}`;

  const movieRatings =document.createElement("p");
  movieRatings.classList.add("ratingmovie");
  movieRatings.textContent = `${movie.vote_average}`;

  let movieDesc = function(){
    movieDescription(movie)
  }
  movieCard.addEventListener("click",()=>{
    movieDesc()
  })
  
    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(movieLanguage);
    movieCard.appendChild(movieRatings);
    
    return movieCard;

  // const movieImage = document.createElement("img");
  // movieImage.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
  // movieImage.alt =`${movie.title} Poster`;
  // const movieTitle =document.createElement("h2");
  // movieTitle.textContent =movie.title;
  
  // const movieLanguage =document.createElement("p");
  // movieLanguage.classList.add("lang");
    // movieLanguage.textContent = `${movie.original_language}`;

    // const movieRatings =document.createElement("p");
    // movieRatings.classList.add("ratingmovie");
    // movieRatings.textContent = `${movie.vote_average}`;
  




}

function movieDescription(movie){
  console.log('moviedes', movie);
  const movieDescriptionCard = document.getElementById('movie-description-card')
  movieDescriptionCard.innerHTML=movie.title
  movieDescriptionCard.style.display="block";
}


// !  ----GENRESLIST ---------

const genreList=document.querySelector(".genre-list");

const genresUrl =`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

fetch(genresUrl)
  .then((response) =>response.json())
  .then((data) =>{
    const genres=data.genres;
    genres.forEach((genre)=> {
      const genreButton = createGenreButton(genre);
      genreList.appendChild(genreButton);
    });
  });

function createGenreButton(genre) {
  const genreButton = document.createElement("p");
  genreButton.textContent = genre.name;
  genreButton.classList.add("genre-button");
  genreButton.addEventListener("click", () => { });
  return genreButton;
}



// !-----PAYMENT---------
const checkout =document.querySelector('.checkout');
const movieName =document.querySelector('.movie-name');
const ticketPrice =document.querySelector('.ticket-price');
const numTicketsInput =document.getElementById('numTickets');
const convenienceFee =document.querySelector('.convenience-fee');
const subtotal =document.querySelector('.subtotal');
const paymentMethod =document.getElementById('paymentMethod');
const payButton =document.querySelector('.pay-button');
const paymentForm =document.querySelector('form');
const movie ={
    title: 'Sample Movie',
    ticketPrice: 500,
};

movieName.textContent =movie.title;
ticketPrice.textContent =`Rs.${movie.ticketPrice.toFixed(2)}`;

numTicketsInput.addEventListener('input',updateSummary);
paymentMethod.addEventListener('change',updateSummary);

function updateSummary() {
    const numTickets =parseFloat(numTicketsInput.value);
    const feePercentage =1.75;
    const fee = (numTickets *movie.ticketPrice *feePercentage)/100;
    const total = numTickets * movie.ticketPrice +fee;

    convenienceFee.textContent = `Rs.${fee.toFixed(2)}`;
    subtotal.textContent = `Rs.${total.toFixed(2)}`;
}

paymentForm.addEventListener('submit', handlePayment);
function handlePayment(event) {
    event.preventDefault();
    const paymentSuccessful = simulatePayment();
    if (paymentSuccessful) {
        showConfirmation();
    } else {
        alert('Payment failed. Please try again.');
    }
}

function simulatePayment() {
    return Math.random() < 0.8;
}

function showConfirmation() {
    checkout.innerHTML = '<h2>Payment Successful!</h2><p>Thank you for booking tickets.</p>';
}
