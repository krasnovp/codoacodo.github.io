/************  MATRIZ DE PRODUCTOS ****************/
const productos = [
  {
    nombre: "Estudiante",
    descripcion:"Tienen un descuento",
    descuento:80,
    aclaracion:"* presentar documentación",
    codigo: "1",
    precio:200,
  },
  {
    nombre: "Trainee",
    descripcion:"Tienen un descuento",
    descuento:50,
    aclaracion:"* presentar documentación",
    codigo: "2",
    precio:200,
  },
  {
    nombre: "Junior",
    descripcion:"Tienen un descuento",
    descuento:15,
    aclaracion:"* presentar documentación",
    codigo: "3",
    precio:200,
  },
  
]

/************  MANEJADOR DE LISTADO DE PRODUCTOS ****************/

// Creación del arreglo 'listado' que guarda el cambio (.map()) de la matriz de datos a bloques de HTML para ser añadidos
// a la esctructura del archivo index.html en la sección que corresponda. Estos bloques de HTML tienen un llamado a la
// función 'agregarItem' que va a ir generando el carrito de compras en si.

// función 'callback' con el parámetro 'producto' que contiene 1 bloque de datos
let bloquesHTML = productos.map((producto) => ` 
                            <div class="col-3" id="${producto.codigo}">
                                <div class="card m-1">
                                    <div class="card-body">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text ">${producto.descripcion}</p>
                                        <p class="card-text ">${producto.descuento}%</p>
                                        <p class="card-text ">${producto.aclaracion}</p>

                                        <a href="#" class="btn btn-primary" onclick="agregarItem(${producto.codigo})">Agregar</a>
                                    </div>
                                </div>
                            </div>`);



function mostrarTickets() {
  document.querySelector('#home').innerHTML = "";
  document.querySelector(`#tickets`).classList.remove("invisible");
  document.querySelector(`#tickets`).classList.add("visible");
  document.querySelector(`#lista`).innerHTML = "";
  bloquesHTML.forEach((bloque) => document.querySelector(`#lista`).insertAdjacentHTML("beforeend", bloque));

}
                            
function borrarFormulario(){
  let formulario = document.querySelector('#formularioCarrito');
  formulario.reset();
}

function calcularTotal(){
  let descuento = document.querySelector('#tipoTicket').value;
  let total = document.querySelector('#total');
  let totalTicket = 200-(200 * descuento);
  total.innerHTML = totalTicket;
}


/************  CARRITO DE COMPRAS  ****************/

// Primero se crea el arreglo vacío que va a contener los productos que vaya eligiendo el usuario final. Este arreglo es
// a modo lógico para poder realizar la sumatoria aquellos precios de los productos elegidos, tomando en cuenta también 
// que puede elegirse un mismo producto más de una vez.
let carrito = [];

generarHTMLcarrito = (item) => item.map(prod => `
                            <div class="card w-50 m-auto" id="${prod.codigo}">
                              <div class="card-body">
                                <h5 class="card-title">${prod.nombre}</h5>
                                 <a href="#" class="btn btn-danger" onclick="eliminarItem(${prod.codigo})">Eliminar</a>
                              </div>
                            </div>`)

// *** FUNCIÓN AGREGAR ITEM ***
// Esta función se ejecuta al darle click a cualquier botón 'Agregar' de un producto. Recibe como parámetro el código del
// producto que se le dio click para poder seleccionar el producto y agregarlo dentro del arreglo 'carrito' (mediante un 
// push). Luego genera el bloque de HTML que será agregado mediante DOM y lo guarda en la variable 'itemHTML'. 
// Añade el bloque de HTML (itemHTML) dentro de la sección 'carrito' del archivo index.html. Por último le quita la 
// clase 'd-none' al botón de "Completar Compra" para que se muestre en la página.
agregarItem = (codigoRecibido) => {
  let item = productos.filter(producto => producto.codigo == codigoRecibido);
  console.log("item",item)
  carrito.push(item[0]);
  let itemHTML = generarHTMLcarrito(item);
  document.querySelector(`#carrito`).insertAdjacentHTML("afterbegin", itemHTML);
  document.querySelector(`button`).classList.remove("d-none");
}

// *** FUNCIÓN ELIMINAR ITEM ***
// Esta función se ejecuta al darle click a cualquier botón 'Eliminar' de un producto que esté dentro del carrito. Recibe 
// como parámetro el código del producto que se le dio click para poder seleccionar el producto y quitarlo del arreglo 
// 'carrito' (mediante un splice). Luego selecciona el bloque del DOM por el código y lo guarda en la variable 'eliminar'. 
// Elimina el bloque de HTML (eliminar) de la sección 'carrito' del archivo index.html (.removeChild()). Como último paso 
// verifica si el último elementro del DOM fue eliminado del carrito (quedaría solo el botón "Completar Compra"), si queda
// solamente el botón, le agrega la clase 'd-none' para que se oculte.
eliminarItem = (codigoRecibido) => {
  let item = carrito.indexOf(codigoRecibido);
  carrito.splice(item, 1)
  let eliminar = document.getElementById(`${codigoRecibido}`)
  eliminar.parentNode.removeChild(eliminar);
  if (document.querySelector(`#carrito div`) == document.querySelector(`#carrito div.d-flex`)){
    document.querySelector(`button`).classList.add("d-none")
  }
}

// *** FUNCIÓN COMPLETAR COMPRA ***
// Esta función se ejecuta al darle click al botón 'Completar Compra' del carrito. Ejecuta el método .reduce() para sumar
// todos los precios que estén dentro del carrito de compras (se inicializa la suma en 0) y guarda el resultado en la  
// variable 'subTotal'. Luego crea una alerta con un mensaje que genera de manera dinámica el impuesto y el total de la 
// compra. Cuando se cierra o da 'ok' a la alerta, se ejecuta el método window.location.reload() que vuelve a cargar la
// página y queda lista para realizar una nueva compra.
completarCompra = () =>{
  let subTotal = carrito.reduce((acumulador, item) => acumulador + item.precio, 0)
  alert(`Muchas gracias por su compra!
            Subtotal: ${subTotal.toLocaleString(`en-US`, {style: `currency`, currency: `USD`,})}
            I.V.A.: ${(subTotal*.21).toLocaleString(`en-US`, {style: `currency`, currency: `USD`,})}
            Total Compra: ${(subTotal*1.21).toLocaleString(`en-US`, {style: `currency`, currency: `USD`,})}
            `)
  window.location.reload();
}

// Event listener del botón "Completar Compra" para ejecutar la función homónima cuando se le da click (al botón).
document.querySelector(`button.btn`).addEventListener(`click`, completarCompra);