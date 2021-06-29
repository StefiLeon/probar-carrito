const IVA = 1.21

//Defino el carrito
let carrito = [];
let contador = 0;

//Agregar productos desde el JSON estatico
const URLJSON = "./productos.json";
$.getJSON(URLJSON, function(respuesta, estado){
    let total = 0;
    if(estado === "success") {
        let productos = respuesta.productos;
        for (const producto of productos) {
            $("#carritoEnJS").append(`<div class="col-lg-6 pb-4">
            <div class ="tarjeta-productos d-flex align-items-center">
            <img src="${producto.imagen}">
            <div class="container text-center">
            <h4 class="mt=4 mb-4"> ${producto.tipoDeProducto} ${producto.modelo}</h4><br>
            <p> $ ${producto.precio}</p><br>
            <button class="btn btn-lg btn-info" id="btn${producto.id}">Comprar</button>
            </div>
            </div>
            </div>`);
            $(`#btn${producto.id}`).popover({
                content: "Producto agregado al carrito",
                trigger: 'focus',
                delay: {"show": 100, "hide": 100},
                placement: 'top',
                container: $(`#btn${producto.id}`)
            });
            $(`#btn${producto.id}`).on('click', function(){
                let idDeCompra = false;
                for (item of carrito) {
                    if(item.id == producto.id) {
                        console.log("Hay coincidencia.")
                        item.cantidad = item.cantidad+1;
                        console.log(carrito);
                        idDeCompra = true;
                        total += producto.precio;
                        console.log(total);
                        $("#lista-carrito").prepend(`<p class="compras">${producto.tipoDeProducto} ${producto.modelo}: $ ${producto.precio}</p>`);
                        presupuestoTotal.innerHTML = "El precio total es de $ " + total;
                        const enJSON = JSON.stringify(producto);
                        localStorage.setItem(`${producto.tipoDeProducto} ${producto.modelo}`, enJSON);
                        return total;
                    }
                }
                if (idDeCompra == false) {
                    productoParaAgregar = productos[producto.id - 1];
                    agregarProducto(productoParaAgregar);
                    total += producto.precio;
                    console.log(total);
                    $("#lista-carrito").prepend(`<p class="compras">${producto.tipoDeProducto} ${producto.modelo}: $ ${producto.precio}</p>`);
                    presupuestoTotal.innerHTML = "El precio total es de $ " + total;
                    const enJSON = JSON.stringify(producto);
                    localStorage.setItem(`${producto.tipoDeProducto} ${producto.modelo}`, enJSON);
                    return total;
                }
            });
        }
        const presupuestoTotal = document.createElement('p');
        presupuestoTotal.id = "presupuestoTotal";
        if(contador>0){
            document.getElementById("presupuestoTotal").innerHTML = "El precio total es de $ " + total;
            return total;
        }
        contador++;
        $('#lista-carrito').append(presupuestoTotal);
        return total;
    }
});

//Definir cantidad como propiedad que se puede sobreescribir
function agregarProducto(producto) {
    Object.defineProperty(producto, 'cantidad', {value: 1, writable: true});
    carrito.push(producto);
    console.log(carrito);
}

//Mostrar carrito
$("#carritoDeCompras").on('click', function() {
    let precioTotal = document.getElementById("lista-carrito");
    if (precioTotal.style.display === "none") {
        precioTotal.style.display = "block";
    } else {
        precioTotal.style.display = "none";
    }
});

//Animacion del titulo
$(".hero-text").prepend('<h1 id="h1-ht" style="display: none">Tienda FutFem</h1>');
$(document).ready(function(){
    $("#h1-ht").delay(1500)
    .slideDown("slow");
});