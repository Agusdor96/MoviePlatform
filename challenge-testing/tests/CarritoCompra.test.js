const CarritoCompra = require("../index");

describe("Una prueba de tests que pasan siempre", ()=>{
    it("Este test debe pasar siempre", ()=>{
        expect(true).toBe(true);
    });
});


describe("La clase CarritoCompra debe tener 3 metodos", ()=>{
    beforeEach(() => {
        carrito = new CarritoCompra();
    });
    it("Debe tener un metodo agregarProducto", ()=>{
        
        expect(typeof carrito.agregarProducto).toBe("function");
    });
    it("Debe tener un metodo calcularTotal", ()=>{
        
        expect(typeof carrito.calcularTotal).toBe("function");
    });
    it("Debe tener un metodo aplicarDescuento", ()=>{
        
        expect(typeof carrito.aplicarDescuento).toBe("function");
    });


});


describe("El metodo agregar producto", ()=>{
    it("Debe agregar un producto", ()=>{
        const carrito = new CarritoCompra();

        const producto = {nombre: "pan", precio:0.5}
        carrito.agregarProducto(producto);
        expect(carrito.producto).toContain(producto);
    });
});

describe("La propiedad producto", ()=>{
    it("debe ser un arreglo", ()=>{
        
        const carrito = new CarritoCompra();

        expect(Array.isArray(carrito.producto)).toBe(true);
    })
});

describe("El metodo calcularTotal", ()=>{
    beforeEach(() => {
       carrito = new CarritoCompra();
    });

    it("debe retornar la suma de los precios de los productos", ()=>{       
  let productos = [
      {id:1, nombre: "pan", precio: 0.5},
      {id:2, nombre: "Manzana", precio: 1.2},
      {id:3, nombre: "Coca", precio: 2.3}
    ]

    productos.forEach(producto => carrito.agregarProducto(producto));
    const total = carrito.calcularTotal()
        expect(total).toBe(4.0);
    })
});

describe("El metodo aplicarDescuento", ()=>{
    beforeEach(() => {
       carrito = new CarritoCompra();
    });

   
    it("debe retornar el total del precio con descuento aplicado", () => {
        let productos = [
            { id: 1, nombre: "pan", precio: 0.5 },
            { id: 2, nombre: "Manzana", precio: 1.2 },
            { id: 3, nombre: "Coca", precio: 2.3 }
        ];

        productos.forEach(producto => carrito.agregarProducto(producto));
        
        const porcentaje = 30; 
        const totalConDescuento = carrito.aplicarDescuento(porcentaje);

        
        const total = carrito.calcularTotal();
        const descuento = total * (porcentaje / 100);
        const totalEsperado = total - descuento;

        expect(totalConDescuento).toBeCloseTo(totalEsperado);
    });
});
