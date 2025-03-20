// schema for the user collection
const mongoose = require("mongoose");

// the basic schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    verificationStatus: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now }
});


// signup method
// userSchema.statics.signup = async function (username, email, password) {
//     // validating email
//     if (!validator.isEmail(email)) {
//         throw Error("Invalid email");
//     }
//     // validating password
//     if (!validator.isStrongPassword(password)) {
//         throw Error("Weak password");
//     }

//     // checking if the email already exists
//     const exists = await this.findOne({ email: email });
//     if (exists) {
//         throw Error("User already exists");
//     }

//     // new user detected. so hashing the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // creating the new user
//     const newUser = await this.create({
//         username: username,
//         email: email,
//         password: hashedPassword,
//         verificationStatus: false
//     });

//     return newUser;
// }

// login method
// userSchema.statics.login = async function (email, password) {
//     // validating email
//     const user = await this.findOne({ email: email });
//     if (!user) {
//         throw Error("Incorrect email");
//     }

//     // validating password
//     if (!(await bcrypt.compare(password, user.password))) {
//         throw Error("Incorrect password");
//     }

//     return user;
// }

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;