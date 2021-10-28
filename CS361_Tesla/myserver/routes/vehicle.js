var express = require('express');
var router = express.Router();
var vehicleControllers = require('../controller/vehicleControllers');


router.get('/', vehicleControllers.get_vehicleList);
router.get('/id/:id', vehicleControllers.get_vehicle);
router.get('/detail/:id', vehicleControllers.detail);




module.exports = router;
