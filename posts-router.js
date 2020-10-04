const router = require('express').Router();
const { findById } = require('./data/db');
const Posts = require('./data/db');

router.post('/', (req, res) => {
	const post = req.body;

	if (!post.title || !post.contents) {
		res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.',
		});
	} else {
		Posts.insert(post)
			.then((id) => {
				res.status(201).json(id);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
});

router.get('/:id/comments', (req, res) => {
	Posts.findPostComments(req.params.id)
		.then((comments) => {
			if (comments.length > 0) {
				res.json(comments);
			} else {
				res.status(200).json({
					message: 'This post has no comments yet',
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'Could not get post comments',
			});
		});
});

router.post('/:id/comments', (req, res) => {
	Posts.findById(req.params.id)
		.then((post) => {
			console.log(post);
			if (post[0]) {
				const newObj = {
					text: req.body.text,
					post_id: req.params.id,
				};
				Posts.insertComment(newObj)
					.then((comment) => {
						res.status(201).json(comment);
					})
					.catch((err) => {
						res.status(500).json(err);
					});
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
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
