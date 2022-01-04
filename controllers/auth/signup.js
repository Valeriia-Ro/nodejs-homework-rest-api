const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcryptjs = require("bcryptjs");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  const newUser = { email, password: hash };
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
      },
    },
  });
};

module.exports = signup;
