const server = require('./server');

const port = 5555;

server.listen(5555, () => {
	console.log('Server listening on port 5555.');
});
