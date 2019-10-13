const Base = require("./base");
const Developpement = require("./developpement");
const Production = require("./production");

const env = process.env.NODE_ENV;
let config = Developpement;
if(env === "production") {
  config = Production;
}

module.exports = Object.assign({}, Base, config);
