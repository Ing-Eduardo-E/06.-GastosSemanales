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
    this.calcularRestante(this.restante);
  }

  calcularRestante(restante) {
    const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
    this.restante = this.presupuesto - gastado;
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

  agregarGastoListado(gastos) {

    //Limpiar HTML
    this.limpiarHTML();

    //iterando con los arreglos de gastos
    gastos.forEach(gasto => {
      const {cantidad, nombre, id} = gasto;

      //Crear un li
      const nuevoGasto = document.createElement('li');
      nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
      nuevoGasto.dataset.id = id;

      //Agregar el HTML del gasto
      nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>`;

      //Botón para borrar el gasto
      const btnBorrar = document.createElement('button');
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
      btnBorrar.innerHTML = 'Borrar &times;';
      btnBorrar.onclick = () => {
        borrarGasto(id);
      }
      nuevoGasto.appendChild(btnBorrar);

      //Agregar al HTML
      gastoListado.appendChild(nuevoGasto);
    });
  }
  //Limpiar html
  limpiarHTML() {
    while(gastoListado.firstChild) {
      gastoListado.removeChild(gastoListado.firstChild);
    }
  }

  actualizarRestante(restante) {
    document.querySelector('#restante').textContent = restante;
  }

  comprobarPresupuesto(presupuestObj) {
    const { presupuesto, restante } = presupuestObj;
    
    //Comprobar 25%
    if ((presupuesto / 4) > restante) {
      const restante = document.querySelector('.restante');
      restante.classList.remove('alert-success', 'alert-warning');
      restante.classList.add('alert-danger');
    } else if ((presupuesto / 2) > restante) {
      const restante = document.querySelector('.restante');
      restante.classList.remove('alert-success');
      restante.classList.add('alert-warning');
    }

    //Comprobar el presupuesto
    if (restante <= 0) {
      ui.imprimirAlerta('Has alcanzado el límite de tu presupuesto', 'error');
      formulario.querySelector('button[type="submit"]').disabled = true;
    } else {
      ui.imprimirAlerta('Presupuesto restante', 'exito');
    }
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

  //Generar un objeto de los gastos

  const gasto = {
    nombre: nombreGasto,
    cantidad: cantidadGasto,
    id: Date.now()
  };

  //Añadir un nuevo gasto
  presupuesto.nuevoGasto(gasto);

  //Mensaje de todo bien
  ui.imprimirAlerta('Gasto agregado correctamente');

  //Imprimir los gastos
  const {gastos, restante} = presupuesto;
  ui.agregarGastoListado(gastos);
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);

  //Reiniciar el formulario
  formulario.reset();

  
}
