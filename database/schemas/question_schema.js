const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  questionAsked:  {
    type: String,
    required: true
  },
  myAnswer: {
    type: String,
    required: true
  }
});

module.exports = QuestionSchema;