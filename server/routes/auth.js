const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/googlelogin", async (req, res) => {
  try {
    const { tokenId } = req.body;

    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, given_name, family_name, email } = response.payload;

    if (email_verified) {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        //JSON webtoken
        const token = jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECRET
        );
        return res.json({
          token,
          user: {
            id: existingUser._id,
          },
        });
      } else {
        const newUser = new User({
          firstName: given_name,
          lastName: family_name,
          email: email,
          password: email + process.env.JWT_SECRET,
        });

        const savedUser = await newUser.save();
        //JSON webtoken
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
        return res.json({
          token,
          user: {
            id: savedUser._id,
          },
        });
      }
    }
    console.log("Google login success");
  } catch (error) {
    console.log("Google login error", error);
    res.json({ error });
  }
});

module.exports = router;
