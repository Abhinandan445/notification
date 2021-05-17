const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

if (!knex) {
  console.log("DB returned an error: %s", knex)
} else {
  console.log(`VafDB Connected: ${connection.host}`.cyan.underline.bold);
}

//onsole.log(`VafDB Connected: ${connection.host}`);

module.exports = knex;
