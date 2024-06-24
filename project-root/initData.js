const mongoose = require('mongoose');
const User = require('./models/User');
const Worker = require('./models/Worker');
const Job = require('./models/Job');

const dbURI = 'mongodb://localhost:27017/962LockSmith';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Worker.deleteMany({});
    await Job.deleteMany({});

    // Initialize users
    const users = [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
      { username: 'user3', password: 'password3' }
    ];
    await User.insertMany(users);
    console.log('Users initialized');

    // Initialize workers
    const workers = require('./workers.json').map(w => ({
      firstName: w['first-name'],
      lastName: w['last-name'],
      phoneNumber: w['phone-number'],
      username: w.username
    }));
    const workerDocs = await Worker.insertMany(workers);
    console.log('Workers initialized');

    // Initialize jobs
    const jobs = [
      { title: 'Job One', description: 'Description for Job One', workerId: workerDocs[0]._id },
      { title: 'Job Two', description: 'Description for Job Two', workerId: workerDocs[1]._id }
    ];
    await Job.insertMany(jobs);
    console.log('Jobs initialized');

    mongoose.disconnect();
  })
  .catch(err => console.error('Could not connect to MongoDB', err));
