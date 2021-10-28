const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var IntroSchema = new Schema({
    name: { type: String, required: true },
    url_img: { type: String, required: true },
    pros: { type: Array, required: true },
    cons: { type: Array, required: true },
    new: { type: Array, require: true },
    rate: { type: Object, required: true },
});

IntroSchema.virtual("url").get(function () {
    return "/vehicle/id/" + this._id;
});


//Export model
module.exports = mongoose.model("Intro", IntroSchema);
