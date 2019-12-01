const path = require('path');

const port = process.env.PORT || 4567;

module.exports = {
	// Server location
	host: `http://localhost${this.port === 80 ? '' : `:${port}`}`, // TODO wat
	port,
	// Directory where the compiled frontend goes
	publicDir: path.join(__dirname, 'public'),
	serverDir: path.join(__dirname,'Server'),
	users: {
		admin: {
			username: "comsats",
			password: "ciit",
		}
	}
};
