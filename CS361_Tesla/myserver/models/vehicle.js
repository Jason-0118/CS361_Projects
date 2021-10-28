const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var VehicleSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    mileage: { type: String },
    report: { type: String },
    title: { type: String },
    url_img: { type: String },
    CC: { type: Array },
    Entertainment: { type: Array },
    Safty: { type: Array },
    EE: { type: Array },
    introID: { type: Schema.Types.ObjectId, ref: "Intro" },
});

VehicleSchema.virtual("detail").get(function () {
    return "/vehicle/detail/" + this._id;
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
