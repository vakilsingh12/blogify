const { validateToken } = require("../services/authentication");

function checkAuthCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
      return next();
    }
    try {
      const userPayload = validateToken(token);
      req.user = userPayload;
    } catch (err) {
      return res.send(400).json({ msg: "wrong username & password" });
    }
    return next();
  };
}
module.exports = checkAuthCookie;
