const route = require("express").Router();
const addContact = require("../../controllers/contact/addContact");

route.post("/addContact", addContact);

module.exports = route;
