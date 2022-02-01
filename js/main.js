
const elForm = document.querySelector(".form")
const elList = document.querySelector(".films__list");
const elFilmTemplate = document.querySelector("#films__template").content;
const elGerneTemlate = document.querySelector("#films-genre").content;
const elSelect = document.querySelector(".form__select");

// time normalize numbers -> time  
function normalizeDate (dateFormat) {

const date = new Date (dateFormat);
const day = String(date.getDate()).padStart(2, 0);
const month = String(date.getMonth() + 1).padStart(2, 0);
const year = String(date.getFullYear()).padStart(2, 0);

    return (day + '.' + month + '.' + year);
}

// genereteGenre 
const genereteGenre = (array) => {
    const genres = [];

    array.forEach((film) =>{
        film.genres.forEach((genre) =>{
            if(!genres.includes(genre)){
                genres.push(genre);
            }
        });
    });
    return genres;
}

// selectni ekranga chiqarish
const renderSelect = (array, element)=>{
    element.innerHTML= null;

    array.forEach((genre)=>{
        const newOption = document.createElement("option");
        newOption.value=genre;
        newOption.textContent = genre;
        element.appendChild(newOption);
    })
}
renderSelect(genereteGenre(films),elSelect);



// add All-options
function firstOption(option) {
    const newOption = document.querySelector("option");
    newOption.value = "All";
    newOption.textContent = "All";
}

// genres generate template
function renderGernes(array, element){
    element.innerHTML = null;

    array.forEach(genre => {

        const genreTemplate = elGerneTemlate.cloneNode(true);

        genreTemplate.querySelector(".genres__item").textContent = genre;

        element.appendChild(genreTemplate);
    });
}

// films render
function renderFilms(array, element){
    element.innerHTML = null;
        
    array.forEach(film => {

        const filmsTemplate = elFilmTemplate.cloneNode(true)

        filmsTemplate.querySelector(".films__img").src = film.poster;
        filmsTemplate.querySelector(".films__title").textContent = film.title;
        filmsTemplate.querySelector(".films__text").textContent = film.overview;
        filmsTemplate.querySelector(".films__time").textContent = normalizeDate(film.release_date);
        

        var elGenres =  filmsTemplate.querySelector(".films__genres");

        renderGernes(film.genres, elGenres);

        element.appendChild(filmsTemplate);  
});
}


renderFilms(films,elList);

firstOption();

// form SubmitEvent
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    let selectArray = []

    // genres tekshirish
    films.forEach(film => {

        if(elSelect.value == 'All') {
            selectArray.push(film)
        }

        else if (film.genres.includes(elSelect.value)) {
            selectArray.push(film)
        }
});

    renderFilms(selectArray, elList)
});

