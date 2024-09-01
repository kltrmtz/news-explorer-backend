require("dotenv").config();

const { MONGODB_CONNECT = "mongodb://127.0.0.1:27017/newsExplorer_db" } =
  process.env;

const { JWT_SECRET = "secretSecret", NODE_ENV } = process.env;

// const { NODE_ENV } = process.env;

// const JWT_SECRET =
//   process.env.NODE_ENV === "production"
//     ? process.env.JWT_SECRET
//     : "20secretSecret24";

module.exports = { JWT_SECRET, NODE_ENV, MONGODB_CONNECT };
