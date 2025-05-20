const Contact = require("../../models/contact.model");

const addContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("name isss...",name);
    console.log("email is...",email);
    console.log("msg is..",message);

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("Saved Contact:", newContact);
    res.status(200).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Contact Form Error:", error);
    res.status(500).json({ message: "Failed to send message. Try again later." });
  }
};

module.exports = addContact;
