// ===============================
// PRODUCTOS
// ===============================

const productos = [
  {
    id: 1,
    nombre: "Doble Cheddar",
    precio: 2500,
    imagen: "assets/img/burguer0.png",
    descripcion: "Doble carne, cheddar derretido"
  },
  {
    id: 2,
    nombre: "Clásica",
    precio: 2200,
    imagen: "assets/img/burguer1.png",
    descripcion: "Carne, lechuga, tomate, queso"
  },
  {
    id: 3,
    nombre: "Magnific",
    precio: 2800,
    imagen: "assets/img/burguer4.png",
    descripcion: "Explosión de sabor"
  },
  {
    id: 4,
    nombre: "Papas Fritas",
    precio: 1500,
    imagen: "assets/img/papas1.png",
    descripcion: "Crocantes"
  },
  {
    id: 5,
    nombre: "Coca Cola",
    precio: 1200,
    imagen: "assets/img/coca.png",
    descripcion: "500ml"
  }
];

// ===============================
// ELEMENTOS
// ===============================

const grid = document.getElementById("menuGrid");


// ===============================
// CARRITO
// ===============================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// ===============================
// TOAST
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
  },1800);

}


// ===============================
// RENDER MENU
// ===============================

function renderMenu(){

  grid.innerHTML = "";


  productos.forEach(prod => {

    const card = document.createElement("div");

    card.className = "menu-card animar";


    card.innerHTML = `

      <img src="${prod.imagen}" alt="${prod.nombre}">

      <div class="menu-info">

        <h3>${prod.nombre}</h3>

        <p>${prod.descripcion}</p>

        <div class="menu-precio">
          $${prod.precio}
        </div>

        <button 
          class="menu-btn"
          onclick="agregarAlCarrito(${prod.id})"
        >
          Agregar
        </button>

      </div>

    `;


    grid.appendChild(card);


    // Quitar animación
    setTimeout(()=>{
      card.classList.remove("animar");
    },300);

  });

}


// ===============================
// AGREGAR CARRITO
// ===============================

function agregarAlCarrito(id){

  const producto = productos.find(p => p.id === id);

  const existe = carrito.find(i => i.id === id);


  if(existe){

    existe.cantidad++;

    mostrarToast("➕ Sumaste uno más");

  }else{

    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });

    mostrarToast("🛒 Agregado al pedido");

  }


  guardar();

}


// ===============================
// GUARDAR
// ===============================

function guardar(){

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  actualizarContador();

}


// ===============================
// CONTADOR
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
// INIT
// ===============================

renderMenu();
actualizarContador();
