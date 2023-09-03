const { readFile } = require("fs/promises");

const readFromFile = async (path) => {
  try {
    const data = (await readFile(path)).toString();
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = readFromFile;
