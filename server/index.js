const express = require("express");
const cors = require("cors");
const app = express();

const MoistureModel = require("./models/MoistureModel.js");

app.use(cors());
app.use(express.json());

app.get("/update-moisture", async (req, res) => {
  const moisture = req.query.moisture;

  const data = new MoistureModel({
    moisture: moisture,
    timeStamp: new Date(),
  });
  console.log(moisture);
  try {
    await data.save();
    res.send("OK");
  } catch (error) {
    console.log(error);
    res.send("ERROR");
  }
});

app.get("/get-moisture-data", async (req, res) => {
  const oneMinuteAgo = new Date();
  oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);
  try {
    const data = await MoistureModel.find({
      timeStamp: {
        $gte: oneMinuteAgo,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send("ERROR");
  }
});

const mongoose = require("mongoose");
const { MinKey } = require("mongodb");

mongoose
  .connect(
    "mongodb+srv://ui20ec48:COvdfrD48QxglwSW@moisture-data.vzm1ino.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(app.listen(5000, () => console.log("Server running on port 5000!")))
  .catch((err) => console.log(err));
