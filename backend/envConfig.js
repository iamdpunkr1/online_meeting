// from Root directory
const dotenv = require("dotenv");

dotenv.config();
a=process.env.EMAIL
console.log(a)
module.exports = {
    user: a,
    pass: process.env.PASS
}