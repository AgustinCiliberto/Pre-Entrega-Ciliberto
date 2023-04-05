let productos = [];
fetch("./javascript/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    });



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

// funcion que carga los productos obtenidos del Array, se crea los elementos hijos a la ul padre declarada en el HTML, se agregan clases(bootstrap para poder acomodarlos un poco). Y se crea su contenido HTML para despues appendearlo al padre
function cargarProductos(productosElegidos) {
    
    productosElegidos.forEach(producto => {
        const li = document.createElement("li")
        li.classList.add("col-md-4");
        li.classList.add("text-center")
        li.classList.add("mb-4")
        li.innerHTML = `<img src="${producto.imagen}" alt="">
        <p class="">${producto.nombre}</p>
        <p class="">$${producto.precio}</p>
        <button type="button" class="comprar btn btn-warning" id="${producto.id}">Agregar al Carrito</button>
        `
        misProductos.append(li);
        
    });
    //  llamado al DOM del boton agregar al carrito (la clase se le dio en la funcion de arriba)
    const btnComprar = document.querySelectorAll(".comprar");
    //Esta funcion recorre todos los botones añadiendole el evento click, se parsea a enteros todos los id del boton para igualarlos al ID del producto y traerlos con find.
    
    btnComprar.forEach((boton) => {
        boton.addEventListener("click", ()=>{
            const id = parseInt(boton.id);
            const producto = productos.find(producto => producto.id === id)
            // se genera la condicion de que si producto es true, se pushea el elemento seleccionado al carrito y se guarda en el storage;
            if(producto){
                carrito.push(producto);
                guardarCarritoStorage();
            }
            console.log(carrito);
        });
    });
};
// llamado a la funcion por parametro




// Creacion de filtros en botones, se establece por defecto que al cargar la pagina el HTML comience vacio. y al hacer click ejecute la funcion de carga de productos. En este primer caso cargaria todos los productos
    btnTodos.addEventListener("click", () => {
        misProductos.innerHTML = "";
        cargarProductos(productos);
    });
    // Se crean filtros por categoria declaradas en el array de objetos principal. Igualando a los filtros aplicados con los declarados. Por ultimo llama a la funcion con la variable del filtro en si.
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

// Se crea el carrito. 
//Para que no pase que cada vez que agreguemos productos al carrito, el mismo se vacie y vuelva a llenar con los nuevos productos elegidos traemos el historial de localStorage y ejecutamos una condicion. Si tiene algo dentro iguala el carrito al llamado de local Sorage, si no crea un array nuevo.
let carrito;
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));
if (productosEnCarrito){
    carrito = productosEnCarrito
}else {
    carrito = []
};



//Se guarda el carrito en local storage para poder trabajarlo en el otro archivo JS
function guardarCarritoStorage() {
    let carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
};



console.log(carrito)






