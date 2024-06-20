const express = require('express');
const fs = require('fs').promises;

const app = express();

// Middleware for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Middleware for parsing JSON requests
app.use(express.json());

// Endpoint to retrieve all jobs
app.get('/jobs', async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    const jobs = JSON.parse(jobsData);
    res.json(jobs);
  } catch (error) {
    console.error('Error reading jobs file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to retrieve all workers
app.get('/workers', async (req, res) => {
  try {
    const workersData = await fs.readFile('workers.json');
    const workers = JSON.parse(workersData);
    res.json(workers);
  } catch (error) {
    console.error('Error reading worker file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Endpoint to add a new job
app.post('/jobs', async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    let jobs = JSON.parse(jobsData);
    const newJob = req.body;
    let maxId = Math.max(...jobs.map(item => item.id));
    newJob.id = maxId +1; // Assign a new ID
    events.push(newJob);
    await fs.writeFile('jobs.json', JSON.stringify(jobs, null, 2));
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error adding Job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to retrieve a single job by ID
app.get('/jobs/:id', async (req, res) => {
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
});


// Endpoint to retrieve a single worker by ID
app.get('/workers/:id', async (req, res) => {
  try {
    const workersData = await fs.readFile('workers.json');
    const workers = JSON.parse(workersData);
    const workerId = parseInt(req.params.id);
    const worker = workers.find(w => w.id === workerId);
    if (!worker) {
      res.status(404).json({ message: 'Worker not found' });
    } else {
      res.json(worker);
    }
  } catch (error) {
    console.error('Error reading workers file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to retrieve a single event by ID
app.get('/jobs/workers/:id', async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    const jobs = JSON.parse(jobsData);
    const workerId = parseInt(req.params.id);
    console.log(workerId);
    const job = jobs.find(j => j['worker-id'] === workerId);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
    } else {
      res.json(job);
    }
  } catch (error) {
    console.error('Error reading jobs file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to update an existing job by ID
// We can use this endpoint to assign jobs to workers
app.put('/job/:id', async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    let jobs = JSON.parse(jobsData);
    const eventId = parseInt(req.params.id);
    const index = jobs.findIndex(job => job.id === jobId);
    if (index === -1) {
      res.status(404).json({ message: 'Job not found' });
    } else {
      jobs[index] = { ...jobs[index], ...req.body };
      await fs.writeFile('jobs.json', JSON.stringify(jobs, null, 2));
      res.json(jobs[index]);
    }
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete an job by ID
app.delete('/jobs/:id', async (req, res) => {
  try {
    const jobsData = await fs.readFile('jobs.json');
    let jobs = JSON.parse(jobsData);
    const eventId = parseInt(req.params.id);
    jobs = jobs.filter(job => job.id !== jobId);
    await fs.writeFile('jobs.json', JSON.stringify(jobs, null, 2));
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

