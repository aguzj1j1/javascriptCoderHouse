class Cart {
    constructor() {
        this.carrito = [];
    }
    addCart(id, cantidad, precio, producto, tieneDescuento) {
        var descuentoAplicar, descuentoAplicado = 0;
        if (this.validateParam(cantidad, precio, producto).length > 0) {
            return this.validateParam(cantidad, precio, producto);
        }

        if (tieneDescuento) {
            descuentoAplicar = Number(prompt("ingrese valor del descuento"));
            descuentoAplicado = this.calculateDiscount(this.descuento, precio, cantidad);
        }

        this.carrito.push({
            idProducto: id,
            producto: producto,
            precio: precio,
            cantidad: cantidad,
            descuento: descuentoAplicar,
            precioConDescuento: descuentoAplicado
        })

        return 'el producto ha sido agregado al carrito'
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

    }
    productsInCart(){
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
}
let productos = [{
    idProducto: 1,
    cantidad: 1,
    precio: 30,
    producto: 'Crema hidratante día',
    descuento: false,
    stock:3
}, {
    idProducto: 2,
    cantidad: 1,
    precio: 5,
    producto: 'Crema hidratante Noche',
    descuento: false
}, {
    idProducto: 3,
    cantidad: 1,
    precio: 5,
    producto: 'Protector solar 65',
    descuento: false
}];
var carrito = new Cart();
addCarrito = (id) => {
    let domCart = document.querySelector("#cantidad");
    let element = '<span id="cantidad">@elemento</span>'
    let productoToCart = productos.filter((item) => item.idProducto == id);  
     for (const producto of productoToCart) {
         carrito.addCart(producto.idProducto,producto.cantidad, producto.precio, producto.producto, producto.descuento);
         console.log(`el producto fue agregado  ${producto.producto}`)
     }
     
    domCart.innerHTML = element.replace(/@elemento/g,carrito.productsInCart());
}
deleteProducto = () => {
    carrito.eliminarProducto(1);
}
// addCarrito();
deleteProducto();
console.log(carrito.carrito)

carrito.addQuantity(2);
console.log(carrito.carrito)

