export const checkSession = (req, res, next) => {

    if (!req.session.isLoggedIn) {
        return res.status(401).json({
            success: false,
            message: "Please login first",
            redirectUrl: '/sign.html'
        });
    }

    next();
};