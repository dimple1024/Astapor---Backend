const express = require("express");

const router = express.Router();

//Importing task model
const Task = require("../models/task");
const User = require("../models/user");

//Router level middleware
router.use(express.json());

router.get("/fetch", async (req, res) => {
  try {
    let userName = req.header("user-name");
    console.log(userName);
    let userExists = await User.findOne({ userName: userName });
    console.log(userExists);
    if (!userExists) {
      res.status(400).send("User Name supplied in incorrect!");
    }
    let tasksList = await Task.find({ userId: userExists._id }).sort({
      createdAt: "desc",
    });
    console.log(tasksList);
    return res.status(200).send(tasksList);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/create", async (req, res) => {
  let userId;

  try {
    let userName = req.header("user-name");
    let userExists = await User.findOne({ userName: userName });
    if (!userExists) {
      res.status(400).send("User Name supplied in incorrect!");
    }

    userId = userExists._id;
  } catch (err) {
    res.status(500).send(err.message);
  }
  try {
    let taskType = req.body.taskType;
    if (taskType) {
      let task;
      if (taskType === "GDD") {
        task = new Task({
          userId: userId,
          taskType: taskType,
          coding: req.body.coding,
          dbaRequest: req.body.dbaRequest, //mention in case of new table or column only
          unitTesting: req.body.unitTesting,
          peerReview: req.body.peerReview,
          cl: req.body.cl,
        });
      } else if (taskType === "DL") {
        task = new Task({
          userId: userId,
          taskType: taskType,
          dbaRequest: req.body.dbaRequest,
          coding: req.body.coding,
          unitTesting: req.body.unitTesting,
          peerReview: req.body.peerReview,
          cl: req.body.cl,
        });
      } else if (taskType === "PL") {
        task = new Task({
          userId: userId,
          taskType: taskType,
          coding: req.body.coding,
          unitTesting: req.body.unitTesting,
          peerReview: req.body.peerReview,
          cl: req.body.cl,
        });
      } else if (taskType === "Daemon/Job") {
        task = new Task({
          userId: userId,
          taskType: taskType,
          design: req.body.design,
          coding: req.body.coding,
          unitTesting: req.body.unitTesting,
          peerReview: req.body.peerReview,
          cl: req.body.cl,
          infraRequest: req.body.infraRequest,
          releaseDocsUpdate: req.body.releaseDocsUpdate,
        });
      } else if (taskType === "CR") {
        task = new Task({
          userId: userId,
          taskType: taskType,
          design: req.body.design,
          coding: req.body.coding,
          unitTesting: req.body.unitTesting,
          peerReview: req.body.peerReview,
          cl: req.body.cl,
          releaseDocsUpdate: req.body.releaseDocsUpdate,
        });
      }
      let taskDetails = await task.save();
      console.log(taskDetails);
      return res.status(200).send("Task created!");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//TODO: it is not a good practice to expose DB pk to client, have a uuid and use that
router.post("/modify/:id", async (req, res) => {
  try {
    let userName = req.header("user-name");
    let userExists = await User.findOne({ userName: userName });
    if (!userExists) {
      res.status(400).send("User Name supplied in incorrect!");
    }
    let keys = Object.keys(req.body);
    let objSchema = { _id: req.params._id };
    for (let key of keys) {
      objSchema[key] = req.body[key];
    }
    let updatedTask = new Task(objSchema);
    let updated = await updatedTask.save();

    return res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
