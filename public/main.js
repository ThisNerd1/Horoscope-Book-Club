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