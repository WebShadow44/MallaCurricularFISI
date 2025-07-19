// Lista de cursos por semestre
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

    let aprobadosSemestre = 0; // Esta variable solo cuenta los aprobados iniciales

    for (let j = 0; j < cursosSem.length; j++) {
        const nombreCurso = cursosSem[j];
        const id = `sem${i + 1}_curso${j + 1}`;
        const isChecked = cargarEstado(id);

        // Si el curso estaba marcado al cargar, cuenta para el resumen inicial
        if (isChecked) aprobadosSemestre++;

        const divCurso = document.createElement("div");
        divCurso.className = "curso";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = id;
        checkbox.checked = isChecked;
        // La clase hidden-checkbox se maneja mejor con CSS, no con style.display
        checkbox.classList.add("hidden-checkbox"); 

        const span = document.createElement("span");
        span.textContent = nombreCurso;

        // Al hacer clic en todo el div del curso, alternamos el checked
        divCurso.addEventListener("click", () => {
            checkbox.checked = !checkbox.checked;
            guardarEstado(id, checkbox.checked);
            divCurso.classList.toggle("completado", checkbox.checked);
            actualizarResumen(); // Llama a la función global de actualización
        });

        // Agregamos clase si ya estaba marcado (esto se debe hacer después del listener para no sobrescribir)
        if (isChecked) {
            divCurso.classList.add("completado");
        }

        divCurso.appendChild(checkbox);
        divCurso.appendChild(span);
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
        document.querySelectorAll(".panel-horizontal").forEach(p => p.style.display = "none");
        document.querySelectorAll(".tab-semestre").forEach(t => t.classList.remove("active-tab")); // Quitar active de todas las pestañas
        
        const target = tab.dataset.target;
        document.getElementById(target).style.display = "block";
        tab.classList.add("active-tab"); // Añadir active a la pestaña clickeada
    });
});
// Asegurar que la primera pestaña esté activa al cargar (visual)
if (barraSemestres.firstElementChild) {
    barraSemestres.firstElementChild.classList.add('active-tab');
}


// Actualiza contadores (Se llama aquí para reflejar el estado inicial de localStorage)
actualizarResumen();

function actualizarResumen() {
    let aprobadosTotales = 0;

    for (let i = 0; i < totalSemestres; i++) {
        let aprobadosSemestre = 0;
        const cursosSem = cursos[i];

        for (let j = 0; j < cursosSem.length; j++) {
            const id = `sem${i + 1}_curso${j + 1}`;
            if (cargarEstado(id)) { // Usamos tu función cargarEstado
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

// Copyright
const year = new Date().getFullYear();
document.getElementById("copyright").innerText =
    `© ${year} WebShadow44. Todos los derechos reservados.`;

// ---- Modo Oscuro ---- //
const toggleBtn = document.getElementById('toggle-dark');
const bodyElement = document.body;

if (localStorage.getItem('modoOscuro') === 'true') {
    bodyElement.classList.add('dark-mode');
}

toggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    const activo = bodyElement.classList.contains('dark-mode');
    localStorage.setItem('modoOscuro', activo);
});

// Reiniciar checks (CORREGIDO)
document.getElementById("reset-cursos").addEventListener("click", () => {
    // Confirmación al usuario
    if (!confirm("¿Estás seguro de que quieres reiniciar todos los cursos? Se borrará tu progreso.")) {
        return;
    }

    // Iterar sobre todos los cursos para desmarcar y limpiar localStorage
    for (let i = 0; i < totalSemestres; i++) {
        const cursosSem = cursos[i];
        for (let j = 0; j < cursosSem.length; j++) {
            const id = `sem${i + 1}_curso${j + 1}`;
            // Eliminar el estado del localStorage para este curso específico
            localStorage.removeItem(id);
        }
    }

    // También actualizamos visualmente los checkboxes y sus clases
    document.querySelectorAll('.curso input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.curso').classList.remove('completado');
    });

    // Finalmente, actualizamos los resúmenes para reflejar los ceros
    actualizarResumen();
    alert("¡Todos los cursos han sido reiniciados!"); // Mensaje de confirmación
});