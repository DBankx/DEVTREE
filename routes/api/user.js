require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middlewares/auth');

// creating a user

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please use a valid email').isEmail(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'pasword min length is 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, username, password } = req.body;

    try {
      let user = await User.findOne({
        $or: [{ email: email }, { username: username }]
      });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        d: 'mm',
        r: 'pg'
      });

      // create user

      user = new User({
        name: name,
        email: email,
        username: username,
        avatar: avatar,
        password: password
      });

      // hash the password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // get token from jwt
      const payload = {
        user: {
          id: user.id
        }
      };

      await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            console.log('error'),
              res.status(500).send({ msg: 'There was an error...Try Again' });
          }

          if (token) {
            res.send({ token: token });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

// follow a user
router.put('/follow/:user_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).populate('user', [
      'avatar',
      'following',
      'followers',
      'name'
    ]);
    const userMain = await User.findOne({ _id: req.user.id }).populate('user', [
      'avatar',
      'following',
      'followers',
      'name'
    ]);
    // check if user has been followed
    if (
      user.following.filter((follow) => follow.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'you already follow user' });
    }

    const newFollower = {
      user: req.user.id,
      username: userMain.username,
      avatar: userMain.avatar
    };

    const newFollowing = {
      user: req.params.user_id,
      username: user.username,
      avatar: user.avatar
    };

    user.followers.unshift(newFollower);

    userMain.following.unshift(newFollowing);

    await user.save();

    await userMain.save();

    res.json(userMain.following);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// unfollow a user
router.put('/unfollow/:user_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    const userMain = await User.findOne({ _id: req.user.id });
    // check if user has been followed
    if (
      user.followers.filter((follow) => follow.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'user has not been followed' });
    }

    // remove user from other users followers

    const removeIndex = user.followers
      .map((follow) => follow.user.toString())
      .indexOf(req.user.id);

    user.followers.splice(removeIndex, 1);

    // remove users from main user following
    const removeIndex2 = userMain.following
      .map((follow) => follow.user.toString())
      .indexOf(req.params.user_id);

    userMain.following.splice(removeIndex2, 1);

    await user.save();
    await userMain.save();

    res.json(user.following);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
