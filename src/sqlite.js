const path = require("path");

const dbPath = path.resolve(__dirname, "./db/ecommerce.sqlite");
console.log(dbPath);

const sqliteOptions = {
	client: "sqlite3",
	connection: {
		filename: "./src/db/ecommerce.sqlite",
	},
	useNullAsDefault: true,
};

module.exports = {
	sqliteOptions,
};
