const mogoose = require("mongoose");

const userSchema = new mogoose.Schema({
    email: String,
    password: String
});

module.exports = mogoose.model("User", userSchema)