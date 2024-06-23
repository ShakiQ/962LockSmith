const fs = require('fs').promises;

// Retrieve all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    const jobs = JSON.parse(jobsData);
    res.json(jobs);
  } catch (error) {
    console.error('Error reading jobs file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    const jobs = JSON.parse(jobsData);
    const jobId = parseInt(req.params.id);
    const job = jobs.find(j => j.id === jobId);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
    } else {
      res.json(job);
    }
  } catch (error) {
    console.error('Error reading jobs file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new job
exports.addJob = async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    let jobs = JSON.parse(jobsData);
    const newJob = req.body;
    let maxId = jobs.length > 0 ? Math.max(...jobs.map(item => item.id)) : 0;
    newJob.id = maxId + 1; // Assign a new ID
    jobs.push(newJob);
    await fs.writeFile('jobs.json', JSON.stringify(jobs, null, 2));
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing job by ID
exports.updateJob = async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    let jobs = JSON.parse(jobsData);
    const jobId = parseInt(req.params.id);
    const index = jobs.findIndex(job => job.id === jobId);
    if (index === -1) {
      res.status(404).json({ message: 'Job not found' });
    } else {
      jobs[index] = { ...jobs[index], ...req.body };
      await fs.writeFile('jobs.json', JSON.stringify(jobs, null, 2));
      res.json({ message: 'Service requested successfully', updatedJob: jobs[index] });
    }
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    let jobs = JSON.parse(jobsData);
    const jobId = parseInt(req.params.id);
    jobs = jobs.filter(job => job.id !== jobId);
    await fs.writeFile('jobs.json', JSON.stringify(jobs, null, 2));
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve all jobs for a specific worker by ID
exports.getJobsByWorkerId = async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    var jobs = JSON.parse(jobsData);
    const workerId = parseInt(req.params.id);
    jobs = jobs.filter(j => j['worker-id'] === workerId);
    if (!jobs) {
      res.status(404).json({ message: 'Job not found' });
    } else {
      res.json(jobs);
    }
  } catch (error) {
    console.error('Error reading jobs file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
