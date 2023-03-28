const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ExerciseSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: [true, 'exercise must contain an user ID'],
        index: false,
        unique: false,
        sparse: false
    },
    description: {
        type: String,
        required: [true, 'exercise must contain a description']
    },
    duration: {
        type: Number,
        required: [true, 'exercise must contain a duration in minutes']
    },
    
    date: {
        type: Date,
    },
    
})

ExerciseSchema.methods.toJSON = function() {
    const { __v, _id, id, date, ...exercise } = this.toObject();
    exercise._id = id;
    exercise.date = date.toDateString();
    return exercise;
}

module.exports = model('Exercise', ExerciseSchema);