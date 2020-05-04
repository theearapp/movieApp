async function searchReq(typeOfSearch) {
    let URL;
    const KEY = 'ec0e343a';
    var searchValue = document.getElementById('searchInput').value;
    if (searchValue != '') {
        alert(typeOfSearch);
        if (typeOfSearch == 'searchReg') {
            URL = `http://www.omdbapi.com/?s=${searchValue}&apikey=${KEY}`;
        } else if (typeOfSearch == 'title') {
            URL = `http://www.omdbapi.com/?t=${searchValue}&apikey=${KEY}`;
        } else if (typeOfSearch == 'IMDb') {
            URL = `http://www.omdbapi.com/?i=${searchValue}&apikey=${KEY}`;
        }
        await fetch(URL).then(res => res.json()).then(data => {
            parseData(data);
        });
    } else {
        alert('Search value empty')
    }
}

function parseData(data) {
    if (data.Search.length !== 0) {
        var table = document.getElementById('movieTable');
        for (let i = 0; i < data.Search.length; i++) {
            var row = table.insertRow(-1);
            var title_cell = row.insertCell(0);
            var year_cell = row.insertCell(1);
            var imdb_cell = row.insertCell(2);
            title_cell.innerHTML = data.Search[i].Title;
            year_cell.innerHTML = data.Search[i].Year;
            imdb_cell.innerHTML = data.Search[i].imdbID;
        }
        table.style.display = "block";
    } else {
        alert("No movie(s) Found!")
    }
}

function redirectToSignup() {
    $(document).ready(function(){
        window.location = 'signup.html'
     });
}

function redirectToLogin() {
    $(document).ready(function(){
        window.location = 'login.html'
     });
}

async function loginReq() {
    var username = document.getElementsByClassName('home_input_username').value;
    var password = document.getElementsByClassName('home_input_password').value;
    if (username != '' && password != '') {
        const userData = {
            username: username,
            password: password
        };
        const URL = 'https://the-ear-app-2020.herokuapp.com/user/login'; // Personal endpoint for school projects
        await fetch(URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers : {
                'x-theear-api-version': '0.1',
                'x-theear-api-id': 'THE_EAR_2020',
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(userData) // body data type must match "Content-Type" header
          }).then(res => res.json()).then(data => {
            parseLoginSignup(data);
        });
    } else {
        alert('Missing inputs')
    }
}

async function signupReq() {
    var fullname = document.getElementsByClassName('home_input_fullname').value;
    var email = document.getElementsByClassName('home_input_email').value;
    var username = document.getElementsByClassName('home_input_username').value;
    var password = document.getElementsByClassName('home_input_password').value;
    if (fullname != '' && email != '' && username != '' && password != '') {
        const userData = {
            username: username,
            password: password,
            fullname: fullname,
            email: email
        };
        const URL = 'https://the-ear-app-2020.herokuapp.com/user/create'; // Personal endpoint for school projects
        await fetch(URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers : {
                'x-theear-api-version': '0.1',
                'x-theear-api-id': 'THE_EAR_2020',
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(userData) // body data type must match "Content-Type" header
          }).then(res => res.json()).then(data => {
            parseLoginSignup(data);
        });
    } else {
        alert('Missing inputs')
    }
}

function parseLoginSignup(data) {
    if (Object.keys(data).length !== 0) {
        if (data.status.code === 200) {
            window.location = 'home.html';
        } else {
            alert("Error!");
        }
    } else {
        alert("Error!")
    }
}