const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify || !bcrypt.compareSync(password, user.password)) {
    throw new Unauthorized("Email or password is wrong, or user is not verify");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
