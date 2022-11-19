const jwt = require("jwt-simple");
const { DateTime } = require("luxon");

const createToken = (user) => {
  const payload = {
    sub: user._id,
    iat: DateTime.now().toMillis(),
    exp: DateTime.now().plus({ day: 7 }).toMillis(),
  };
  return jwt.encode(payload, process.env.SECRET_TOKEN);
};

const decodeToken = (token) => {
  try {
    const payload = jwt.decode(token, process.env.SECRET_TOKEN);
    if (payload.exp <= DateTime.now().toMillis()) {
      return { status: 401, message: "Token expirado!" };
    }
    return payload.sub;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createToken,
  decodeToken,
};
