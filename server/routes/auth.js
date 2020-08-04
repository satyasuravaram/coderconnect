const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
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

router.post("/facebooklogin", (req, res) => {
  try {
    const { accessToken, userID } = req.body;

    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

    fetch(urlGraphFacebook, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        const { email, name } = response;
        User.findOne({ email: email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({ error: "Something went wrong." });
          } else {
            if (user) {
              //JSON webtoken
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
              return res.json({
                token,
                user: {
                  id: user._id,
                },
              });
            } else {
              const nameArr = name.split(" ");
              const newUser = new User({
                firstName: nameArr[0],
                lastName: nameArr[nameArr.length - 1],
                email: email,
                password: email + process.env.JWT_SECRET,
              });

              newUser.save((err, data) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ error: "Something went wrong." });
                }
                //JSON webtoken
                const token = jwt.sign(
                  { id: data._id },
                  process.env.JWT_SECRET
                );
                return res.json({
                  token,
                  user: {
                    id: data._id,
                  },
                });
              });
            }
          }
        });
      });
    // const response = await client.verifyIdToken({
    //   idToken: tokenId,
    //   audience: process.env.GOOGLE_CLIENT_ID,
    // });

    // const { email_verified, given_name, family_name, email } = response.payload;

    // if (email_verified) {
    //   const existingUser = await User.findOne({ email: email });
    //   if (existingUser) {
    //     //JSON webtoken
    //     const token = jwt.sign(
    //       { id: existingUser._id },
    //       process.env.JWT_SECRET
    //     );
    //     return res.json({
    //       token,
    //       user: {
    //         id: existingUser._id,
    //       },
    //     });
    //   } else {
    //     const newUser = new User({
    //       firstName: given_name,
    //       lastName: family_name,
    //       email: email,
    //       password: email + process.env.JWT_SECRET,
    //     });

    //     const savedUser = await newUser.save();
    //     //JSON webtoken
    //     const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    //     return res.json({
    //       token,
    //       user: {
    //         id: savedUser._id,
    //       },
    //     });
    //   }
    // }
    // console.log("Google login success");
  } catch (error) {
    console.log("Google login error", error);
    res.json({ error });
  }
});

module.exports = router;
