import userSchema from "../schemas/user_schema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { insertUser, singleUserbyEmail } from "./common/userFunctions.js";
import { genOTP } from "../utils/functions.js";
import mailer from "../utils/nodemailer_config.js";
dotenv.config();

const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  secure: true,
  signed: true,
};
// sign up endpoint
const signUp = async (req, res) => {
  try {
    const user = req.body;
    console.log(process.env.SALT);
    if (user.password)
      user.password = await bcrypt.hash(
        user.password,
        parseInt(process.env.SALT)
      );
    const result = await insertUser(user);
    if (result?.email)
      res
        .status(201)
        .send(await singleUserbyEmail(result?.email, result?.role));
    else throw new Error("User could not be added. Please try again.");
  } catch (err) {
    res.status(500).send(err);
  }
};
// sign in endpoint
const signIn = async (req, res) => {
  try {
    const user = await singleUserbyEmail(req.body.email);
    if (!user)
      return res.status(404).send({ message: "Email does not exist." });
    if (user.banned) {
      res.clearCookie("accessToken", [cookieOptions]);
      return res.status(401).send({ message: "User is banned." });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { role: user.role, email: user.email, _id: user._id },
        process.env.JWT_SECRET
      );
      res.cookie("accessToken", token, cookieOptions);
      res.status(200).send(await singleUserbyEmail(user?.email, user?.role));
    } else res.status(401).send({ message: "Invalid password." });
  } catch (err) {
    res.status(500).send(err);
  }
};
const getMyInfo = async (req, res) => {
  try {
    const user = await singleUserbyEmail(
      req.tokenData.email,
      req.tokenData.role
    );
    if (!user) res.status(404).send({ message: "Email does not exist." });
    else if (user.banned) res.status(401).send({ message: "User is banned." });
    else res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const [resetToken, id] = req.body.resetToken.split("$");
    if (!id || isNaN(parseInt(id)))
      return res.status(404).send({ message: "Reset token is invalid." });
    const user = await userSchema.findOne({
      where: {
        _id: id,
        resetToken: resetToken,
      },
    });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch)
        return res
          .status(403)
          .send({ message: "New password can not be same as old password." });
      const newPassword = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT)
      );
      await user.update(
        { password: newPassword, resetToken: genOTP() },
        { where: { _id: id } }
      );
      res.status(200).send({ message: "Password reset successful." });
    } else res.status(404).send({ message: "Reset token is invalid." });
  } catch (err) {
    res.status(500).send(err);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userSchema.findOne({
      where: { email: email },
    });
    if (!user) return res.status(404).send({ message: "Email is not found." });
    const resetToken = user.resetToken + "$" + user._id;
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset for Flaunt Fashion",
      html: `
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account in Flaunt Fashion website.</p> 
        <p>Please paste below code into <b style="font-style: italic; color: blue;">Reset Token</b> input to complete the process:</p>
        
        <h1><span style="color: blue; border: 2px gray solid; padding: 10px;">${resetToken}</span></h1> 
    
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p> <p><strong>Thank you!</strong></p>
        `,
    };
    const result = await mailer.sendMail(mailOptions);
    // console.log(result);
    if(result.messageId)
        res.status(200).send({ message: "Reset password email sent successfully." });
    else 
        throw new Error("Couldn't send reset password email. Please try again later.");
  } catch (err) {
    res.status(500).send(err);
  }
};

export { signUp, signIn, getMyInfo, resetPassword, forgotPassword };
