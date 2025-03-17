const userModel = require("../models/userModel"); // user schema and model imported
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const generateRandom = require("../utils/randomChar");
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
  }).then((user) => {
    const token = jwt.sign({ email, _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: config.token.expairsIn,
    });
    res.status(200).json({ email, token });
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
    if (codeData && (Date.now() - codeData.timestamp) < config.code.waitTimeInMinutes * 60000) {
      throw Error("Wait for some time to get another mail");
    }
    // 8 digit random code
    const code = generateRandom(8);
    const token = jwt.sign({ email, code }, process.env.JWT_SECRET, {
      expiresIn: config.code.expiryTimeInMinuits * 60,
    });
    const body = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 40px auto;
            background: #000;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            width: 120px;
            margin-bottom: 20px;
        }
        h1 {
            color: #ffff;
        }
        p {
            font-size: 16px;
            color: #fff;
            line-height: 1.5;
        }
        a{
            color: #bbdff2;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #ffff;
        }
    </style>
</head>
<body>

    <div class="container">
        <img src="https://assets.api.uizard.io/api/cdn/stream/c2ac1e01-964e-431a-b068-47421fdc98ae.png" alt="Logo" class="logo">
        <h1>Verify Your Account</h1>
        <p>Thank you for signing up! Click the button below to verify your account and get started.</p>
        <a href="http://localhost:5000/user/verify/${token}" class="button" style="color: #fff;">Verify My Account</a>
        <p>This link will expire in <strong>${config.code.expiryTimeInMinuits} minutes</strong>. If you did not request this, please ignore this email.</p>
        <p class="footer">Need help? Contact us at <a href="mailto:info@knowyourkol.io" style="color: #fff;">info@knowyourkol.io</a></p>
    </div>

</body>
</html>`;
    const result = await sendMail(email, "Your verification link for KnowYourKOL", body);
    const tries = codeData ? codeData.tries + 1 : 1;
    await codeModel.deleteOne({ email })
    await codeModel.create({ email, code,  tries});
    res.status(200).json({message:"success",...result, tries});
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
  const token = req.params.token;
  const { email, code } = jwt.verify(token, process.env.JWT_SECRET);
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
      res.status(200).redirect("http://localhost:5173");
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

module.exports = { registerUser, loginUser, getVerificationMail, verifyUser,  googleCallback};