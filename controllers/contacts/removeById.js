const { NotFound } = require("http-errors");

const contactsOperations = require("../../model");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.removeContactById(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeById;
