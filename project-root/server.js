const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
// Serve static files from the 'public' directory
app.use(express.static('public'));

const SECRET_KEY = 'your_secret_key';

const users = [
  { id: '1', username: '1', password: bcrypt.hashSync('1', 8) },
  { id: '2', username: '2', password: bcrypt.hashSync('2', 8) },
  { id: '3', username: '3', password: bcrypt.hashSync('3', 8) }
];

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
}

// Login endpoint
app.post('/login', (req, res) => {
  
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 120 }); 
  
  res.status(200).send({ token });
});

// Example of a protected route
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).send({ message: 'This is a protected route', userId: req.userId });
});

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
    let maxId = jobs.length > 0 ? Math.max(...jobs.map(item => item.id)) : 0;
    newJob.id = maxId + 1; // Assign a new ID
    jobs.push(newJob);
    await fs.writeFile('jobs.json', JSON.stringify(jobs, null, 2));
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error adding job:', error);
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
});

// Endpoint to update an existing job by ID
app.put('/jobs/:id', async (req, res) => {
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
});

// Endpoint to delete a job by ID
app.delete('/jobs/:id', async (req, res) => {
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
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
