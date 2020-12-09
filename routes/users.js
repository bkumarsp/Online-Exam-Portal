const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const requireLogin = require("../middleware/requireLogin"); //verifies the User
const { post } = require('./posts');

const Post = mongoose.model('Post')
const User = mongoose.model('User')

router.get('/user/:id', (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            Post.find({ postedBy: req.params.id })
                .populate("postedBy", "_id name")
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({ error: "User not found" })
                    }
                    res.json({ user, posts })
                })
        }).catch(err => {
            return res.status(422).json({ error: "User not found" })
        })
})



module.exports = users