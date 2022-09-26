const { Router } = require('express');
const ProductRoute = require("./ProducRoute");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/product", ProductRoute);

module.exports = router;
