const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionSchema = require("./question_schema");

const JobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ['not applied', 'in progress', 'prepared', 'submitted'],
    default: 'not applied'
  },
  outcome: {
    type: String,
    enum: ['not applicable', 'ghosted', 'rejection', 'offer'],
    default: 'not applicable'
  },
  questions: [QuestionSchema],
  userId: {
    type: String,
    required: true
  }
});

module.exports = JobSchema;