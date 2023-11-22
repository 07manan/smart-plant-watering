const mongoose = require("mongoose");

const MoistureSchema = new mongoose.Schema({
  moisture: {
    type: String,
  },
  timeStamp: {
    type: Date,
  },
});

const MoistureModel = mongoose.model("moistureData", MoistureSchema);

module.exports = MoistureModel;
