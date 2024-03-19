 
var dogs = 'golden retriever'

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/dogs?name=' + dogs,
    headers: { 'X-Api-Key': 'xCK+HYspJgfwkDvJB6yLZw==r7TwaSDfMZ6tGJdy' },
    contentType: 'application/json',
    success: function (result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});


var cats = 'Persian'

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/cats?name=' + cats,
    headers: { 'X-Api-Key': '3/8KnKGZULoO/khwD+e4CQ==pfReAK4gai6UoGzO' },
    contentType: 'application/json',
    success: function (result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});

let names = JSON.parse(localStorage.getItem('names')) || [];

// Updates the displayed list
function updateUI() {
    const list = document.getElementById('nameList');
    list.innerHTML = '';
    names.forEach(name => {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        list.appendChild(listItem);
    });
}

// Generates names based on the selected animal type
function generateName() {
    const animalType = document.getElementById('animalType').value;
    // Sets a request to Randommer API
    const xhr = new XMLHttpRequest();
    const url = `https://randommer.io/api/Name?nameType=fullname&quantity=5`;
    xhr.open("GET", url);
    xhr.setRequestHeader("X-Api-Key", '9b34620ed8f641d8a0b25f4c7b71700e');
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            // Assume the API returns a name in a string or an array
            const name = Array.isArray(response) ? response[0] : response;
            names.push(name);
            if (names.length > 5) {
                names.shift(); // Remove the oldest name if more than 5
            }
            localStorage.setItem('names', JSON.stringify(names));
            updateUI();
        }
    };
    // Sends the request
    xhr.send();
}

updateUI();



// //modal button mecanics
// function TogglebtnEvent() {
//     document.getElementById('btn').click();
// }
// const btnEl = document.querySelector('.btn');
// btnEl.addEventListener('click', () => {
//     btnEl.classList.toggle('token: force');
// })
// const myBtn = document.getElementById("btn");
// myBtn.addEventListener('click', function(e){
//     const name = prompt ('what is your name')
//    document.body.innerHTML = "<h1> Welcome, " + name + "!</hi>";
// });

const myBtn = document.getElementById("btn");

myBtn.addEventListener('click', function(e) {
    const name = prompt('What is your name?');
    document.body.innerHTML = "<h1>Welcome, " + name + "!</h1>";
    
    // Create a back button
    const backButton = document.createElement('button');
    backButton.textContent = 'Go Back';
    backButton.addEventListener('click', function() {
        // history.back(); // Go back to the previous page
        document.location.href = ("http://127.0.0.1:5500/Pawfinder/index.html")
    });
    document.body.appendChild(backButton);
});