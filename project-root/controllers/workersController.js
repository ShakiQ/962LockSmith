const Worker = require('../models/Worker');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).send(workers);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.getWorkerById = async (req, res) => {
  try {
    console.log(req.params.id);
    const worker = await Worker.findById(req.params.id);
    if (worker) {
      res.status(200).send(worker);
    } else {
      res.status(404).send({ message: 'Worker not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.addWorker = async (req, res) => {
  const { firstName, lastName, phoneNumber, username, password } = req.body;
  try {
    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const worker = new Worker({ firstName, lastName, phoneNumber, username, password: hashedPassword });
    
    await worker.save();
    res.status(201).send(worker);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const worker = await Worker.findOne({ username });
    if (!worker) {
      return res.status(401).send({ message: 'Worker is not found' });
    }

    const validPassword = await bcrypt.compare(password, worker.password);
    if (!validPassword) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: worker._id }, SECRET_KEY, { expiresIn: 120 });
    res.status(200).send({ token: token, workerId: worker._id });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};


// Middleware to verify JWT

exports.verify = async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    }

    req.id = decoded.id;
    res.status(200).send({ message: 'This is a protected route', userId: req.userId });
  });
};