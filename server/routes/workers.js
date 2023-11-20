const express = require("express");
const router = express.Router();
const workersController = require("../controllers/workersController");

router.get("/workers", workersController.getWorkers);
router.post("/workers/addworker", workersController.addWorker)
module.exports = router;
