const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;
function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  console.log(token)
  return token;
}
function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}
module.exports = { createToken, validateToken };
