const router = require('express').Router();
const { findById } = require('./data/db');
const Posts = require('./data/db');

router.post('/', (req, res) => {
	const post = req.body;
	Posts.insert(post)
		.then((id) => {
			res.status(201).json(id);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get('/', (req, res) => {
	Posts.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	Posts.findById(id)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

router.put('/:id', (req, res) => {
	const id = req.params.id;
	const post = req.body;
	Posts.update(id, post)
		.then((hmm) => {
			Posts.findById(id)
				.then((post) => {
					res.status(200).json(post);
				})
				.catch((err) => {
					res.status(404).json(err);
				});
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	Posts.remove(id)
		.then((del) => {
			res.status(204).json(del);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
