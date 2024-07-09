//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

let presupuesto;


//Eventos

eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
  formulario.addEventListener('submit', agregarGasto);
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

  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert');

    if(tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else { 
      divMensaje.classList.add('alert-success');
    }
    
    divMensaje.textContent = mensaje;

    //insertar en HTML
    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    //quitar mensaje
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
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

//Añade gastos

function agregarGasto(e) {
  e.preventDefault();

  //Leer datos del formulario
  const nombreGasto = document.querySelector('#gasto').value;
  const cantidadGasto = Number(document.querySelector('#cantidad').value);

  //Validar
  if (nombreGasto === '' || cantidadGasto === '') {
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    return;
  } else if (cantidadGasto <= 0 || isNaN(cantidadGasto)) {
    ui.imprimirAlerta('Cantidad no válida', 'error');
    return;
  }
}
