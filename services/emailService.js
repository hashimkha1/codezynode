const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Client = require('../models/Client'); // Adjust the path to your client model

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'hotmail', 'outlook', etc.
    auth: {
        user: 'ghulamkabia622@gmail.com', // Your email address
        pass: 'Ghulamkabira00@'   // Your email password or app password
    }
});

router.post('/hire-us', async (req, res) => {
    const { name, email, phone, company, message, budget, selectedServices } = req.body;
    console.log(req.body);

    try {
        // Save client data to the database
        const client = new Client(req.body);
        await client.save();

        // Prepare the email details
        const mailOptions = {
            from: 'ghulamkabira622@gmail.com',  // The sender's email address
            to: 'ksharjeel07@gmail.com', // The recipient (admin email)
            subject: 'New Hire Us Submission', // Subject of the email
            text: `
                You have received a new submission from the "Hire Us" form.
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Company: ${company}
                Message: ${message}
                Budget: ${budget}
                Selected Services: ${selectedServices.join(', ')}
            `, // Body of the email
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Send a response back to the client
        res.status(201).json(client);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
