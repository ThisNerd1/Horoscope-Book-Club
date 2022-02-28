// Fetch
function fetchURL(url) {
    fetch(url) //Grabs URL
    .then(response => response.json()) //Converts response from API to JSON
    .then(promise_data => {
        //console.log(promise_data)
        return promise_data;
    });
}

// Dropdown Navbar
const navButton = document.querySelector('.nav-icon');

const dropdown = () => {
    let navbar = document.querySelector('.navbar');
    let items = document.getElementsByClassName('nav-item');

    if (!navbar.classList.contains('nav-responsive')) {
        navbar.classList.add('nav-responsive');
        navButton.innerHTML = "<i class='fa fa-times'></i>";
        for (const elem of items) {
            let content = elem.innerHTML;
            elem.innerHTML = content;
        }
    } else {
        navbar.classList.remove('nav-responsive');
        navButton.innerHTML = "<i class='fa fa-bars'></i>";
        for (const elem of items) {
            let content = elem.innerHTML;
            elem.innerHTML = content;
        }
    }
}

navButton.addEventListener('click', dropdown);

// Modal
const openModal = (objectID) => {
    document.getElementById(objectID).style.display = 'block';
}

const closeModal = (objectID) => {
    document.getElementById(objectID).style.display = 'none';
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}


// SEARCH CODE
const txtTraitsSign = document.getElementById('txt-traits-sign');
const resultsTraits = document.getElementById('results-matching-traits');
const resultsLiked = document.getElementById('results-liked-by-sign');
if(resultsLiked != null) {
    resultsLiked.style.display = 'none';
}

// switches the active tab with the tabgroup specified
changeTab = (tabGroup) => {
    const tabs = document.getElementById(tabGroup);
    for (let i = 0; i < tabs.childElementCount; i++) {
        if (tabs.children[i].classList.contains('active-tab')) {
            tabs.children[i].classList.remove('active-tab');
        }
    }
}

// changes information using onClick element data
makeTabActive = (clickInfo) => {
    let element = event.target;
    if(element.classList.contains('tab')) {
        element.classList.add('active-tab');
    }
    if (element.classList.contains('traits-pick')) {
        resultsTraits.style.display = 'block';
        resultsLiked.style.display = 'none';
    } else if (element.classList.contains('liked-pick')) {
        resultsTraits.style.display = 'none';
        resultsLiked.style.display = 'block';
    }
    txtTraitsSign.innerHTML = "Books " + element.innerHTML;
}

const allTabs = document.getElementsByClassName('tab');
for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].addEventListener('click', makeTabActive);
}


// HOROSCOPE CODE
const horoscopeDiv = document.getElementById('horoscope-show');
horoscopeDiv.style.display = 'none';

const horoscopeText = document.getElementById("horoscope");
const signText = document.getElementById("zodiac");

let zodiac = {
    sign: "Libra", //not case sensitive
    index: 6 //used for getting the index for the sorting array, starting with aries=0, ending with pisces=11
};

const makeZodiacURL = (signName) => {
    zodiacURL = `https://aztro.sameerkumar.website/?sign=${signName}&day=today`;
}

let allHoros = [];

const getHoroscope = (signName) => {
    makeZodiacURL(signName);
    signText.textContent = zodiac.sign; //writes the sign on the page
    fetch(zodiacURL, { //gets the horoscope content
        method: 'POST'
    })
    .then(response => response.json())
    .then(json => {
        allHoros[allHoros.length] = json.description;
    });
}

let zodiacs = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];

for (let i = 0; i < zodiacs.length; i++) {
    getHoroscope(zodiacs[i]);
}

const switchSign = (signName) => {
    horoscopeDiv.style.display = 'block';
    signText.textContent = signName;
    switch (signName) {
        case 'Aquarius':
            horoscopeText.textContent = allHoros[0];
            break;
        case 'Pisces':
            horoscopeText.textContent = allHoros[1];
            break;
        case 'Aries':
            horoscopeText.textContent = allHoros[2];
            break;
        case 'Taurus':
            horoscopeText.textContent = allHoros[3];
            break;
        case 'Gemini':
            horoscopeText.textContent = allHoros[4];
            break;
        case 'Cancer':
            horoscopeText.textContent = allHoros[5];
            break;
        case 'Leo':
            horoscopeText.textContent = allHoros[6];
            break;
        case 'Virgo':
            horoscopeText.textContent = allHoros[7];
            break;
        case 'Libra':
            horoscopeText.textContent = allHoros[8];
            break;
        case 'Scorpio':
            horoscopeText.textContent = allHoros[9];
            break;
        case 'Sagittarius':
            horoscopeText.textContent = allHoros[10];
            break;
        case 'Capricorn':
            horoscopeText.textContent = allHoros[11];
            break;
    }
}

const horoLinks = document.getElementsByClassName('switch-sign');
for (let i = 0; i < horoLinks.length; i++) {
    horoLinks[i].addEventListener('click', switchSign(horoLinks[i].textContent));
    horoscopeDiv.style.display = 'none';
}