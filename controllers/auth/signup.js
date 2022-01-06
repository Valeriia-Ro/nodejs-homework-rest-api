const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require("../../helpers");
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);

  const hash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  const verificationToken = nanoid();
  const newUser = { email, password: hash, avatarURL, verificationToken };
  const result = await User.create(newUser);
  console.log(result);

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}> Tab to verify email <a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Signup success",
    data: {
      user: {
        email,
        password,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
