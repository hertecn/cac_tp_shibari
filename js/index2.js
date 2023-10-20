//api
// Coloca tu clave de API de Flickr aquí
const apiKey = 'db65cfb15dfc6027427039c65cdf80d6';
const searchTerm = 'shibari cuerda'; // Término de búsqueda

// Función para obtener un valor aleatorio dentro de un rango
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para realizar la solicitud a la API de Flickr
function getFlickrImages() {
    const flickrApiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchTerm}&format=json&nojsoncallback=1`;

    // Realiza la solicitud a la API de Flickr utilizando la función fetch
    fetch(flickrApiUrl)
        .then(response => response.json())
        .then(data => {
            const maxResults = data.photos.photo.length;
            const randomIndex = getRandomInt(0, maxResults - 1);
            const photo = data.photos.photo[randomIndex];

            const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

            // Crea un elemento de imagen y establece su atributo src
            const img = document.createElement('img');
            img.src = imageUrl;

            // Selecciona el elemento con el ID "result" y agrega la imagen como hijo
            const resultElement = document.getElementById('resultados');
            resultElement.appendChild(img);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Ejecuta la función para obtener imágenes al cargar la página
document.addEventListener('DOMContentLoaded', getFlickrImages);