const userModel = require("../models/userModel"); // user schema and model imported
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const codeModel = require("../models/code");
const config = require("../utils/config");
const bcrypt = require("bcrypt");
const validator = require("validator");

const registerUser = (req, res) => {
  const { username, email, password } = req.body;
  userModel.findOne({ email }).then(async (user) => {
    if (user) {
      throw Error("User already exists");
    }
    if(!validator.isEmail(email)){
      throw Error("Invalid email");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return userModel.create({ username, email, password:hashedPassword, verificationStatus: false });
  }).then(() => {
    res.status(200).json({ email });
  }).catch((err) => {
    res.status(400).json({ error: err.message });
  });
}

const loginUser = (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email }).then(async (user) => {
    if (!user) {
      throw Error("Incorrect email");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw Error("Incorrect password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: config.token.expairsIn,
    });
    res.status(200).json({ email, token });
  }).catch((err) => {
    res.status(400).json({ error: err.message });
  })
}

const getAllUsers = (req, res) => {
  userModel.find({}).then((data) => {
    const users = data.map(({ username, email }) => {
      return { username, email }
    });
    res.status(200).json(users);
  }).catch((err) => {
    res.status(400).json(err);
  })
}

const getVerificationMail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    const codeData = await codeModel.findOne({ email });
    if (!user) {
      throw Error("No user is associeted with this email");
    }
    if (user.verificationStatus) {
      throw Error("Already verified");
    }
    if (codeData && (Date.now() - codeData.timestamp) < 1 * 60000) {
      // throw Error("Wait for some time to get another mail");
    }
    // 6 digit random code
    const code = Math.floor(100000 + Math.random() * 899999);
    const result = await sendMail(user.firstName, email, code);
    const tries = codeData ? codeData.tries + 1 : 1;
    await codeModel.deleteOne({ email })
    await codeModel.create({ email, code,  tries});
    res.status(200).json({...result, tries});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
// const getNumberOfTries = async (req, res) => {
//   const { email } = req.params;
//   try{
//     const { tries } = await codeModel.findOne({ email });
//     res.status(200).json({ tries });
//   }catch({ message }){
//     res.status(400).json({ error: message });
//   }
// }

const verifyUser = async (req, res) => {
  const { email, code } = req.body;
  const user = await userModel.findOne({ email });
  try {
    if (!user) {
      throw Error("No user is associeted with this email");
    }

    if (user.verificationStatus) {
      throw Error("Already verified");
    }

    const codeData = await codeModel.findOne({ email });
    if (!codeData) {
      throw Error("No code is associeted with this email");
    }
    if ((Date.now() - codeData.timestamp) > config.code.expiryTimeInMinuits * 60000) {
      throw Error("Code expired");
    }
    if (codeData.code == code) {
      await userModel.updateOne({ email }, { verificationStatus: true });
      await codeModel.deleteOne({ email });
      // creating the token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: config.token.expairsIn,
      });
      res.status(200).json({ email: email, token: token });
    } else {
      res.status(400).json({ error: "Wrong code" });
    }
  } catch ({ message }) {
    res.status(400).json({ error: message });
  }
}

const googleCallback = async (accessToken, refreshToken, data, done) => {
  // passport callback function
  const { displayName, emails } = data;
  const user = await userModel.findOne({ email: emails[0].value });
  if (user) {
    done(null, user);
  }
  else {
    // create new user
    const newUser = await userModel.create({ username:displayName, email: emails[0].value, verificationStatus: true })
    done(null, newUser);
  }
}

module.exports = { registerUser, loginUser, getAllUsers, getVerificationMail, verifyUser, googleCallback };