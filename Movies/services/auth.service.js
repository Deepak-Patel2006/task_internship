import bcrypt from "bcrypt";
import Account from "../models/user.model.js";

export const signupUser = async (userData) => {

  const { name, email, password, phone } = userData;

  const existingUser = await Account.findOne({ email });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Account.create({
      name,
      email,
      password: hashedPassword,
      phone
  });

  return user;
  }
  else{
    console.log("User already exist");
    throw new Error("User already exists");
  }

};

export const loginUser = async (loginData) => {
  const { email, password } = loginData;

  const user = await Account.findOne({ email });

  if (!user) {
    throw new Error("Invalid Email 📩 try again");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid password enter the correct pasword");
  }

  return{
    message:"Hello you are logged in !!!!",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};
