const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECKEY;

const authentication = (req, res, next) => {
    try {
        if (!req.headers.authorization) 
        return res.status(403).json({message: "Forbidden MF"})
        const token = req.headers.authorization.split(" ")[1]
        const parsedToken = jwt.verify(token, secret)
        req.token = parsedToken

        next()
    } catch (err) {
        res.status(403).json(err)
    }
}
module.exports = authentication
