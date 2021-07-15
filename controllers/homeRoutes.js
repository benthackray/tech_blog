const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            'username'
          ],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: [
                'username'
              ],
            },
          ]
        },
      ],
    });

    const post = dbPostData.get({ plain: true });
    res.render('post', { 
      post, 
      loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET post for edit
router.get('/edit/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);

    const post = dbPostData.get({ plain: true });
    res.render('edit', { 
      post, 
      loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one user posts
router.get('/dashboard', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', {
      user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
