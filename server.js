const express = require('express');
const app = express();
const port = 3000;
require("dotenv").config();
const { registarCancion, getAll, editarCancion, eliminarCancion } = require('./scripts/cancion');


app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.use(express.static('public'));

//registrar cancion en db
app.post('/cancion', registarCancion);

//obtener todas las canciones
app.get('/canciones', getAll);

//put para actualizar cancion
app.put('/cancion/:id', editarCancion);

//delete para eliminar cancion

app.delete('/cancion/:id', eliminarCancion);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
)

