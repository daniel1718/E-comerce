import { darkMode } from "./componets/dark-mode.js";
import { carrito } from "./componets/carrito.js";
import { scroll } from "./componets/scroll.js";

const productosStore = [
    {
        nombre: "Hoodies", 
        precio: "$ 14.00", 
        img: 'https://i.ibb.co/S7dPp5D/featured1.png',
        stock: "10",
        id: 1, 
    },
                        
    {
        nombre: "Shirts", 
        precio: "$ 15.00", 
        img: 'https://i.ibb.co/QNHZd4K/featured2.png',
        stock: "15",
        id: 2, 
    },
                         
    {
        nombre: "Sweatshirts", 
        precio: "$ 12.00", 
        img: 'https://i.ibb.co/R7CZn5n/featured3.png',
        stock: "20",
        id: 3, 
    },
                   
];

document.addEventListener( "DOMContentLoaded", () =>{
       load()
       incorporarProductos(productosStore);
       darkMode();
       carrito();
       scroll();
       productos();
});

/* =========== LOADER ========== */
const loader = document.getElementById( "loader" )
function load () {
    setTimeout(() => {
        loader.classList.add( "hide" )
    }, 3000);
}


const cardProductos= document.querySelector(".productos__card")

function incorporarProductos(productosFet){
    let card = ``;
    productosFet.map(products => {
        card += `<div class="cards">
            <div class="card__img">
                <img src=${products.img} class="img-products" alt="${products.nombre}">
            </div>
            <div class="card__info">
                <h2>${products.precio}</h2> 
                <p>Stock: ${products.stock}</p>
                <h3>${products.nombre}</h3>
                <button class="btn-add-cart" data-id="${products.id}">+</button>
            </div>
        </div>`
    });
    cardProductos.innerHTML = card;
}
