// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Habilitar CORS para el frontend
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener contactos (GET)
app.get('/agenda', async (req, res) => {
    try {
        const response = await fetch('http://www.raydelto.org/agenda.php');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los contactos' });
    }
});

// Ruta para agregar contactos (POST)
app.post('/agenda', async (req, res) => {
    try {
        const response = await fetch('http://www.raydelto.org/agenda.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el contacto' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});