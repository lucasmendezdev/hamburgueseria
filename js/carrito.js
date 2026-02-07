// ===============================
// ENTREGA
// ===============================

const radios = document.querySelectorAll('input[name="entrega"]');
const direccionInput = document.getElementById("direccionCliente");

radios.forEach(radio=>{

  radio.addEventListener("change", ()=>{

    if(radio.value === "envio" && radio.checked){

      direccionInput.disabled = false;
      direccionInput.focus();

    }else if(radio.value === "retiro" && radio.checked){

      direccionInput.disabled = true;
      direccionInput.value = "";

    }

  });

});


// ===============================
// ELEMENTOS
// ===============================

const lista = document.getElementById("listaCarrito");
const totalEl = document.getElementById("total");
const btnWhatsapp = document.getElementById("btnWhatsapp");


// ===============================
// CARRITO
// ===============================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// ===============================
// TOAST (MENSAJES)
// ===============================

function mostrarToast(mensaje){

  let toast = document.querySelector(".toast");

  if(!toast){

    toast = document.createElement("div");
    toast.className = "toast";

    document.body.appendChild(toast);

  }

  toast.textContent = mensaje;

  toast.classList.add("show");


  setTimeout(()=>{
    toast.classList.remove("show");
  },2000);

}


// ===============================
// CREAR ITEM
// ===============================

function crearItem(item,index){

  const div = document.createElement("div");
  div.className = "item animar";


  div.innerHTML = `

    <img src="${item.imagen}" alt="${item.nombre}">

    <div class="info">

      <h3>${item.nombre}</h3>

      <p>Cantidad: ${item.cantidad}</p>

      <strong>$${item.precio * item.cantidad}</strong>

    </div>

    <div class="acciones">

      <button onclick="restar(${index})">−</button>

      <button onclick="sumar(${index})">+</button>

      <button onclick="eliminarItem(${index})">✕</button>

    </div>

  `;


  // Quitar animación
  setTimeout(()=>{
    div.classList.remove("animar");
  },300);


  return div;

}


// ===============================
// ACCIONES
// ===============================

function sumar(i){

  carrito[i].cantidad++;

  mostrarToast("➕ Producto agregado");

  guardar();

}


function restar(i){

  carrito[i].cantidad--;


  if(carrito[i].cantidad <= 0){

    eliminarItem(i);
    return;

  }


  mostrarToast("➖ Cantidad reducida");

  guardar();

}


function eliminarItem(i){

  mostrarToast("🗑️ Producto eliminado");

  carrito.splice(i,1);

  guardar();

}


// ===============================
// RENDER
// ===============================

function render(){

  lista.innerHTML = "";


  // CARRITO VACÍO
  if(carrito.length === 0){

    lista.innerHTML = `
      <div class="carrito-vacio">
        Tu carrito está vacío 🛒
        <br>
        Agregá algo rico 🍔
      </div>
    `;

    totalEl.textContent = "$0";

    btnWhatsapp.disabled = true;

    return;

  }


  // ITEMS
  carrito.forEach((item,index)=>{

    lista.appendChild(
      crearItem(item,index)
    );

  });


  // TOTAL
  const total = carrito.reduce(
    (acc,i)=> acc + (i.precio * i.cantidad),
    0
  );

  totalEl.textContent = `$${total}`;

  btnWhatsapp.disabled = false;

}


// ===============================
// GUARDAR
// ===============================

function guardar(){

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  render();

  actualizarContador();

}


// ===============================
// CONTADOR HEADER
// ===============================

function actualizarContador(){

  const total = carrito.reduce(
    (acc,i)=> acc + i.cantidad,
    0
  );

  const span = document.getElementById("contadorCarrito");

  if(span){
    span.textContent = total;
  }

}


// ===============================
// WHATSAPP FINAL
// ===============================

btnWhatsapp.addEventListener("click", ()=>{

  if(carrito.length === 0){

    mostrarToast("🛒 El carrito está vacío");
    return;

  }


  // DATOS CLIENTE

  const nombre = document.getElementById("nombreCliente").value.trim();
  const tel = document.getElementById("telefonoCliente").value.trim();
  const direccion = document.getElementById("direccionCliente").value.trim();
  const obs = document.getElementById("obsCliente").value.trim();

  const entrega = document.querySelector(
    'input[name="entrega"]:checked'
  ).value;


  // VALIDACION

  if(!nombre || !tel){

    mostrarToast("⚠️ Completá nombre y teléfono");
    return;

  }

  if(entrega === "envio" && !direccion){

    mostrarToast("📍 Ingresá tu dirección");
    return;

  }


  // MENSAJE

  let mensaje = "🍔 *NUEVO PEDIDO* %0A%0A";


  // CLIENTE

  mensaje += `👤 Cliente: ${nombre}%0A`;
  mensaje += `📞 Tel: ${tel}%0A%0A`;


  // PEDIDO

  mensaje += "📋 *Pedido:* %0A";


  carrito.forEach(item=>{

    mensaje += `• ${item.nombre} x${item.cantidad}%0A`;

  });


  // TOTAL

  const total = carrito.reduce(
    (acc,i)=> acc + (i.precio * i.cantidad),
    0
  );


  mensaje += `%0A💰 *Total: $${total}*%0A`;


  // ENTREGA

  if(entrega === "envio"){

    mensaje += `%0A📍 *Envío:* ${direccion}%0A`;

  }else{

    mensaje += `%0A📍 *Retiro en local*%0A`;

  }


  // OBS

  if(obs){

    mensaje += `%0A💬 Obs: ${obs}%0A`;

  }


  // TELEFONO

  const telefono = "5491123456789"; // CAMBIAR


  const url = `https://wa.me/${telefono}?text=${mensaje}`;


  window.open(url,"_blank");

});



// ===============================
// INIT
// ===============================

render();
actualizarContador();
