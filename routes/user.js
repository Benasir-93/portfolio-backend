import express from "express";
import { User } from "../models/user.js";
import { sendUserEmail, sendOwnerEmail } from "../controllers/sendingEmail.js";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, name, message } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if email is not null
    if (email === null) {
      return res.status(400).json({ error: "Email cannot be null" });
    }

    // Find the user by email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If the user exists, add a new form entry to the array
      existingUser.formEntries.push({
        name,
          message,
   
      });

      await existingUser.save();
 

      // Send email to the user
      await sendUserEmail(email, "Thank You From Benasir Begam", "Thanks for choosing me! We'll  work  on your request as soon as possible.");

      // Send email to the site owner
      await sendOwnerEmail("benasirfaizal93@gmail.com", "New Form Submission from an already existed user", `New form submission from an existing user\nEmail: ${email}\nName: ${name}\nMessage: ${message}`);
      return res.status(200).json({
        message: "Form data added to existing user",
        user: existingUser,
      });
    }

    // If the user doesn't exist, create a new user with the form entry
    const newUser = new User({
      email,
      formEntries: [{
        name,
        message,
       
      }],
    });

    await newUser.save();
    // Send email to the user
    await sendUserEmail(email, "Thank You from Benasir Begam", "Thanks for choosing me! We'll  work  on your request as soon as possible.");

    // Send email to the site owner
    await sendOwnerEmail("benasirfaizal93@gmail.com", "New enquiry from portfolio site", `New form submission from\nEmail: ${email}\nName: ${name}\nMessage: ${message}`);

    return res.status(201).json({ message: "New user approached you!", user: newUser });
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log('Validation Error:', error.errors);
      res.status(400).json({ error: 'Validation Error' });
    } else {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

export { router };
