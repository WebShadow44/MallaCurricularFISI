// Lista de cursos por semestre (puedes modificarla como desees)
const cursos = [
    ["Lenguaje, Redaccion y Oratoria","Matematica","Ingles Basico I","Filosofia","Derecho Constitucional y Derechos Humanos","Introduccion a la ingenieria de sistemas de informacion","Informatica I"],
    ["Calculo Diferencial","Ingles Basico II","Algebra Lineal","Algoritmo y Estructura de Datos","Realidad Nacional y Desarrollo Regional Amazonico","Informatica II","Metodologia de la Investigacion"],
    ["Economia","Calculo Integral","Estadistica y Probabilidad","Matemaica Discreta","Lenguaje de Programacion I","Fisica","Base de Datos I"],

    ["Fisica Electronica","Estadistica Inferencial","Ingles Tencico I","Base de Datos II","Administracion General","Ecuaciones Diferenciales","Lenguaje de Programacion II"],
    ["Electronica Digital","Marketing Digital","Sistemas Contables","Taller de Base de Datos","Lenguaje de Programacion III","Teoria General de Sistemas","Ecologia","Metodos Numericos"],
    ["Ingles Tecnico II","Procesamiento de Imagenes","Costos y Presupuestos","Inteligencia de Negocios","Diseño Asisstido por Computadora","Lenguaje de Programacion IV","Arquitectura de Computaadoras","Redes y comunicaciones"],
    ["Ingenieria de Software","Sistemas de Informacion Empresarial","Sistemas Operativos","Investigacion de Operaciones","Lenguaje de Programacion V","Gestion de Proyectos"],

    ["Investigacion, Desarrollo e Innovacion","Interaccion Hombre Maquina","Analisis y Diseño de sistemas de Informacion","Gestion de Operaciones","Taller de Software I","Ingles Tecnico III","Inteligencia Artificial","Sistemas de Informacion Geoferencial"],
    ["Taller de Software II","Robotica","Analisis y Gestion de Procesos","Gestion de Servicios en Tecnologia de Información","Seminario de Tesis","Arquitectura de Sistema de Información","Seguridad Informatica"],
    ["Auditoria Informatica","Trabajo de Investigación","Practica Preprofesional","Gerencia de Sistemas de Información"]
];

const barraSemestres = document.getElementById('barra-semestres');
const panelesCursos = document.getElementById('paneles-cursos');
const resumenGeneral = document.getElementById('resumen-general');
const totalSemestres = cursos.length;
const totalCursos = cursos.reduce((acc, cur) => acc + cur.length, 0);

function guardarEstado(id, checked) {
  localStorage.setItem(id, checked);
}

function cargarEstado(id) {
  return localStorage.getItem(id) === 'true';
}

// Crear pestañas y paneles
for (let i = 0; i < totalSemestres; i++) {
  const nombreSemestre = `${i + 1}° Semestre`;
  const cursosSem = cursos[i];

  // Botón de pestaña
  const tab = document.createElement("button");
  tab.className = "tab-semestre";
  tab.textContent = nombreSemestre;
  tab.dataset.target = `panel-sem-${i + 1}`;
  barraSemestres.appendChild(tab);

  // Panel de cursos
  const panel = document.createElement("div");
  panel.className = "panel-horizontal";
  panel.id = `panel-sem-${i + 1}`;
  panel.style.display = i === 0 ? "block" : "none"; // Muestra solo el primero al cargar

  const grid = document.createElement("div");
  grid.className = "curso-grid";

  let aprobadosSemestre = 0;

  for (let j = 0; j < cursosSem.length; j++) {
    const nombreCurso = cursosSem[j];
    const id = `sem${i + 1}_curso${j + 1}`;
    const isChecked = cargarEstado(id);

    if (isChecked) aprobadosSemestre++;

    const divCurso = document.createElement("div");
    divCurso.className = "curso";

    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" id="${id}" ${isChecked ? "checked" : ""}>
      <span>${nombreCurso}</span>
    `;

    const checkbox = label.querySelector("input");
    checkbox.addEventListener("change", (e) => {
      guardarEstado(id, e.target.checked);
      actualizarResumen();
    });

    divCurso.appendChild(label);
    grid.appendChild(divCurso);
  }

  const resumen = document.createElement("div");
  resumen.className = "resumen-semestre";
  resumen.id = `resumen-sem${i + 1}`;
  resumen.textContent = `Aprobados: ${aprobadosSemestre} / ${cursosSem.length} | Pendientes: ${cursosSem.length - aprobadosSemestre}`;

  panel.appendChild(grid);
  panel.appendChild(resumen);
  panelesCursos.appendChild(panel);
}

// Manejo de pestañas
document.querySelectorAll(".tab-semestre").forEach(tab => {
  tab.addEventListener("click", () => {
    // Ocultar todos los paneles
    document.querySelectorAll(".panel-horizontal").forEach(p => p.style.display = "none");

    // Mostrar panel seleccionado
    const target = tab.dataset.target;
    document.getElementById(target).style.display = "block";
  });
});

// Actualiza contadores
actualizarResumen();

function actualizarResumen() {
  let aprobadosTotales = 0;

  for (let i = 0; i < totalSemestres; i++) {
    let aprobadosSemestre = 0;
    const cursosSem = cursos[i];

    for (let j = 0; j < cursosSem.length; j++) {
      const id = `sem${i + 1}_curso${j + 1}`;
      if (localStorage.getItem(id) === 'true') {
        aprobadosSemestre++;
      }
    }

    aprobadosTotales += aprobadosSemestre;

    const resumenSem = document.getElementById(`resumen-sem${i + 1}`);
    if (resumenSem) {
      resumenSem.textContent = `Aprobados: ${aprobadosSemestre} / ${cursosSem.length} | Pendientes: ${cursosSem.length - aprobadosSemestre}`;
    }
  }

  resumenGeneral.textContent = `📊 Total aprobados: ${aprobadosTotales} / ${totalCursos} | Pendientes: ${totalCursos - aprobadosTotales}`;
}

const year = new Date().getFullYear();
document.getElementById("copyright").innerText =
  `© ${year} Alejandro Liñán. Todos los derechos reservados.`;

  // ---- Modo Oscuro ---- //
const toggleBtn = document.getElementById('toggle-dark');
const root = document.body;

// Cargar preferencia al iniciar
if (localStorage.getItem('modoOscuro') === 'true') {
  root.classList.add('dark-mode');
}

// Alternar modo al hacer clic
toggleBtn.addEventListener('click', () => {
  root.classList.toggle('dark-mode');
  const activo = root.classList.contains('dark-mode');
  localStorage.setItem('modoOscuro', activo);
});
