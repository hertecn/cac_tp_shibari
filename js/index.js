
//filtra articulos por precio
var products = document.querySelectorAll(".tienda");
const pagination = document.querySelector(".pagination");
var visibleProducts = [];
var ordenArticulos = "aleatorio"; // Puede ser "asc" o "desc" o "aleatorio"
const gridContainer = document.querySelector(".container_articulos");


const itemsPerPage = 6; // Número de productos por página
let currentPage = 1;

displayProductos = [];  //array para almacenar el estado de display de cada producto


function filterProducts() {

    const minPrice = 1000;
    const maxPrice = document.querySelector(".price-slider").value || Number.MAX_SAFE_INTEGER;
    console.log("  ");

    if (displayProductos.length === 14) { //elimino todo el array si llego a la cantidad de items total
        displayProductos.length = 0;
    }

    if (ordenArticulos !== "aleatorio") {
        products = visibleProducts.slice();   //carga products con los elementos ordenados  
    }

    products.forEach(elemento => {    //reordena el grid con los elementos desde product
        gridContainer.appendChild(elemento);
    });


    products.forEach((product) => {
        // console.log(product.getAttribute("data-price"));
        const productPrice = parseFloat(product.getAttribute("data-price"));
        if (productPrice >= minPrice && productPrice <= maxPrice) {
            product.style.display = "block";
            displayProductos.push("block");


        } else {

            product.style.display = "none";
            displayProductos.push("none");
        }

    });

    currentPage = 1; // Restablecer la página actual al filtrar

    updatePagination();
}

function updatePagination() {
    const visibles = Array.from(products).filter((product) => product.style.display !== "none");

    const totalPages = Math.ceil(visibles.length / itemsPerPage);


    pagination.innerHTML = ""; // Limpiar la paginación actual

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.addEventListener("click", () => {
            currentPage = i;
            showPage();
        });
        const listItem = document.createElement("li");
        listItem.appendChild(pageLink);
        pagination.appendChild(listItem);
    }

    showPage();
}

function showPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let mostrar = 0;                                    //variable que lleva el conteo de la cantidad de articulos a mostrar



    products.forEach((product, index) => {


        if (displayProductos[index] === "block") {
            if (mostrar >= startIndex && mostrar < endIndex) {
                console.log(product.getAttribute("data-price"));

                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
            mostrar++;
        }
    });
}
// Mostrar todos los productos al cargar la página
filterProducts();


const priceSlider = document.querySelector(".price-slider");
const priceValue = document.querySelector("#price-value");

priceSlider.addEventListener("input", () => {
    priceValue.textContent = priceSlider.value;
});







// Agrega un manejador de eventos para los botones de orden
const ordenTienda = document.getElementById("sort-buttons");
// const sortDescButton = document.getElementById("sort-desc");
ordenTienda.addEventListener("change", function () {
    // Actualiza la variable 'orden' con el valor seleccionado
    ordenArticulos = ordenTienda.value;
    console.log(ordenArticulos);
    // Luego, puedes hacer lo que desees con la variable 'orden'
    sortProducts();
    filterProducts();
});






// Función para ordenar los productos
function sortProducts() {
    //  visibleProducts = Array.from(products).filter((product) => product.style.display !== "none");
    visibleProducts = Array.from(document.querySelectorAll(".tienda"));

    visibleProducts.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute("data-price"));
        const priceB = parseFloat(b.getAttribute("data-price"));

        if (ordenArticulos === "asc") {

            return priceA - priceB;


        } else {

            return priceB - priceA;
        }
    });


    
}













//valida datos del formulario
function validarFormulario() {
    let nombre = document.getElementById("Nombre").value.trim()
    let apellido = document.getElementById("Apellido").value.trim()
    let edad = document.getElementById("Edad").value.trim()
    let correo = document.getElementById("Correo_electronico").value.trim()
    let celular = document.getElementById("Celular").value.trim()
    let incompleto = false;

    Nombre.style.borderColor = "black";
    Apellido.style.borderColor = "black";
    Edad.style.borderColor = "black";
    Correo_electronico.style.borderColor = "black";
    Celular.style.borderColor = "black";

    console.log("hola");


    if (nombre === "") {
        marcarIncompleto(Nombre);
    }

    if (apellido === "") {
        marcarIncompleto(Apellido);
    }

    if (edad === "") {
        marcarIncompleto(Edad);
    }

    if (correo === "") {
        marcarIncompleto(Correo_electronico);
    }

    if (celular === "") {
        marcarIncompleto(Celular);
    }


    if (incompleto === true) {
        alert("Complete el formulario")
        return false;
    }


    function marcarIncompleto(item) {
        item.style.borderColor = "red";
        incompleto = true;
    }


    return true;

}


$(document).ready(function () {
    $("#Edad").keypress(function () {
        if (this.value.length == 2) {
            return false;
        }

    })

})








