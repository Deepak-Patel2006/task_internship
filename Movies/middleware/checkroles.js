// import Account from "../models/user.model.js";
import {role_permission} from "../config/roles.js";

export const checkrole = (requiredPermission) => {

  return async (req, res, next) => {

    try {

      const userId = req.session.userId;
      console.log(userId);
      
      // const user = await Account.findById(userId);  
      const permissions = role_permission[req.session.role] || [];
      // console.log(permissions);
      
      if (!permissions.includes(requiredPermission)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission"
        });
      }

      next();

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Authorization failed"
      });

    }
  };
};



/* export const checkrole = async(req,res,next)=>{

    const userId = req.session.userId;

    const user = await Account.findById(userId);

    if (user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        });
    }

    next();

}; */

/*export const checkRole = (allowedRole) => {

  return async (req, res, next) => {

    try {
      const userId = req.session.userId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }

      if (user.role !== allowedRole) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }

      next();

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Authorization failed"
      });

    }
  };
}; */
