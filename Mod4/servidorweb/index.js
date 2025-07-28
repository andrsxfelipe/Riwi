import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // tu contraseÃ±a si tienes
  database: 'riwidb' // El nombre de tu DB
});

// Obtener usuarios
app.get('/users', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Agregar usuario
app.post('/users', (req, res) => {
  const { nombre, email } = req.body;
  db.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuario agregado' });
  });
});

// Agrega los metodos put, y delete para el endpoint /users

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));