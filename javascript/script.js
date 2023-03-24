

const productos = [
    {
        id: 1,
        nombre: "Cucha",
        precio: 5000,
        filtro: {
            categoria: "cuchas",
        }
    },
    {
        id: 2,
        nombre: "Cama",
        precio: 1000,
        filtro: {
            categoria: "camas"
        }
    },
    {
        id: 3,
        nombre: "Alimentos",
        precio: 1500,
        filtro: {
            categoria: "alimentos"
        }
    },
    {
        id: 4,
        nombre: "Correas",
        precio: 2000,
        filtro: {
            categoria: "correas"
        }
    },

];



// llamado al DOM de la <ul> 
const misProductos = document.querySelector("#productos");
// creacion de filtros 
// declaracion de variables llamando a los botones para filtrar
const btnTodos = document.querySelector("#todos");
const btnCamas = document.querySelector("#camas");
const btnCuchas = document.querySelector("#cuchas");
const btnAlimentos = document.querySelector("#alimentos");
const btnCorreas = document.querySelector("#correas");
// boton de compra
const btnComprar = document.querySelectorAll(".comprar");
// funcion que carga los productos obtenidos del Array
function cargarProductos(productosElegidos) {
    
    productosElegidos.forEach(producto => {
        const li = document.createElement("li")
        li.classList.add("col-md-4");
        li.classList.add("text-center")
        li.classList.add("mb-4")
        li.innerHTML = `<img src="./images/cama.jpg" alt="">
        <p class="">${producto.nombre}</p>
        <p class="">$${producto.precio}</p>
        <button type="button" class="comprar" id="${producto.id}">Agregar al Carrito</button>
        `
        misProductos.append(li);
    });


};

cargarProductos(productos);



btnTodos.addEventListener("click", () => {
    misProductos.innerHTML = "";
    cargarProductos(productos);
});

btnCamas.addEventListener("click", () => {
    const camas = productos.filter(producto => producto.filtro.categoria === "camas")
        misProductos.innerHTML = "";
    cargarProductos(camas);
});
btnCuchas.addEventListener("click", () => {
    const cuchas = productos.filter(producto => producto.filtro.categoria === "cuchas")
        misProductos.innerHTML = "";
    cargarProductos(cuchas);
});
btnAlimentos.addEventListener("click", () => {
    const alimentos = productos.filter(producto => producto.filtro.categoria === "alimentos")
        misProductos.innerHTML = "";
    cargarProductos(alimentos);
});
btnCorreas.addEventListener("click", () => {
    const correas = productos.filter(producto => producto.filtro.categoria === "correas")
        misProductos.innerHTML = "";
    cargarProductos(correas);
});

let carrito = [];
function agregarAlCarrito (e) {
    const idProducto = e.currentTarget.id;
    const productoEncontrado = productos.find(producto => producto.id == id.producto);
    if(productoEncontrado) {
        carrito.push(productoEncontrado);
        console.log(`Producto ${productoEncontrado.nombre} agregado al carrito`);
    } else {
        console.log(`No se encontro ningun producto con ID ${idProducto}`);
    }
};

btnComprar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
});
console.log(carrito);

    

