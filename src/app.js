import express from 'express';
import conexionDB from './db'
import dotenv from 'dotenv'

const app = express();

dotenv.config();

conexionDB();

// Setings
app.set('appName', 'Hotelia API - Jhon Camargo');
app.set('port', process.env.PORT || 64022);
app.set('host', process.env.HOST || "127.0.0.1");
