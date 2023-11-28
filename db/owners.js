const client = require('./client');

const createOwner = async(name) => {
  try {
    await client.query(`
      INSERT INTO owners (name)
      VALUES ('${name}');
    `);
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createOwner
}