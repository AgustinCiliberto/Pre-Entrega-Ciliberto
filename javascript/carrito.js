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
                                    <img src="../images/cama.jpg" alt="cama" class="img-carrito">
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
        console.log(productosEnCarrito);
        productosEnCarrito.splice(indice, 1);
        console.log(productosEnCarrito);
        let carritoJSON = JSON.stringify(productosEnCarrito);
        localStorage.setItem("carrito", carritoJSON);
        location.reload();
    });
    
});
};


