const addInMOdel = require("../../model/add");

const add = async (req, res) => {
  const result = await addInMOdel(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
