const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const testSchema = new mongoose.Schema({
    question: {
        type: Object
    },
    time: {
        type: Number
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Test", testSchema);