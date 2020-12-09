const express = require('express');
const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_TOKEN } = require('../config/keys')
const requireLogin = require("../middleware/requireLogin")
const router = express.Router();

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

//User model that has basic user properties : name, emailid, password
const User = mongoose.model('User')


const transportor = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: "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"
    }
}))


//post method to SignUp page
router.post('/signup', (req, res) => {
    const { name, email, password, resignation } = req.body;
    if (!name || !email || !password || !resignation) {
        return res.status(422).json({ error: "Please fill all the required fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with this email " })
            }
            //hash password using bcrypt
            bcrypt.hash(password, 12)
                .then((hashedPassword) => {
                    const user = new User({
                        name,
                        email,
                        password: hashedPassword,
                        resignation
                    })

                    user.save()
                        .then((user) => {
                            transportor.sendMail({
                                to: user.email,
                                from:"bkumarsp6@gmail.com",
                                subject:"Online exam portal: Sign up success", 
                                html: `<h2>Welcome to Online Exam Portal</h2>
                                        `
                            })
                            res.json({ message: 'Saved Successfully as ' + resignation })
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})

//post method to sign_in
router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(422).json({ error: "Please add email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        //generate a token to validate the User
                        const token = jwt.sign({ _id: savedUser._id }, JWT_TOKEN)
                        const { _id, name, email, resignation } = savedUser
                        res.json({ token, user: { _id, name, email, resignation } })
                    } else
                        return res.status(422).json({ error: "Invalid Email or Password" });
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err);
            return res.status(422).json({ error: "Invalid Email or Password" });
        })
})


router.post('/reset-password', (req, res)=>{
    crypto.randomBytes(32, (err, buffer)=>{
        if(err) 
            console.log(err);
        const token = buffer.toString('hex')
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error: "User does not exists..."})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 1200000 //expire after 20 minutes
            user.save().then(result=>{
                transportor.sendMail({
                    to: user.email,
                    from: "bkumarsp6@gmail.com",
                    subject: "Online exam portal: password reset",
                    html: `<p>You requested for password reset</p>
                    <h5>Click in this <a href ="http://localhost:3000/reset/${token}">link</a> to reset password </h5> 
                    <h6>The above link is valid for a duration of 20 minutes</h6>
                    <p>Ignore if it wasn't you.</p>
                    `
                }).then(u=>console.log(u))
                .catch(e=>console.log(e))
                res.json({message: "Check out your mail."})
                console.log(result);
            })
        })
    })
})

router.post('/new-password', (req, res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken, expireToken:{$gt: Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error: "Session expired. Try again!"})
        }
        bcrypt.hash(newPassword, 12).then(hashedPassword=>{
            user.password = newPassword
            user.resetToken = undefined
            user.expireToken = undefined
            user.save().then(savedUser=>{
                res.json({message: 'password updated successfully'})
            })
        }).catch(err=>console.log(err))
    })
})


module.exports = router;