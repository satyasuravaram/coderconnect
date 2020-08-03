const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
router.post("/send", async (req, res) => {
    const { firstName, lastName, email, age, skills } = req.body;
    let skillsList = "";
    for(let skill of skills){
        skillsList += `<li>${skill.value}</li>`
    }
    const output = `
    <h2>Tutor Application - ${firstName + " " + lastName}</h2>
    <ul>  
      <li>Name: ${firstName + " " + lastName}</li>
      <li>Email: ${email}</li>
      <li>Age: ${age}</li>
    </ul>
    <h3>Skills:</h3>
    <ul>
        ${skillsList}
    </ul>
  `;
    console.log("output", output)
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "coderconnectemail@gmail.com", // generated ethereal user
            pass: process.env.SENDER_EMAIL_PASS, // generated ethereal password
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    });

    const subjectTitle = `Tutor Application - ${firstName + " " + lastName}`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Coder Connect Email" <coderconnectemail@gmail.com>', // sender address
        to: "coderconnectteam@gmail.com", // list of receivers
        subject: subjectTitle, // Subject line
        text: "", // plain text body
        html: output, // html body
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email Sent!");
        }
    });

    res.send(req.body);
})

router.post("/contact", async(req, res)=>{
    const { firstName, lastName, email, message } = req.body;
    const output = `
    <h2>Contact Form</h2>
    <ul>  
      <li>Name: ${firstName + " " + lastName}</li>
      <li>Email: ${email}</li>
    <p>${message}</p>
  `;
    console.log("output", output)

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "coderconnectemail@gmail.com", // generated ethereal user
            pass: process.env.SENDER_EMAIL_PASS, // generated ethereal password
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    });

    const subjectTitle = `Contact Form - ${firstName + " " + lastName}`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Coder Connect Email" <coderconnectemail@gmail.com>', // sender address
        to: "coderconnectteam@gmail.com", // list of receivers
        subject: subjectTitle, // Subject line
        text: "", // plain text body
        html: output, // html body
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email Sent!");
        }
    });

    res.send(req.body);
})




module.exports = router;