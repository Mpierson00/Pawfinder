var dogs = 'golden retriever'

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/dogs?name=' + dogs,
    headers: { 'X-Api-Key': 'xCK+HYspJgfwkDvJB6yLZw==r7TwaSDfMZ6tGJdy'},
    contentType: 'application/json',
    success: function(result) {
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
    headers: { 'X-Api-Key': '3/8KnKGZULoO/khwD+e4CQ==pfReAK4gai6UoGzO'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});