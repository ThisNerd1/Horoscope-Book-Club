fetch("https://daily-horoscopes1.p.rapidapi.com/", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "57417e0cd7msh9aeacf95c99c208p1320a5jsne3816a7b8eca",
		"x-rapidapi-host": "daily-horoscopes1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

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

const txtTraitsSign = document.getElementById('txt-traits-sign');
const resultsTraits = document.getElementById('results-matching-traits');
const resultsLiked = document.getElementById('results-liked-by-sign');
resultsLiked.style.display = 'none';

changeTab = (tabGroup) => {
    const tabs = document.getElementById(tabGroup);
    for (let i = 0; i < tabs.childElementCount; i++) {
        if (tabs.children[i].classList.contains('active-tab')) {
            tabs.children[i].classList.remove('active-tab');
        }
    }
}

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