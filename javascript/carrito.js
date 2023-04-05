// Carga del localStorage con los productos seleccionados
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));

// Llamado al DOM del contenedor 
const contenedorProductos = document.querySelector("#productos-carrito")
// Se crea una funcion que recorre el Array traido del localStorage y se crea el documento HTML con sus propiedades. Al final se appendea al div padre. Tambien se llama en la misma a la funcion eliminar para que se actualice el boton
function cargarProductosCarrito() {
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div")
            div.innerHTML = `
                                <div class="d-flex align-items-center justify-content-between mb-4" >
                                    <img src="${producto.imagen}" alt="cama" class="img-carrito">
                                    <p>${producto.nombre}</p>
                                    <p>$${producto.precio}</p>
                                    <button class="fa-solid fa-trash eliminar" id=${producto.id}></button>
                                </div>`
        contenedorProductos.append(div);
        });
        botonesEliminar();
    
};
//Llamado a la funcion antes mencionada
cargarProductosCarrito();
// Se crea la funcion del boton para borrar productos.
// se trae del DOM todos los botones con la clase eliminar y se los recorre con forEach, se le agrega un evento a cada boton el cual le da el mismo ID al que tiene el producto (funcionalidad similar que agregar al carrito), pero en este caso utilizamos findIndex para retornar la posicion del elemento que cumpla la condicion, para luego utilizar splice y filtrar por su indice y borrar solamente el elemento seleccionado.
// Se lo cuarda en localStorage y se recarga la pagina para que pueda reflejarse en el HTML.
function botonesEliminar () {
    let btnEliminar = document.querySelectorAll(".eliminar");
btnEliminar.forEach((boton)=>{
    boton.addEventListener("click", () => {
        const id = parseInt(boton.id);
        const indice = productosEnCarrito.findIndex(producto => producto.id === id);
        productosEnCarrito.splice(indice, 1);
        let carritoJSON = JSON.stringify(productosEnCarrito);
        localStorage.setItem("carrito", carritoJSON);
        location.reload();
    });
    
});
};

//Boton de Vaciar carrito. Se crea una funcion la cual va a reasignar el arrar de los productos en carrito a 0, luego se guarda en localstorage
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
btnVaciarCarrito.addEventListener("click", vaciarCarrito)
function vaciarCarrito (){
    productosEnCarrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
    location.reload();
};


//Funcion que calcula el total. Se realiza un map de los productos en el carrito creando un nuevo array asignado a la variable precios. Luego se hace un reduce para sumar todo lo que contenga el array y se lo asigna a la variable total, que sera el valor que devuelve la funcion
function calcularTotal (productos) {
    let precios = productos.map((producto) => producto.precio);
    let total = precios.reduce((acc, item) => {
        return acc + item;
    });
    return total;
};

// console.log(calcularTotal(productosEnCarrito));

//Texto que ira mostrando el total acumulado de los productos seleccionados. Se crea un texto y su contenido sera el valor de la funcion calcularTotal
const textoTotal = document.querySelector("#total-compra");

function compra (){
    const p = document.createElement("p")
    p.innerHTML = `Total de la compra = $${calcularTotal(productosEnCarrito)}`
    textoTotal.append(p);
};

compra();
//Boton de finalizar compra, se crea una funcion que mostrara un alert, el mismo muestra el precio total de la compra hasta el momento y consulta si se desea finalizar la compra. En caso de aceptar salda otra alerta informando el total y procedera a vaciarse el carrito luego de dos segundos.
const btnFinalizarCompra = document.querySelector("#finalizar-compra")

btnFinalizarCompra.addEventListener("click", finalizarCompra);
function finalizarCompra () {
    Swal.fire({
        title: `Quieres finalizar la compra por $${calcularTotal(productosEnCarrito)}?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Finalizar',
        denyButtonText: `Seguir Comprando`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Compra finalizada', `Precio: $${calcularTotal(productosEnCarrito)}`, 'success');
        setTimeout(vaciarCarrito, 2000);
        } 
      })
}