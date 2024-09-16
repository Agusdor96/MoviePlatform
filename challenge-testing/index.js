    class CarritoCompra{
        constructor(){
        this.producto = [];
    }

    agregarProducto(producto) {
            this.producto.push(producto);
    }

    calcularTotal(){
        return this.producto.reduce((total, producto) => total + producto.precio, 0);
        }
    

    aplicarDescuento(porcentaje){
        const total = this.calcularTotal();
        const descuento = total * (porcentaje / 100);
        return total - descuento;
    }
}

module.exports = CarritoCompra;