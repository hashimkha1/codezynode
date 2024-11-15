// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import Client from '../../models/hire/HireUs.js';
// import nodemailer from 'nodemailer';
// // Create an Express router
const router = express.Router();

// Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // You can use other services like 'hotmail', 'outlook', etc.
//     auth: {
//         user: 'ksharjeel075@gmail.com', // Your email address
//         pass: 'Mehboobali.9'   // Your email password or app password
//     }
// });

router.post('/hire-us', async (req, res) => {
    const { name, email, phone, company, message, budget, selectedServices } = req.body;
    console.log(req.body);

    try {
        
        const client = new Client(req.body);
        await client.save();
        

        // Prepare the email details
        // const mailOptions = {
        //     from: 'ghulamkabira622@gmail.com',  // The sender's email address
        //     to: 'ksharjeel07@gmail.com', // The recipient (admin email)
        //     subject: 'New Hire Us Submission', // Subject of the email
        //     text: `
        //         You have received a new submission from the "Hire Us" form.
        //         Name: ${name}
        //         Email: ${email}
        //         Phone: ${phone}
        //         Company: ${company}
        //         Message: ${message}
        //          Budget: ${budget}
        //         Selected Services: ${selectedServices.join(', ')}
        //     `, // Body of the email
        // };

        // // Send the email
        // await transporter.sendMail(mailOptions);

        // Send a response back to the client
        const meeting = "https://meet.google.com/gpv-qivz-qbe"
        res.status(200).json({ meeting });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

export default router;
