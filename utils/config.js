require("dotenv").config();

// const { JWT_SECRET = "secretSecret", NODE_ENV } = process.env;

const { NODE_ENV } = process.env;

const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : "20secretSecret24";

module.exports = { JWT_SECRET, NODE_ENV };
