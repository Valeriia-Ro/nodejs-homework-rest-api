const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authCurrent = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};
module.exports = authCurrent;

// const { User } = require("../models");
// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;

// const authCurrent = async (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     res.status(401).json({
//       status: "error",
//       code: 401,
//       message: "Not authorized",
//     });
//     return;
//   }

//   const [bearer, token] = authorization.split(" ");
//   if (bearer !== "Bearer") {
//     res.status(401).json({
//       status: "error",
//       code: 401,
//       message: "Not authorized",
//     });
//     return;
//   }

//   try {
//     const { _id } = jwt.verify(token, SECRET_KEY);
//     const user = await User.findById(_id);
//     if (!user.token) {
//       res.status(401).json({
//         status: "error",
//         code: 401,
//         message: "Not authorized",
//       });
//       return;
//     }
//     req.user = user;
//     next();
//     // console.log(result);
//   } catch (error) {
//     res.status(401).json({
//       status: "error",
//       code: 401,
//       message: "Not authorized",
//     });
//   }
// };
// module.exports = authCurrent;
