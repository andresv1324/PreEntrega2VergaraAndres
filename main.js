class Bebidas{
    constructor(id,nombre,volumne,precio,){
        this.id = id
        this.nombre = nombre
        this.volumne = volumne
        this.precio = precio
        this.cantidad = 0
    }

    infoB(){
        return "_____________________________________________________\n"+"ID:" +this.id +"   " +this.nombre + "   "+ this.volumne + "   " +"PRECIO: "+ this.precio + "\n"
    }

    infoCa(){
        return "_____________________________________________________\n"+"ID:" +this.id +"   " +this.nombre + "   "+ this.volumne + "   " +"PRECIO: "+ this.precio + "   " + "Unidades: "+this.cantidad +"\n"
    }

    agregarCantidad(unidades){
        this.cantidad = this.cantidad + unidades
    }
    
    eliminarCantidad(unidades){
        this.cantidad = this.cantidad - unidades
    }
}

class Carrito{
    constructor(){
        this.listaCompras=[]
    }

    guardar(bebidaNueva){
        let existe = this.listaCompras.some(bebida => bebida.id == bebidaNueva.id)
        if(!existe){
            this.listaCompras.push(bebidaNueva)
        }
    }

    eliminar(bebidaNueva, unidades) {
        console.log(bebidaNueva);
        let bebida = this.listaCompras.find(b => b.id == bebidaNueva.id);
    
        if (bebida) {
            let indice = this.listaCompras.findIndex(b => b.id == bebidaNueva.id);
    
            if (unidades < bebida.cantidad) {
                this.listaCompras[indice].cantidad = this.listaCompras[indice].cantidad - unidades;
                console.log(this.listaCompras);
            } else if (unidades == bebida.cantidad) {
                this.listaCompras.splice(indice, 1);
                console.log(this.listaCompras); // Corregir 'console.listaCompras' a 'console.log(this.listaCompras)'
            }
        }
    }
    

    ver(){
        let menuCarrito = ""
        this.listaCompras.forEach(bebida =>{
            menuCarrito = menuCarrito + bebida.infoCa()
        })
        return "Productos En El Carrito\n"+menuCarrito
    }

	compraFinal(){
		return this.listaCompras.reduce( (total,bebida) => total+bebida.precio * bebida.cantidad,0 )
	}
}


class ControladorBebidas{
    constructor(){
        this.controlBebidas = []
    }

    agregar(bebida){
        this.controlBebidas.push(bebida)
    }

    info(){
        let menuBebidas = ""
        this.controlBebidas.forEach(bebida =>{
            menuBebidas = menuBebidas + bebida.infoB()
        })
        return "La Compra Se Realiza Por El ID De La Bebida\n"+menuBebidas
    }

    buscarBe(id){
        return this.controlBebidas.find(bebida => bebida.id == id)
    }
}

//Bebidas
const b1 = new Bebidas(1,"Limonada","340ml",1200)
const b2 = new Bebidas(2,"Coca Cola","310ml",520)
const b3 = new Bebidas(3,"Coca Cola Zero","310ml",530)
const b4 = new Bebidas(4,"Pepsi","310ml",550)
const b5 = new Bebidas(5,"Pepsi Zero","310ml",570)
const b6 = new Bebidas(6,"Fanta","235ml",460)
const b7 = new Bebidas(7,"Sprite","500ml",350)
const b8 = new Bebidas(8,"Fernet Branca","750ml",2980)
const b9 = new Bebidas(9,"Vodka","700ml",1870)


//Agregar Productos A Una Clase
const listaBebidas = new ControladorBebidas()
const carrito = new Carrito()

listaBebidas.agregar(b1)
listaBebidas.agregar(b2)
listaBebidas.agregar(b3)
listaBebidas.agregar(b4)
listaBebidas.agregar(b5)
listaBebidas.agregar(b6)
listaBebidas.agregar(b7)
listaBebidas.agregar(b8)
listaBebidas.agregar(b9)

//Bucle De Peticiones
while (true){


	let accion = prompt("\tIngresar  (Agregar)  Para Ver Las Bebidas Y Agregar A El Carrito\n" + "\tIngresar  (Continuar)  Para Finalizar Su Compra\n" + "\tIngresar  (Bebidas)  Para Agregar Otra Bebida\n" + "\tIngresar  (Carrito)  Para Ver Los Productos Que Lleva Con El Total\n" + "\tIngresar  (Eliminar)  Para Quitar Una Bebida De Su Orden\n").toLowerCase()
	
    if  (accion ==="agregar")  {

        //Mostrar Las bebidas
        alert(listaBebidas.info())

	    //Peticion De La Bebida Y cantidad
	    let id =Number(prompt("Ingrese La ID De la Bebida"))
	    const bebida = listaBebidas.buscarBe(id)
	
	    let unidades = Number(prompt("Ingrese La Cantidad De La Bebidas que Desea"))

	    //Guardar La Cantidad y La Bebida
	    /*bebida.cantidad = unidades*/
        bebida.agregarCantidad(unidades)
	    carrito.guardar(bebida)
    }

	else if (accion === "continuar"){
	//Informar el total
	alert("El Total De Su Compra Es De: $"+carrito.compraFinal())
	break
	}
	
	else if (accion==="bebidas"){
		alert(listaBebidas.info())
	}

	else if (accion==="carrito"){
		//Ver carrito
		alert(carrito.ver() + "\n\nEl Total De Su Compra Es De: $"+carrito.compraFinal())
	}

    else if (accion="elimnar"){
        alert(carrito.ver())
        let id =Number(prompt("Ingrese La ID De la Bebida"))
	    const bebida = listaBebidas.buscarBe(id)
	
	    let unidades = Number(prompt("Ingrese La Cantidad De La Bebidas que Desea Eliminar"))

	    carrito.eliminar(bebida,unidades)
    }
}

//PreEntrega2 Vergara Andres