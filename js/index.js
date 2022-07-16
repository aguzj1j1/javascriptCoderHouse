class Cart {
    constructor() {
        debugger;
        this.carrito = this.getProductosLocalStorage() || [];
    }
    addCart(id, cantidad, precio, producto, tieneDescuento,imagenes,stock) {
        var productos = this.getProductosLocalStorage() || [];
        debugger;
        if (productos.filter(actual => actual.idProducto == id).length > 0) {
            if (this.validateStock(id)){
                this.addQuantity(id);
            }else{
                Swal.fire({
                    title: 'No hay más stock del producto',
                    background: ' #8a1538',
                    color: 'white',
                    
                    icon: 'warning',
                    imageWidth: 600,
                    imageHeight: 200,
                    confirmButtonText: 'OK'

                })
                return false;
            }
            
        } else {
            var descuentoAplicar, descuentoAplicado = 0;
            if (this.validateParam(cantidad, precio, producto).length > 0) {
                return this.validateParam(cantidad, precio, producto);
            }

            if (tieneDescuento) {
                descuentoAplicar = Number(prompt("ingrese valor del descuento"));
                descuentoAplicado = this.calculateDiscount(this.descuento, precio, cantidad);
            }
            let object ={
                idProducto: id,
                producto: producto,
                precio: precio,
                cantidad: cantidad,
                descuento: descuentoAplicar,
                precioConDescuento: descuentoAplicado,
                imagenes:imagenes,
                stock:stock
            }
            this.carrito.push(object)
            localStorage.setItem("carrito", JSON.stringify(this.carrito));
            return 'el producto ha sido agregado al carrito'
        }
    }
    addQuantity(idProducto) {
        if (this.carrito.length == 0) {
            return false;
        }
        for (const carro of this.carrito) {
            if (carro.idProducto === idProducto) {
                carro.cantidad = carro.cantidad + 1;
            }
        }
        localStorage.setItem("carrito", JSON.stringify(this.carrito));

    }
    productsInCart() {
        return this.carrito.length;
    }
    eliminarProducto(id) {
        this.carrito = this.carrito.filter((item) => item.idProducto !== id);
    }
    calculateDiscount(descuento, precio, cantidad) {
        return (precio * cantidad) * descuento / 100;
    }
    destroyCart() {
        this.carrito = [];
    }
    validateParam(cantidad, precio, producto) {
        if (cantidad === 0) {
            return "debe ingresar la cantidad a cargar al producto, o un numero mayor a 0";
        }
        if (precio === 0.0) {
            return "debe ingresar un precio mayor a 0.0";
        }
        if (producto == "") {
            return "debe ingresar un producto";
        }
        return false;
    }

    validateStock(id){
       var producto = this.carrito.filter((item) => item.idProducto== id)[0]
        return producto.stock> producto.cantidad;
    }

    getProductosLocalStorage() {
        let productosLocalStorage = JSON.parse(localStorage.getItem("carrito")) || [];
        console.log(productosLocalStorage)
        let productos = []
            for (const iterator of productosLocalStorage) {
                    productos.push(iterator);
            }
        return productos;
    }
}
let productos = [{
    idProducto: 1,
    cantidad: 1,
    precio: 30,
    producto: 'Dermaglos Crema hidratante día',
    descuento: false,
    stock: 3,
    imagenes:'../imgs/7793742002915.jpg'
}, {
    idProducto: 2,
    cantidad: 1,
    precio: 5,
    producto: 'Dermaglos Crema hidratante Noche',
    descuento: false,
    stock: 3,
    imagenes: '../imgs/7793742002922.jpg'
}, {
    idProducto: 3,
    cantidad: 1,
    precio: 5,
    producto: 'Dermaglos  Protector solar 65',
    descuento: false,
    stock: 3,
    imagenes: '../imgs/7793742003264.jpg'
}];
var carrito = new Cart();
addCarrito = (id) => {
    let domCart = document.querySelector("#cantidad");
    let element = '<span id="cantidad">@elemento</span>'
    debugger
    let productoToCart = productos.filter((item) => item.idProducto == id);
    for (const producto of productoToCart) {
        carrito.addCart(producto.idProducto, producto.cantidad, producto.precio, producto.producto, producto.descuento,producto.imagenes,producto.stock);
        console.log(`el producto fue agregado  ${producto.producto}`)
    }

    domCart.innerHTML = element.replace(/@elemento/g, carrito.productsInCart());
}
deleteProducto = () => {
    carrito.eliminarProducto(1);
}
// addCarrito();
// deleteProducto();
// console.log(carrito.carrito)

// carrito.addQuantity(2);
// console.log(carrito.carrito)

window.onload = function() {
    AOS.init()
}
