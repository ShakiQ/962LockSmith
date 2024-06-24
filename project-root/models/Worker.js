const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const workerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  emailAddress: { type: String, required: false }

});

// workerSchema.pre('save', async function(next) {
//   if (this.isModified('password') || this.isNew) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   next();
// });

// workerSchema.methods.comparePassword = function(password) {
//   console.log("are we here?");
//   return bcrypt.compare(password, this.password);
// };

const Worker = mongoose.model('Worker', workerSchema);
module.exports = Worker;
