document.addEventListener("DOMContentLoaded", function () {
  const agregar = document.getElementById("agregar");
  const cuerpoTabla = document.getElementById("cuerpo");

  // Función para agregar una canción
  function agregarCancion() {
    const titulo = document.getElementById("cancion").value;
    const artista = document.getElementById("artista").value;
    const tono = document.getElementById("tono").value;

    axios
      .post("/cancion", { titulo, artista, tono })
      .then((response) => {
        console.log("Canción agregada:", response.data);
        limpiarFormulario();
        actualizarTabla();
      })
      .catch((error) => {
        console.error("Error al agregar canción:", error.response.data.message);
      });
  }

  // Función para limpiar el formulario después de agregar una canción
  function limpiarFormulario() {
    document.getElementById("cancion").value = "";
    document.getElementById("artista").value = "";
    document.getElementById("tono").value = "";
  }

  // Función para actualizar la tabla de canciones
  function actualizarTabla() {
    axios
      .get("/canciones")
      .then((response) => {
        // Limpiar tabla
        cuerpoTabla.innerHTML = "";

        // Iterar sobre las canciones y agregar una fila por cada una a la tabla
        const canciones = response.data;
        canciones.forEach((cancion) => {
          const fila = `
            <tr>
              <td>${cancion.id}</td>
              <td>${cancion.titulo}</td>
              <td>${cancion.artista}</td>
              <td>${cancion.tono}</td>
              <td><button value="${cancion.id}" class="editar btn btn-warning">Editar</button></td>
              <td><button value="${cancion.id}" class="eliminar btn btn-danger">Eliminar</button></td>
            </tr>
          `;
          cuerpoTabla.innerHTML += fila;
        });

        // Volver a agregar event listeners a los botones de "Eliminar"
        agregarEventListenersEliminar();

        // Agregar event listeners a los botones de "Editar"
        agregarEventListenersEditar();
      })
      .catch((error) => {
        console.error("Error al obtener las canciones:", error);
      });
  }

  // Función para agregar event listeners a los botones de "Eliminar"
  function agregarEventListenersEliminar() {
    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", function (e) {
        e.preventDefault();
        const id = this.value; // Obtener el valor del atributo 'value' del botón actual
        eliminarCancion(id);
      });
    });
  }

  // Función para agregar event listeners a los botones de "Editar"
  function agregarEventListenersEditar() {
    const botonesEditar = document.querySelectorAll(".editar");
    botonesEditar.forEach((boton) => {
      boton.addEventListener("click", function (e) {
        e.preventDefault();
        const id = this.value; // Obtener el valor del atributo 'value' del botón actual
        editarCancion(id);
      });
    });
  }

  // Función para eliminar una canción
  function eliminarCancion(id) {
    axios
      .delete(`/cancion/${id}`)
      .then((response) => {
        console.log("Canción eliminada:", response.data);
        actualizarTabla();
      })
      .catch((error) => {
        console.error(
          "Error al eliminar canción:",
          error.response.data.message
        );
      });
  }

  // Función para editar una canción
  function editarCancion(id) {
    // artista no vacio
    let nuevoTitulo = "";
    do {
      nuevoTitulo = prompt("Introduce el nuevo título de la canción:");
    } while (!nuevoTitulo.trim());

    // canción no vacia
    let nuevoArtista = "";
    do {
      nuevoArtista = prompt("Introduce el nuevo artista de la canción:");
    } while (!nuevoArtista.trim());

    // tono no vacio
    let nuevoTono = "";
    do {
      nuevoTono = prompt("Introduce el nuevo tono de la canción:");
    } while (!nuevoTono.trim());

    //capitalize nuevo tono
    nuevoTono = nuevoTono.toUpperCase();
    axios
      .put(`/cancion/${id}`, {
        titulo: nuevoTitulo,
        artista: nuevoArtista,
        tono: nuevoTono,
      })
      .then((response) => {
        console.log("Canción editada:", response.data);
        actualizarTabla();
      })
      .catch((error) => {
        console.error("Error al editar canción:", error.response.data.message);
      });
  }

  // Agregar event listener al botón de "Agregar"
  agregar.addEventListener("click", function (e) {
    e.preventDefault();
    agregarCancion();
  });

  // Cargar la tabla de canciones cuando se carga la página
  actualizarTabla();
});
