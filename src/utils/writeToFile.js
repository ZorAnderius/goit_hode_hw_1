const { writeFile } = require("fs/promises");

const writeToFile = async (path, data) => {
  try {
    await writeFile(path, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = writeToFile;
