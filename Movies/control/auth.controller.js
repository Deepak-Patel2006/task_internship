import { signupUser,
  loginUser
 } from "../services/auth.service.js";

export const signup = async (req, res) => {

  try {
    
    const user = await signupUser(req.body);
    console.log(user);
    
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


export const signin = async (req, res) => {
  try {
    const users = await loginUser(req.body);
    console.log(users.user.id);
    
    req.session.regenerate((error) => {
       if (error) {
          return res.status(500).json({
          success: false,
          message: "Session creation failed please login again !!!",
          redirectUrl:'/sign.html'
          });
       }
    
      req.session.userId = users.user.id;
      req.session.isLoggedIn = true;
      req.session.role= users.user.role;

      res.status(200).json({
        success: true,
        message: "Login successful",
        users,
        redirectUrl: '/index.html'
        });
    });

  }catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
      redirectUrl: '/sign.html'
    });
  }
};

// test lene ke liye bas
export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated",
    user: req.session
  });
};

