const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);

  const hash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

  const newUser = { email, password: hash, avatarURL };
  const result = await User.create(newUser);
  console.log(result);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Signup success",
    data: {
      user: {
        email,
        password,
        avatarURL,
      },
    },
  });
};

module.exports = signup;
