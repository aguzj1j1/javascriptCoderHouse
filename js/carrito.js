renderCarrito = () => {
    let domInner = document.querySelector("#productos")
    let carritoHtml = `
    
        <tr>
            <td>
                <img src="@imagenes" style="width: 200px; height:200px;" alt="..." class="img-thumbnail">
            </td>
            <td>
                <div class="row">
                    <div class="col-lg-12">
                        <h4>@PRODUCTO</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <h9>@Cantidad</h4>
                    </div>
                </div>
            </td>
            <td>
                <h4>$@PRECIO </h4>
            </td>
        </tr>`
    let dom = '';
    let dataStorage = getProductosLocalStorage();
    for (const iterator of dataStorage) {
        dom += carritoHtml.replace(/@PRODUCTO/g,iterator.producto)
                .replace(/@Cantidad/g,iterator.cantidad)
                .replace(/@imagenes/g,iterator.imagenes)
                .replace(/@PRECIO/g,iterator.precio)
    }
    debugger;
    domInner.innerHTML = dom;
}
let getProductosLocalStorage = () => {
    return JSON.parse(localStorage.getItem("carrito"))
}

window.onload = function() {
    renderCarrito();
};