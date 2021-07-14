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

module.exports = router;