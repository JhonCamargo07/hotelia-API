import { Router } from 'express';
import { join } from 'path';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const router = Router();

router.get('/', (req, res) => {
    res.send('Hola mundo desde aquí, desde mi Latinoamerica unida')
	// res.render('index', {
	// 	title: 'Portfolio Jhon Camargo Dev',
	// });
});

router.use((req, res) => {
	// res.render('error404', {
	// 	title: 'Page no found',
	// });
});

export default router;