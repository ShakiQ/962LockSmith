const Job = require('../models/Job');
const Worker = require('../models/Worker');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) {
      res.status(200).send(job);
    } else {
      res.status(404).send({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.addJob = async (req, res) => {
  const { clientName, phoneNumber, service, address, timeAndDate, description } = req.body;
  try {
    const job = new Job({ clientName, phoneNumber, service, address, timeAndDate, description });
    console.log(job);
    
    await job.save();
    res.status(201).send(job);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    console.log(job);
    if (job) {
      job.clientName = req.body.clientName || job.clientName;
      job.phoneNumber = req.body.phoneNumber || job.phoneNumber;
      job.service = req.body.service || job.service;
      job.address = req.body.address || job.address;
      job.timeAndDate = req.body.timeAndDate || job.timeAndDate;
      job.description = req.body.description || job.description;
      //const worker = await Worker.findById(req.body.workerId);
      job.workerId = req.body.workerId || job.workerId;
      //job._id = job._id;
      console.log(job);
      console.log(req.body.workerId);
      await job.save();
      res.status(200).send(job);
    } else {
      res.status(404).send({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (job) {
      res.status(200).send({ message: 'Job deleted' });
    } else {
      res.status(404).send({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.getJobsByWorkerId = async (req, res) => {
  try {
    const jobs = await Job.find({ workerId: req.params.id });
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
