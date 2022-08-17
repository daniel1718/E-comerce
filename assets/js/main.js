import { darkMode } from "./componets/dark-mode.js";
import { carrito } from "./componets/carrito.js";
import { scroll } from "./componets/scroll.js";
import { menu } from "./componets/menu.js";

const productosStore = [
    {
        id: 1, 
        nombre: "Hoodies", 
        precio: 14.00, 
        img: 'https://i.ibb.co/S7dPp5D/featured1.png',
        categoria: 'hoodies',
        stock: 10,
    },
                        
    {
        id: 2, 
        nombre: "Shirts", 
        precio: 24.00, 
        img: 'https://i.ibb.co/QNHZd4K/featured2.png',
        categoria: 'shirts',
        stock: 15,
    },
                         
    {
        id: 3, 
        nombre: "Sweatshirts", 
        precio: 24.00, 
        img: 'https://i.ibb.co/R7CZn5n/featured3.png',
        categoria: 'sweatshirts',
        stock: 20,
    },
                   
];

document.addEventListener( "DOMContentLoaded", () =>{
       load()
       incorporarProductos(productosStore);
       darkMode();
       carrito();
       scroll();
    //    productos();
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
        card += `<div class="cards" id ='${products.id}' >
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
    cartFunctionality()
}



function cartFunctionality() {
    let carts = document.querySelector("#cart-products");
    let cartProducts = document.createElement("div");
    let cart = []
    let productsHTML = "";
    const btns = document.querySelectorAll( ".btn-add-cart" )
    btns.forEach( button => {
        button.addEventListener('click', e =>{
            const id = parseInt(e.target.parentElement.parentElement.id)
            const selectedProduct = productosStore.find( producto => producto.id === id)
            console.log(selectedProduct);
            
            if( cart.indexOf(selectedProduct)!== -1 ){
                if(selectedProduct.unidades>=1 && selectedProduct.unidades!==selectedProduct.stock){
                    selectedProduct.subtotal += selectedProduct.precio
                    selectedProduct.unidades++
                }else{
                    window.alert("No contamos con suficiente stock");
                }
            }else{
                cart.push( selectedProduct )
                selectedProduct.unidades = 1
                selectedProduct.subtotal = selectedProduct.precio
            }
            console.log(cart);

            cart.forEach(element =>{
                if (element.unidades === 1){
                    productsHTML +=` 
                    <div class="products--item" id="${element.id}">
                    <div class="item--container-img">
                    <img src=${element.img} class="item--img" alt="">
                    </div>
                    <div class="item--info">
                    <h4>${element.nombre}</h4>
                    <small>Stock: ${element.quantity}|</small>
                    <p>$${element.precio}</p>
                    <p id="subtotal${element.id}">Subtotal: $${element.subtotal}.00</p>
                    <div class="info--button">
                    <button id='button-less'>-</button>
                    <p id="units${element.id}">${element.unidades} units</p>
                    <button id='button-plus'>+</button>
                    </div>
                    </div>
                    <i class='bx bx-trash-alt'></i>          
                    </div> `
                    cartProducts.innerHTML = productsHTML
                    carts.appendChild(cartProducts)
                    console.log(carts)
                    }else{
                        document.getElementById(`subtotal${element.id}`).textContent=`Subtotal: $${element.subtotal}.00`
                        document.getElementById(`units${element.id}`).textContent=`${element.unidades} units`
                    }})

        })
    })
}