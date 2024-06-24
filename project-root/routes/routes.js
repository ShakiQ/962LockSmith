const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobsController");
const workersController = require("../controllers/workersController");


//Jobs
//Get All jobs
router.get("/jobs", jobsController.getAllJobs);
//Get job by ID
router.get("/jobs/:id", jobsController.getJobById);
//Create new job
router.post("/jobs", jobsController.addJob);
//Update job
router.put("/jobs/:id", jobsController.updateJob);
//delete job
router.delete("/jobs/:id", jobsController.deleteJob);
//Get jobs by workerID
router.get("/jobs/workers/:id", jobsController.getJobsByWorkerId);

//Workers
//Get all workers
router.get("/workers", workersController.getAllWorkers);
//Get worker by ID
router.get("/workers/:id", workersController.getWorkerById);
//Add new worker
router.post("/workers", workersController.addWorker);
// Log worker in
router.post("/login", workersController.login);
// Verify token
router.get("/verify", workersController.verify);

module.exports = router;
