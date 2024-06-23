const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jobsController = require('./controllers/jobsController');
const workersController = require('./controllers/workersController');

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

const SECRET_KEY = 'the_secret_key';

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

// Job-related endpoints
app.get('/jobs', jobsController.getAllJobs);
app.get('/jobs/:id', jobsController.getJobById);
app.post('/jobs', jobsController.addJob);
app.put('/jobs/:id', jobsController.updateJob);
app.delete('/jobs/:id', jobsController.deleteJob);
app.get('/jobs/workers/:id', jobsController.getJobsByWorkerId);

// Worker-related endpoints
app.get('/workers', workersController.getAllWorkers);
app.get('/workers/:id', workersController.getWorkerById);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
