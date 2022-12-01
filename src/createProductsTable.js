const { mariaDBOptions } = require("./mariaDb.js");
const knex = require("knex")(mariaDBOptions);

// Crear tabla (Ya creada)

knex.schema
	.createTable("products", (table) => {
		table.increments("id");
		table.string("name");
		table.string("thumbnail");
		table.integer("price");
	})
	.then(() => console.log("products table created"))
	.catch((err) => console.error(err))
	.finally(() => {
		knex.destroy();
	});


