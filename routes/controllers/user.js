const nodemailer = require("nodemailer");
const userModel = require('./../../db/models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const SALT = Number(process.env.SALT)
const SECKEY = process.env.SECKEY
const transport = nodemailer.createTransporter({
    service:"Gmail",
    auth : { 
        user : process.env.EMAIL,
        pass : process.env.PASS
    }
})
