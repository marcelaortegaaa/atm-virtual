//CLASE PRINCIPAL (Y ÚNICA)
class Billete {
    constructor (v, c) {
        this.valor = v;
        this.cantidad = c;
    }
}

//LINKS AL DOM
window.onload = contarDinero;

let mon = document.getElementById("dinero");
let resultado = document.getElementById("resultado");

let bot = document.getElementById("extraer");
let uno = document.getElementById("uno");
let dos = document.getElementById("dos");
let tres = document.getElementById("tres");
let cuatro = document.getElementById("cuatro");

bot.addEventListener("click", entregarDinero);
uno.addEventListener("click", entregarDinero);
dos.addEventListener("click", entregarDinero);
tres.addEventListener("click", entregarDinero);
cuatro.addEventListener("click", entregarDinero);


//VARIABLES GLOBALES
let caja = [];
let entregado = [];
let recientes = [];
let papeles, dineroContado, dineroPedido;
let agregar = 0;
let nuevos = 0;

//OPERACIONES PARA LA CAJA
const agregarDinero = (val, can) => {caja.push(new Billete(val, can))}

const agregarBilletes = (bil, can) => {
    for(var pos = 0; pos < caja.length; pos++) {
        if(caja[pos].valor == bil) {
            caja[pos].cantidad += can;
        }
    }
}

function contarDinero() {
    dineroContado = 0;
    
    for(a of caja) {
        dineroContado += (a.valor * a.cantidad);
    }
    
    resultado.innerHTML += "Tu saldo es: $" + dineroContado + "<hr>"
}

agregarDinero(50, 5);
agregarDinero(20, 5);
agregarDinero(10, 5);
agregarDinero(5, 5);
agregarBilletes(50, 5);

//TEXTO EN PANTALLA DE ERROR
const noPuedo = () => {resultado.innerHTML += "No puedo darte ese valor :( <br>"}

//TODO LO QUE SUCEDE CON EL CLICK
function entregarDinero(f) {
    switch (f.srcElement.id) {
        case "extraer":
            dineroPedido = mon.value;
            break;
        case "uno":
            dineroPedido = uno.value;
            break;
        case "dos":
            dineroPedido = dos.value;
            break;
        case "tres":
            dineroPedido = tres.value;
            break;
        case "cuatro":
            dineroPedido = cuatro.value;
            break;
    }

    dineroPedido = parseInt(dineroPedido);

    if (dineroPedido < dineroContado) {
        for (b of caja) {
            if(dineroPedido > 0) {
                let division = Math.floor(dineroPedido / b.valor);

                division > b.cantidad ? papeles = b.cantidad : papeles = division;
            
                if(papeles > 0) {
                    entregado.push( new Billete(b.valor, papeles) );
                    agregar++;
                    nuevos++;
                    b.cantidad -= papeles;
                }

                dineroPedido -= (b.valor * papeles);
                
            }

        }
        
        //SI CUANDO TERMINA TODAVÍA QUEDA DINERO POR ENTREGAR, DEVOLVER TODO
        if(dineroPedido > 0) {
            while(agregar > 0) {entregado.pop(); agregar--}
            b.cantidad += papeles;
            noPuedo();
        }

        //SI CONSIGUE ENTREGAR TODO
        else {
            let novedad = (entregado.length - nuevos);

            for(indice in entregado) {
                if(indice >= novedad) {
                    recientes.push(entregado[indice]);
                }
            }

            for(e of recientes) {
                e.cantidad > 0 ?
                e.cantidad > 1 ?
                    resultado.innerHTML += e.cantidad + " billetes de $" + e.valor+ "<br>" :
                    resultado.innerHTML += e.cantidad + " billete de $" + e.valor+ "<br>" : 0;
            } 
        }
    } 
    
    //SI SE PIDE MÁS DEL DINERO QUE HAY EN CAJA, AUTOMÁTICAMENTE PARAR
    else {
        noPuedo();
    }
    
    //REINICIAR VALORES
    contarDinero();
    agregar = 0;
    nuevos = 0;
    recientes = [];
}

