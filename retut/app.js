// Datos ficticios incluidos en el código.
// No se usa base de datos, PHP, localStorage ni servidor.

const estudiantesIniciales = [
  { id: 1, nombre: "ARCE PADILLA FELIX", curso: "6to B", presente: false },
  { id: 2, nombre: "FLORES ARCE ROLVY", curso: "6to B", presente: false },
  { id: 3, nombre: "BENITO ANDRADE RISSIEL", curso: "6to B", presente: false },
  { id: 4, nombre: "CHOQUE ARCE ALISON", curso: "6to B", presente: false },
  { id: 5, nombre: "CARDENAS GIL JOSE ARMANDO", curso: "6to B", presente: false },
  { id: 6, nombre: "RAMOS MAMANI JUAN MIGUEL", curso: "6to B", presente: false },
  { id: 7, nombre: "GUERRA VILLALBA JORGE ALEJANDRO", curso: "6to B", presente: false },
  { id: 8, nombre: "ROMERO FLORES JUAN JOSE", curso: "6to B", presente: false },
  { id: 9, nombre: "MAMANI HUISA JHELEN", curso: "6to B", presente: false },
  { id: 10, nombre: "FRANCISCO BRAVO CELSO", curso: "6to B", presente: false },
  { id: 11, nombre: "LLANOS RAMOS NOEMY", curso: "6to B", presente: false },
  { id: 12, nombre: "SALAZAR FERNANDEZ NELY", curso: "6to B", presente: false },
  { id: 13, nombre: "MAMANI CHUCA MARIA ELENA", curso: "6to B", presente: false },
  { id: 14, nombre: "YUCRA GIL JIMENA", curso: "6to B", presente: false },
  { id: 15, nombre: "ROMAN HINOJOSA JHAN FRANCO", curso: "6to B", presente: false },
  { id: 16, nombre: "MENDOZA MUÑOZ JHEYMILI BRISSLY", curso: "6to B", presente: false },
  { id: 17, nombre: "MENDOZA MUÑOZ RUSSEL NAYERLINE", curso: "6to B", presente: false }
];

// Se crea una copia en memoria. Los cambios se pierden al recargar.
let estudiantes = estudiantesIniciales.map(estudiante => ({ ...estudiante }));

const buscar = document.getElementById("buscar");
const filtroCurso = document.getElementById("filtroCurso");
const lista = document.getElementById("listaEstudiantes");
const sinResultados = document.getElementById("sinResultados");

function iniciales(nombre) {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(parte => parte.charAt(0))
    .join("")
    .toUpperCase();
}

function prepararCursos() {
  const cursos = [...new Set(estudiantes.map(e => e.curso))].sort();
  cursos.forEach(curso => {
    const opcion = document.createElement("option");
    opcion.value = curso;
    opcion.textContent = curso;
    filtroCurso.appendChild(opcion);
  });
  document.getElementById("totalEstudiantes").textContent = estudiantes.length;
  document.getElementById("totalCursos").textContent = cursos.length;
}

function actualizarResumen() {
  const presentes = estudiantes.filter(e => e.presente).length;
  document.getElementById("totalPresentes").textContent = presentes;
}

function cambiarAsistencia(id, presente) {
  const estudiante = estudiantes.find(e => e.id === id);
  if (!estudiante) return;
  estudiante.presente = presente;
  // Solo se modifica la memoria temporal; no se guarda en el dispositivo.
  mostrarEstudiantes();
}

function crearTarjeta(estudiante) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "estudiante";

  const datos = document.createElement("div");
  datos.className = "datos-estudiante";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = iniciales(estudiante.nombre);

  const texto = document.createElement("div");
  const nombre = document.createElement("h3");
  nombre.className = "nombre-estudiante";
  nombre.textContent = estudiante.nombre;

  const curso = document.createElement("p");
  curso.className = "curso-estudiante";
  curso.textContent = "Curso: " + estudiante.curso;

  texto.append(nombre, curso);
  datos.append(avatar, texto);

  const estado = document.createElement("span");
  estado.className = "estado " + (estudiante.presente ? "presente" : "ausente");
  estado.textContent = estudiante.presente ? "✓ Presente (demo)" : "✕ Ausente (demo)";

  const botones = document.createElement("div");
  botones.className = "botones";

  const btnPresente = document.createElement("button");
  btnPresente.className = "btn-presente";
  btnPresente.textContent = "Marcar presente";
  btnPresente.setAttribute("aria-label", "Marcar presente a " + estudiante.nombre);
  btnPresente.addEventListener("click", () => cambiarAsistencia(estudiante.id, true));

  const btnAusente = document.createElement("button");
  btnAusente.className = "btn-ausente";
  btnAusente.textContent = "Marcar ausente";
  btnAusente.setAttribute("aria-label", "Marcar ausente a " + estudiante.nombre);
  btnAusente.addEventListener("click", () => cambiarAsistencia(estudiante.id, false));

  botones.append(btnPresente, btnAusente);
  tarjeta.append(datos, estado, botones);
  return tarjeta;
}

function mostrarEstudiantes() {
  const consulta = buscar.value.trim().toLocaleLowerCase("es");
  const cursoElegido = filtroCurso.value;

  const filtrados = estudiantes.filter(estudiante => {
    const coincideTexto =
      estudiante.nombre.toLocaleLowerCase("es").includes(consulta) ||
      estudiante.curso.toLocaleLowerCase("es").includes(consulta);
    const coincideCurso = cursoElegido === "todos" || estudiante.curso === cursoElegido;
    return coincideTexto && coincideCurso;
  });

  lista.replaceChildren();
  filtrados.forEach(estudiante => lista.appendChild(crearTarjeta(estudiante)));
  sinResultados.hidden = filtrados.length !== 0;
  actualizarResumen();
}

buscar.addEventListener("input", mostrarEstudiantes);
filtroCurso.addEventListener("change", mostrarEstudiantes);

prepararCursos();
mostrarEstudiantes();
