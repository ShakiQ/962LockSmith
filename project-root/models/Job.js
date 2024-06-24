const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  service: { type: String, required: true },
  address: { type: String, required: true },
  timeAndDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(v) {
        return !isNaN(Date.parse(v)); // Example validation to check if the value is a valid date
      },
      message: props => `${props.value} is not a valid date and time!`
    }
  },
  description: { type: String, required: true },
  workerId: { type: String, required: false }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
