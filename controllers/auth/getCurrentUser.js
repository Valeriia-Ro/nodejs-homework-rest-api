const { User } = require("../../models");

const getCurrentUser = async (req, res) => {
  const { _id, email, subscription } = req.user;
  await Contact.find({ owner: _id });
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrentUser;
