const { sqliteOptions } = require("./sqlite");
const knex = require("knex")(sqliteOptions);

knex.schema
	.createTable("chat", (table) => {
		table.increments("id");
		table.string("author");
		table.string("date");
		table.string("text");
	})
	.then(() => console.log("Chat table created"))
	.catch((err) => console.error(err))
	.finally(() => {
		knex.destroy();
	});
