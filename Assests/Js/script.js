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
    const url = `https://randommer.io/api/Name?nameType=${animalType}&quantity=1`;
    xhr.open("GET", url);
    xhr.setRequestHeader("X-Api-Key", 'fe440680912f4080b1396d8265fed9b3');
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