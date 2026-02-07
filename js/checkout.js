// ===============================
// ELEMENTOS
// ===============================

const btnConfirmar = document.getElementById("btnConfirmar");

const nombre = document.getElementById("nombreCliente");
const telefono = document.getElementById("telefonoCliente");
const direccion = document.getElementById("direccionCliente");
const obs = document.getElementById("obsCliente");

const radios = document.querySelectorAll('input[name="entrega"]');


// ===============================
// ENTREGA
// ===============================

let tipoEntrega = "retiro";

radios.forEach(radio => {

  radio.addEventListener("change", ()=>{

    tipoEntrega = radio.value;

    if(tipoEntrega === "envio"){

      direccion.disabled = false;

    }else{

      direccion.disabled = true;
      direccion.value = "";

    }

  });

});


// ===============================
// CONFIRMAR PEDIDO
// ===============================

btnConfirmar.addEventListener("click", ()=>{

  const carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


  // Validaciones

  if(nombre.value.trim() === ""){

    mostrarToast("Ingresá tu nombre");
    return;

  }

  if(telefono.value.trim() === ""){

    mostrarToast("Ingresá tu teléfono");
    return;

  }

  if(carrito.length === 0){

    mostrarToast("El carrito está vacío");
    return;

  }

  if(tipoEntrega === "envio" && direccion.value.trim() === ""){

    mostrarToast("Ingresá la dirección");
    return;

  }


  // Armar mensaje

  let mensaje = `🍔 *NUEVO PEDIDO* %0A%0A`;

  mensaje += `👤 Cliente: ${nombre.value}%0A`;
  mensaje += `📞 Tel: ${telefono.value}%0A`;

  if(tipoEntrega === "envio"){

    mensaje += `🏠 Envío: ${direccion.value}%0A`;

  }else{

    mensaje += `🏪 Retiro en local%0A`;

  }

  mensaje += `%0A📋 *Pedido:* %0A`;


  let total = 0;


  carrito.forEach(item => {

    let subtotal = item.precio * item.cantidad;

    total += subtotal;

    mensaje += `• ${item.nombre} x${item.cantidad} - $${subtotal}%0A`;

  });


  mensaje += `%0A💰 *Total: $${total}*`;


  if(obs.value.trim() !== ""){

    mensaje += `%0A%0A📝 Obs: ${obs.value}`;

  }


  // Enviar WhatsApp

  const telefonoNegocio = "5492625527155"; // <-- CAMBIAR

  const url = `https://wa.me/${telefonoNegocio}?text=${mensaje}`;

  window.open(url, "_blank");

  resetearSistema();


});


// ===============================
// TOAST
// ===============================

function mostrarToast(texto){

  let toast = document.querySelector(".toast");

  if(!toast){

    toast = document.createElement("div");

    toast.className = "toast";

    document.body.appendChild(toast);

  }

  toast.textContent = texto;

  toast.classList.add("show");


  setTimeout(()=>{

    toast.classList.remove("show");

  },2500);

}


// ===============================
// RESETEAR SISTEMA
// ===============================

function resetearSistema(){

  // Vaciar carrito
  localStorage.removeItem("carrito");

  // Limpiar inputs
  nombre.value = "";
  telefono.value = "";
  direccion.value = "";
  obs.value = "";

  // Reset entrega
  document.querySelector(
    'input[value="retiro"]'
  ).checked = true;

  direccion.disabled = true;


  // Reset contador
  const contador = document.getElementById("contadorCarrito");

  if(contador){
    contador.textContent = "0";
  }


  // Redirigir al inicio
  setTimeout(()=>{

    window.location.href = "index.html";

  }, 800);

}
