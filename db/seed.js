const client = require('./client.js');
const { createOwner } = require('./owners.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS pets;
      DROP TABLE IF EXISTS owners;
    `)
  } catch(err) {
    console.log(err);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE owners (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        type VARCHAR(20) NOT NULL,
        owner_id INTEGER REFERENCES owners(id)
      );
    `)
  } catch(err) {
    console.log(err);
  }
}

const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log(`CONNECTED TO THE DB!`);

    await dropTables();
    console.log(`TABLES HAVE BEEN DROPPED!`);

    await createTables();
    console.log(`CREATED THE TABLES!`);

    await createOwner('Tiffany');
    await createOwner('Barry');
    await createOwner('Harriet');
    await createOwner('Lilly');
    console.log(`OWNERS CREATED!`);

    client.end();
  } catch(err) {
    console.log(err);
  }
}

syncAndSeed();