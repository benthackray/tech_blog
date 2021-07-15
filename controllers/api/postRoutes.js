const router = require('express').Router();
const { Post } = require('../../models');

// Create a post
router.post('/', async (req, res) => {
    try {
        const dbPostData = await Post.create({
          title: req.body.title,
          text: req.body.text,
          user_id: req.session.user_id
        });    
        res.status(200).json(dbPostData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

// Edit a post
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        text: req.body.text
      },
      {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'Unable to update post' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;