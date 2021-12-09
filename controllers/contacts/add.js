const contactsOperations  = require("../../model");

const add = async (req, res) => {
  const result = await contactsOperations.addInMOdel(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
