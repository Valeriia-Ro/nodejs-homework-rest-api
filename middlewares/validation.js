const validation = (schema) => {
  return async (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
      return;
    }
    next();
  };
};

module.exports = validation;

// let x = await (async function () {
//   return "hello";
// })();
// console.log(x);
// // or
// console.log(await (async () => "hello")());

// async function hello(){
//   return "hello";
// }
// let x = await hello();
// console.log(x);
