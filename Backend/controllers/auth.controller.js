import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  //Signup end point
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required " });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Email already exists !" });

    const salt = await bcrypt.genSalt(10); //Password Hashing
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      //To store the new user to the databse
      fullName,
      email,
      password: hashedPass,
    });

    if (newUser) {
      //if newUser is there , then we'll generate the jwt else we'll return invalid user Data
      generateToken(newUser._id, res);
      await newUser.save(); //saved newUser to the Database

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
      re;
    }
  } catch (error) {
    console.log("Error in signup Controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  //Login end point..
  const { email, password } = req.body; //get the email and password
  try {
    const user = await User.findOne({ email }); //find if email exists or not
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return res.status(404).json({ message: "Invalid password" });
    }

    generateToken(user._id, res); //YE line samajhni hai

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.send("logout route");
};
