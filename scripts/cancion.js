const Cancion = require("./manejo");

const getAll = async (req, res) => {
  try {
    const canciones = await Cancion.findAll();
    res.json(canciones);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const registarCancion = async (req, res) => {  
  try {
    const cancion = await Cancion.create(req.body); //recibe los datos del body enviados por el cliente
    res.status(201).json(cancion);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: error.errors.map((e) => e.message),
      });
    } else {
      res.status(500).send(error.message);
    }
  }
};

const editarCancion = async (req, res) => {
  try {
    const { id } = req.params;

    const { cancion, artista, tono } = req.body;

    // Buscar la canción por su ID en la base de datos
    const cancionExistente = await Cancion.findByPk(id);

    // Si no se encontró la canción, error
    if (!cancionExistente) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    // Actualizar los datos de la canción con los nuevos valores
    cancionExistente.cancion = cancion;
    cancionExistente.artista = artista;
    cancionExistente.tono = tono;

    // Guardar cambios
    await cancionExistente.save();

    // Devolver la canción editada
    res.json(cancionExistente);
  } catch (error) {
    // cualquier otro error
    res.status(500).json({ message: error.message });
  }
};

const eliminarCancion = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Cancion.destroy({ where: { id: id } });
  
      if (deleted) {
        res.status(204).send('Canción eliminada');
      } else {
        res.status(404).send('Canción no encontrada');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

module.exports = {
  getAll,
  registarCancion,
  editarCancion,
  eliminarCancion
};
