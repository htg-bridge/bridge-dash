require("dotenv").config();
const Operations = require("./src/controllers/operations");

exports.chainChain = (req, res) => {
  // POST request
  if (Object.keys(req.body).length) {
    const { link, status } = req.body;
    const operations = new Operations();
    if (status === "add") {
      operations.addNewUser(link);
      operations.trainNewUser(link);
    }
  } else console.log("GET request is not supported");
  res.send();
};
