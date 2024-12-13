import userSchema from "../schemas/user_schema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { insertUser, singleUserbyEmail } from "./common/userFunctions.js";
import { genOTP } from "../utils/functions.js";
import mailer from "../utils/nodemailer_config.js";
import { invalidDataError, notFoundError, responseSuccess, serverError, unauthorizedError } from "./common/commonFunction.js";
dotenv.config();

const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  secure: true,
  signed: true,
};
// API for SIGN UP
const signUp = async (req, res) => {
  try {
    const user = req.body;
    if (user.password)
      user.password = await bcrypt.hash(
        user.password,
        parseInt(process.env.SALT)
      );
    const result = await insertUser(user);
    if (result?.email)
      responseSuccess(res, await singleUserbyEmail(result?.email, result?.role))
    else notFoundError(res, "User couldn't be added.")
  } catch (err) {
    serverError(res, err)
  }
};
// API for SIGN IN
const signIn = async (req, res) => {
  try {
    const user = await singleUserbyEmail(req.body.email);
    if (!user)
      return notFoundError(res, "User not found.");
    if (user.banned) {
      res.clearCookie("accessToken", [cookieOptions]);
      return unauthorizedError(res, "User is banned.");
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { role: user.role, email: user.email, _id: user._id },
        process.env.JWT_SECRET
      );
      res.cookie("accessToken", token, cookieOptions);
      responseSuccess(res, await singleUserbyEmail(user?.email, user?.role))
    } else invalidDataError(res, "Invalid password.");
  } catch (err) {
    serverError(res, err)
  }
};
// API for My Information
const getMyInfo = async (req, res) => {
  try {
    const user = await singleUserbyEmail(
      req.tokenData.email,
      req.tokenData.role
    );
    if (!user) notFoundError(res, "User with this email not found.");
    else if (user.banned) unauthorizedError(res, "User is banned." )
    else responseSuccess(res, user);
  } catch (err) {
    serverError(res, err)
  }
};

// API for Reset Password
const resetPassword = async (req, res) => {
  try {
    const [resetToken, id] = req.body.resetToken.split("$");
    if (!id || isNaN(parseInt(id)))
      return invalidDataError(res, "Reset Token is invalid.");
    const user = await userSchema.findOne({
      where: {
        _id: id,
        resetToken: resetToken,
      },
    });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch)
        return unauthorizedError(res, "New password can't be same as old password.")
      const newPassword = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT)
      );
      await user.update(
        { password: newPassword, resetToken: genOTP() },
        { where: { _id: id } }
      );
      responseSuccess(res, { message: "Password reset successful." })
    } else invalidDataError(res, "Reset Token is invalid.")
  } catch (err) {
    console.log(err);
    serverError(res, err)
  }
};

// API for Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userSchema.findOne({
      where: { email: email },
    });
    if (!user) return notFoundError(res, "User with this email not found.")
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
    if(result.messageId)
        responseSuccess(res, { message: "Reset password email sent successfully." })
    else 
        notFoundError(res, "Couldn't send reset password email.")
  } catch (err) {
    serverError(res, err)
  }
};

export { signUp, signIn, getMyInfo, resetPassword, forgotPassword };
