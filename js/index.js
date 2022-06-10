class Cart {
    constructor(cantidad = 0, precio = 0.0, producto = "", tieneDescuento = false, descuento = 0) {
        this.cantidad = cantidad;
        this.precio = precio;
        this.producto = producto;
        this.tieneDescuento = tieneDescuento;
        this.descuento = descuento;
        this.precioConDescuento = 0;
    }
    addCart(cantidad, precio, producto, tieneDescuento) {
        if (this.validateParam(cantidad, precio, producto).length > 0) {
            return this.validateParam(cantidad, precio, producto);
        }
        this.cantidad = cantidad;
        this.precio = precio;
        this.producto = producto;
        if (tieneDescuento) {
            this.tieneDescuento = tieneDescuento;
            this.descuento = Number(prompt("ingrese valor del descuento"));
            this.precioConDescuento = this.calculateDiscount(this.descuento, precio, cantidad);
        }
        return 'el producto ha sido agregado al carrito'
    }
    addQuantity() {
        this.cantidad = this.cantidad + 1;
    }
    calculateDiscount(descuento, precio, cantidad) {
        return (precio * cantidad) * descuento / 100;
    }
    destroyCart() {
        this.cantidad = 0;
        this.precio = 0.0;
        this.producto = "";
        this.tieneDescuento = false;
        this.descuento = 0;
        this.precioConDescuento = 0;
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
var prueba1 = new Cart()
    alert(prueba1.addCart(1, 50, "prueba1", true))
    prueba1.addQuantity();
    prueba1.destroyCart();
var prueba2 = new Cart();
    alert(prueba2.addCart(10, 20, "prueba2", false))
    prueba2.addQuantity();
    prueba2.destroyCart();