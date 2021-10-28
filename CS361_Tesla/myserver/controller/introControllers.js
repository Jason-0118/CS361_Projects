const Intro = require('../models/intro');

exports.get_introList = async function (req, res) {
    let introList = await Intro.find().exec();
    res.render('introList.ejs', {introList});
}