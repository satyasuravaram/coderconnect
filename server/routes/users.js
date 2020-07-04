const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');

//Register Page
router.post("/register", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            password2
        } = req.body;
    
        
    
        //Simple Validation Checks
        if (!firstName || !lastName || !email || !password || !password2) {
            return res.status(400).json({msg: "Please fill in all fields."});
        }
    
        if (password.length < 6) {
            return res.status(400).json({msg: "Password must be at least 6 characters."});
        }

        if (password !== password2) {
            return res.status(400).json({msg: "Passwords do not match."});
        }

        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return res.status(400).json({msg: "An account with this email already exists."});
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        //Create new user
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: passwordHash
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        res.status(500).json({error: err.message});
    }

});

router.post("/login", async (req, res) => {
    try {
        
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(400).json({msg: "Please fill in all fields."});
        }

        //find user in database
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({msg: "No account with this email has been registered."});
        }
        

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: "Incorrect password."});
        }

        //JSON webtoken
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);   
        res.json({
            token,
            user: {
                id: user._id
            },
        });             

    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/isTokenValid", async (req, res) => {
    try {
        const token = req.header('x-auth-token');

        if (!token) {
            return res.json(false);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.json(false);
        }

        const user = await User.findById(verified.id);
        
        if (!user) {
            return res.json(false);
        }

        return res.json(true);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);

    if (!user) {
        return res.status(500).json({error: err.message});
    }

    res.json({
        id: user._id
    })
});

module.exports = router;
