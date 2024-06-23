const fs = require('fs').promises;

// Retrieve all workers
exports.getAllWorkers = async (req, res) => {
  try {
    const workersData = await fs.readFile('workers.json');
    const workers = JSON.parse(workersData);
    res.json(workers);
  } catch (error) {
    console.error('Error reading worker file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve a single worker by ID
exports.getWorkerById = async (req, res) => {
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
};
