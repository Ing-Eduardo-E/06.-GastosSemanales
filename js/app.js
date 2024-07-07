//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

let presupuesto;


//Eventos

eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}


//Clases
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }
  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    console.log(this.gastos);
  }
}

class UI {
  insertarPresupuesto({ presupuesto, restante }) {
    //Agregar al HTML
    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = restante;
  }
}

//Instanciar la clase UI
  const ui = new UI();
  


//Funciones
function preguntarPresupuesto() {
  const presupuestoUsuario = prompt('Cual es tu presupuesto?');
  //console.log(Number(presupuestoUsuario));
  if (isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
    //console.log("reiniciando presupuesto");
    window.location.reload();
  }

  presupuesto = new Presupuesto(presupuestoUsuario);
  console.log(presupuesto);

  ui.insertarPresupuesto(presupuesto); //Agrega el presupuesto a la interfaz
}
