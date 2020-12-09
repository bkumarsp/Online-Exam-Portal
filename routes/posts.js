const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const requireLogin = require("../middleware/requireLogin") //verifies the User

//mongoose models
const Post = mongoose.model('Post')
const Test = mongoose.model('Test') //new code 

router.get('/allTests', requireLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name") //expands or displays all records mentioned by second argument from the postedBy field
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err);
        })
})

//new code
router.post('/tests', requireLogin, (req, res) => {

    const { question, time } = req.body;
    if (!question || !time) {
        return res.status(422).json({ error: "Please add all fields." })
    }

    const postTest = new Test({
        question,
        time,
        postedBy: req.user
    });
    postTest.save()
        .then(result => {
            res.json({ newpost: result })
        })
        .catch(err => {
            console.log(err);
        })

})
//new code ends


router.get('/postedTests', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id }) //finds all Test (posted by the user) that match the User id
        .populate('postedBy', "_id name")
        .then(myPostedTests => {
            res.json({ myPostedTests })
            console.log(myPostedTests);
        })
        .catch(err => {
            console.log(err);
        })
})

//new code
// router.get('/create', requireLogin, (req, res) => {
//     Post.find({ postedBy: req.user._id }) //finds all Test (posted by the user) that match the User id
//         .populate('postedBy', "_id name question")
//         .then(myPostedTests => {
//             res.json({ myPostedTests })
//             console.log(myPostedTests, '= post create');
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })


module.exports = router