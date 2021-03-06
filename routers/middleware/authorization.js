const roleModel = require("./../../db/models/role");
const authorization = async (req, res, next) => {
  try {
    const roleId = req.token.role;
    const result = await roleModel.findById(roleId);
    if (result.role === "admin") {
      next();
    } else {
        res.status(403).json("Forbidden MF")
    }
  } catch (err) {
         res.status(403).json(err);

  }
};
module.exports = authorization