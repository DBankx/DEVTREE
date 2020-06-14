const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// verify the token
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('server error');
  }
});

// login route
router.post(
  '/',
  [
    check('username', 'Valid username is required').not().isEmpty(),
    check('password', 'valid password is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username: username });

      if (!user) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentails' }] });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentails' }] });
      }

      // if password matches get a token from jwt

      const payload = {
        user: {
          id: user.id
        }
      };

      await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 65000 },
        (err, token) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ token: token });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
