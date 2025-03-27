const userModel = require("../models/userModel"); // user schema and model imported
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const generateRandom = require("../utils/randomChar");
const codeModel = require("../models/code");
const resetModel = require("../models/reset");
const config = require("../utils/config.json");
const bcrypt = require("bcrypt");
const validator = require("validator");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw Error("All fields are required");
    }
    if (password.length < config.password.minLength) {
      throw Error(`Password must be at least ${config.password.minLength} characters long`);
    }
    if (password.length > config.password.maxLength) {
      throw Error(`Password must be at most ${config.password.maxLength} characters long`);
    }
    if (!validator.isEmail(email)) {
      throw Error("Invalid email address");
    }
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      throw Error("User already exists with this email");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({ username, email, password: hashedPassword, verificationStatus: false });
    const token = jwt.sign({ email, _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: config.user.expairsIn,
    });
    res.status(200).json({ username, email, token, verificationStatus: false });
  }
  catch (err) {
    res.status(400).json({ error: err.code === 11000 ? "The username is already taken." : err.message });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      throw Error("Incorrect email");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw Error("Incorrect password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: config.user.expairsIn,
    });
    res.status(200).json({ username: user.username, email, token, verificationStatus: user.verificationStatus });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const getPasswordResetMail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = userModel.findOne({ email });
    if (!user) {
      throw Error("No user is associeted with this email");
    }
    const resetData = await resetModel.findOne({ email });
    if (!resetData) {
      await resetModel.create({ email });
    } else {
      await resetModel.updateOne({ email }, { $set: { timestamp: Date.now() } });
    }
    if (resetData && (Date.now() - resetData.timestamp) < config.password.resetLinkWaitTimeInMinutes * 60000) {
      const remainingTime = Math.ceil((config.password.resetLinkWaitTimeInMinutes * 60000 - (Date.now() - resetData.timestamp)) / 60000);
      throw Error(`Wait for ${remainingTime} minutes to get another mail`);
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET + "email", {
      expiresIn: config.password.resetLinkExpiryTimeInMinutes * 60
    });

    const body = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password change requested</title>
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
            <h1>Password change requested</h1>
            <p>To change your password click the button below and input your new password</p>
            <a href="${process.env.CLIENT_URL}/forgetpassword/${token}" class="button" style="color: #fff;">Change Password</a>
            <p>This request will expire in <strong>${config.password.resetLinkExpiryTimeInMinutes} minutes</strong>. If you did not request this, please ignore this email.</p>
            <p class="footer">Need help? Contact us at <a href="mailto:info@knowyourkol.io" style="color: #fff;">info@knowyourkol.io</a></p>
        </div>

    </body>
    </html>`;
    const result = await sendMail(email, "Your password reset link for KnowYourKOL", body);
    res.status(200).json({ message: "success", ...result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET + "email");
    const resetData = await resetModel.findOne({ email });
    if (!resetData) {
      throw Error("This email didn't request a password reset link");
    } else {
      await resetModel.deleteOne({ email });
    }
    if (password.length < config.password.minLength) {
      throw Error(`Password must be at least ${config.password.minLength} characters long`);
    }
    if (password.length > config.password.maxLength) {
      throw Error(`Password must be at most ${config.password.maxLength} characters long`);
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw Error("No user is associated with this email");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.updateOne({ email }, { password: hashedPassword });
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


const getVerificationMail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw Error("No user is associeted with this email");
    }
    if (user.verificationStatus) {
      throw Error("Already verified");
    }
    const codeData = await codeModel.findOne({ email });
    if (codeData && (Date.now() - codeData.timestamp) < config.code.waitTimeInMinutes * 60000) {
      const remainingTime = Math.ceil((config.code.waitTimeInMinutes * 60000 - (Date.now() - codeData.timestamp)) / 60000);
      throw Error(`Wait for ${remainingTime} minutes to get another mail`);
    }
    // 8 digit random code
    const code = generateRandom(8);
    const token = jwt.sign({ email, code }, process.env.JWT_SECRET, {
      expiresIn: config.code.expiryTimeInMinuits * 60,
    });
    const tries = codeData ? codeData.tries + 1 : 1;
    // resending email will make previous link invalid
    await codeModel.deleteOne({ email })
    await codeModel.create({ email, code, tries });
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
        <a href="${process.env.SERVER_URL}/user/verify/${token}" class="button" style="color: #fff;">Verify My Account</a>
        <p>This link will expire in <strong>${config.code.expiryTimeInMinuits} minutes</strong>. If you did not request this, please ignore this email.</p>
        <p class="footer">Need help? Contact us at <a href="mailto:info@knowyourkol.io" style="color: #fff;">info@knowyourkol.io</a></p>
    </div>

</body>
</html>`;
    const result = await sendMail(email, "Your verification link for KnowYourKOL", body);
    res.status(200).json({ message: "success", ...result, tries });
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
  try {
    const { email, code } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email });
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
    if (codeData.code === code) {
      await userModel.updateOne({ email }, { verificationStatus: true });
      await codeModel.deleteOne({ email });
      // creating the token
      res.status(200).redirect(process.env.CLIENT_URL);
    } else {
      res.status(400).json({ error: "Wrong code" });
    }
  } catch ({ message }) {
    res.status(400).json({ error: message });
  }
}

const getVerificationStatus = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw Error("No user is associated with this email");
    }
    res.status(200).json({ verificationStatus: user.verificationStatus });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const callback = async (accessToken, refreshToken, data, done) => {
  // passport callback function
  console.log("callback", data);
  const { displayName, emails } = data;
  const user = await userModel.findOne({ email: emails[0].value });
  if (user) {
    done(null, user);
  }
  else {
    // create new user
    const newUser = await userModel.create({ username: displayName, email: emails[0].value, verificationStatus: true })
    done(null, newUser);
  }
}

module.exports = { registerUser, loginUser, getVerificationMail, verifyUser, callback, getVerificationStatus, getPasswordResetMail, resetPassword };