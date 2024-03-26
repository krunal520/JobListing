const express = require("express");
const router = express.Router();
const jobController = require("../controller/job");
const verifyToken = require("../middlewares/verifyToken");

// Protected routes
router.post("/create", verifyToken, jobController.createJobPost); // Corrected
router.put("/update/:jobId", verifyToken, jobController.updateJobDetailsById); // Corrected

// Public routes
router.get("/job-details/:jobId", jobController.getJobDetailsById);
router.get("/all", jobController.getAllJobs);

module.exports = router;
