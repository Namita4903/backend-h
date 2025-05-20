const Joi = require("joi");

const registrationValidation = Joi.object({
    username: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(50).required(),
    confirmPassword: Joi.string().required(),
    // bloodGroup: Joi.string().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-").required(), // i have comment this bcz u havnt paasing blood group from fronted
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(), // Ensures 10-digit phone number
    role:Joi.string().valid("user","patient","doctor","admin").default("patient"),
    gender: Joi.string()
        .valid("Male", "Female", "Other")
        .insensitive() // Allows "male", "female", "other" (case-insensitive)
        .trim() // Removes leading/trailing spaces
        .required()
}).unknown(true);

const reportValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  uploadedBy: Joi.string().optional(), // Optional or required based on your auth
  image: Joi.string()
    .pattern(/^data:image\/(jpeg|jpg|png|gif);base64,[A-Za-z0-9+/=]+$/)
    .required()
});


const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3).max(50),
    remember: Joi.boolean()
  });
  const addUservalidation = Joi.object({
    username: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(50).required(),
    confirmPassword: Joi.string().required(),
    // bloodGroup: Joi.string().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-").required(), // i have comment this bcz u havnt paasing blood group from fronted
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(), // Ensures 10-digit phone number
    role:Joi.string().valid("user","patient","doctor","admin"),
    gender: Joi.string()
        .valid("Male", "Female", "Other")
        .insensitive() // Allows "male", "female", "other" (case-insensitive)
        .trim() // Removes leading/trailing spaces
        .required()
}).unknown(true);

module.exports = { registrationValidation, loginValidation , addUservalidation ,reportValidation};
