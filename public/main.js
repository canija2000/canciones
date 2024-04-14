//document ready
document.addEventListener("DOMContentLoaded", function(){
  const agregar = document.getElementById("agregar");
  agregar.addEventListener("click", function(e) {
      e.preventDefault();
      const cancion = document.getElementById("cancion").value;
      console.log(cancion)
      const artista = document.getElementById("artista").value;
      const tono = document.getElementById("tono").value;
      console.log('DATOS CONSEGUIDOS')
      axios.post("/cancion", { cancion, artista, tono })
        .then(response => {
          console.log("Canción agregada:", response.data);
        })
        .catch(error => {
          console.error("Error al agregar canción:", error.response.data.message);
        });
    });

    // rellenar tabla con canciones
    const cuerpoTabla = document.getElementById("cuerpo");
    axios.get("/canciones")
    .then(response => {
      // data 
      const canciones = response.data;

      // limpiar tabla
      cuerpoTabla.innerHTML = '';

      // Iterar sobre las canciones y agregar una fila por cada una a la tabla
      canciones.forEach(cancion => {
        const fila = `
          <tr>
            <td>${cancion.id}</td>
            <td>${cancion.nombre}</td>
            <td>${cancion.artista}</td>
            <td>${cancion.tono}</td>
            <td><button onclick="editarCancion(${cancion.id})">Editar</button></td>
          </tr>
        `;
        cuerpoTabla.innerHTML += fila;
      });
    })
    .catch(error => {
      console.error("Error al obtener las canciones:", error);
    });
});

  