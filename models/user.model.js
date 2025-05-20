// const { required, number } = require("joi");
const { Schema, model,Types } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  allowedDoctors: [
    {
      _id: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: String,
      email: String,
      phone: Number,
    }
  ],
  
  confirmPassword: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  // residence:{
  //     type:String,enum:[Ma],
  //     required: true
  // },
  // bloodGroup:{
  //     type: String,enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"],
  //     required: true
  // }
  role: {
    type: String,
    enum: ["user", "patient", "doctor", "admin"],
    default: "patient",
  },
});

module.exports = model("User", UserSchema, "users");
