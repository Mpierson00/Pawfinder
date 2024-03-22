// initialize an array to store pet names
let names = JSON.parse(localStorage.getItem('names')) || [];

// Updates the displayed list
function updateUI() {
    const list = document.getElementById('nameList');
    list.innerHTML = ''; //clear the list

    //Creates a list item for each name over the names array
    names.forEach(name => {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        list.appendChild(listItem); //Append the list item to the list
    });
    //If there are 5 or more names, add delete list button to the list
    if (names.length >= 5) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete List';
        deleteButton.onclick = deleteList;
        list.appendChild(deleteButton);
    }
}
//clear the names list
function deleteList() {
    names = []; //Clear the names array
    localStorage.setItem('names', JSON.stringify(names));
    updateUI(); //Refresh the UI
}
// Generates names based on the selected animal type
function generateName() {
    const animalTypeSelect = document.getElementById('animalType');
    const animalType = animalTypeSelect.value;
    const generateButton = document.getElementById('generateButton');
    //If the animal type is not selected, show an error and return
    if (animalType !== 'dog' && animalType !== 'cat') {
        animalTypeSelect.classList.add('pulse'); //add a visual indicator for error
        return;
    } else {
        animalTypeSelect.classList.remove('pulse');
    }

    // Prepare API request to get random names
    const xhr = new XMLHttpRequest();
    const url = `https://randommer.io/api/Name?nameType=fullname&quantity=5`;
    xhr.open("GET", url);
    xhr.setRequestHeader("X-Api-Key", 'e743dc30afe74b2ea1d3f40295e671ae');
    xhr.setRequestHeader("Accept", "application/json");

    //Handle the API response
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
    // Sends the API request
    xhr.send();
}

updateUI();

//Fetch list of dog breeds
fetch("https://dog.ceo/api/breeds/list/all")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data.message)
        var breedsObject = data.message
        var breedsArray = Object.keys(breedsObject); //Get breed names as an array

        //Populate the dropdown with dog breed options
        for (var i = 0; i < breedsArray.length; i++) {
            const option = document.createElement('option');
            option.value = breedsArray[i];
            option.innerText = breedsArray[i];
            select.appendChild(option);
        }
    });

//event listner for breed selection, updating the displayed image
$("#select").on("change", function showImage(e) {
    let url = (`https://dog.ceo/api/breed/${e.target.value}/images/random`)
    getDoggo(url)
})
const img = document.querySelector('.dog-img');
//function to fetcha and display a dog image
const getDoggo = function (url) {
    img.classList.remove('show')
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            img.src = data.message
        })
}
//Adds a "load" event listener to show the image once
img.addEventListener('load', function () {
    img.classList.add('show');
});

//MODAL
// Config
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const scrollbarWidthCssVar = "--pico-scrollbar-width";
const animationDuration = 400; // ms
let visibleModal = null;

// Toggle modal
const toggleModal = (event) => {
    event.preventDefault();
    const modal = document.getElementById(event.currentTarget.dataset.target);
    if (!modal) return;
    modal && (modal.open ? closeModal(modal) : openModal(modal));
};

// Open modal
const openModal = (modal) => {
    const { documentElement: html } = document;
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth) {
        html.style.setProperty(scrollbarWidthCssVar, `${scrollbarWidth}px`);
    }
    html.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
        visibleModal = modal;
        html.classList.remove(openingClass);
    }, animationDuration);
    modal.showModal();
};

// Close modal
const closeModal = (modal) => {
    visibleModal = null;
    const { documentElement: html } = document;
    html.classList.add(closingClass);
    setTimeout(() => {
        html.classList.remove(closingClass, isOpenClass);
        html.style.removeProperty(scrollbarWidthCssVar);
        modal.close();
    }, animationDuration);
};

// Close with a click outside
document.addEventListener("click", (event) => {
    if (visibleModal === null) return;
    const modalContent = visibleModal.querySelector("article");
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
});

// Close with Esc key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && visibleModal) {
        closeModal(visibleModal);
    }
});

// Get scrollbar width
const getScrollbarWidth = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    return scrollbarWidth;
};

// Is scrollbar visible
const isScrollbarVisible = () => {
    return document.body.scrollHeight > screen.height;
};

//EXIT MODAL

//For fetchind data for random cat facts
var url = "https://catfact.ninja/fact"

function fetcher() {
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            $(".cats-fact").html(`<p>"${data.fact}"</p>`)

        })

}
// Event listner
$(window).on("load", fetcher)
$(".clicker").on("click", fetcher)
