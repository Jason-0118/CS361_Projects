const Vehicle = require('../models/vehicle');
const Intro = require('../models/intro');


exports.get_vehicleList = async function (req, res) {
    let vehicleList = await Vehicle.find().exec();
    let introList = await Intro.find().exec();
    res.render('vehicleList.ejs', { vehicleList, introList });
}

exports.get_vehicle = async function (req, res) {
    let introList = await Intro.find().exec();
    let name = await Intro.findById(req.params.id).exec();
    name = name.name;
    let vehicles = await Vehicle.find().where('introID').equals(req.params.id).exec();
    console.log(name);
    res.render('vehicles.ejs', { vehicles, name, introList });
}

exports.detail = async function (req, res) {
    let detail = await Vehicle.findById(req.params.id).exec();
    console.log(detail)
    res.render('vehicleDetail.ejs', { detail })
}

