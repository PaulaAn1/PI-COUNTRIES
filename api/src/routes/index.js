const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRoute = require('./countries.js');
const activitiesRoute = require('./activities.js');


const router = Router();

router.use('/countries', countriesRoute);
router.use('/activities', activitiesRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
