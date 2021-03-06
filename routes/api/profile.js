require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const auth = require('../../middlewares/auth');
const { check, validationResult } = require('express-validator/check');
const Post = require('../../models/Post');
const axios = require('axios');

// gets the users profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', [
      'avatar',
      'following',
      'followers',
      'name',
      'dateofbirth'
    ]);

    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for the user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// create a profile
router.post(
  '/',
  [
    auth,
    [
      check('skills', 'Skills is required').not().isEmpty(),
      check('status', 'Status is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');

    const {
      company,
      location,
      status,
      skills,
      website,
      githubusername,
      bio,
      youtube,
      facebook,
      twitter,
      reddit,
      instagram,
      linkedin
    } = req.body;

    // putting all the data into an object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    profileFields.username = user.username;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (githubusername) profileFields.githubusername = githubusername;
    if (status) profileFields.status = status;
    if (skills)
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    if (bio) profileFields.bio = bio;

    profileFields.social = {};

    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (reddit) profileFields.social.reddit = reddit;
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        profile = new Profile(profileFields);
        profile.save();
        // send back the profile
        res.json(profile);
      }

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'avatar',
      'name',
      'username',
      'following',
      'followers'
    ]);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get profile by username
router.post('/find', async (req, res) => {
  try {
    const profile = await Profile.find({
      username: { $regex: req.body.username, $options: 'i' }
    }).populate('user', [
      'avatar',
      'name',
      'username',
      'following',
      'followers'
    ]);

    if (!profile) {
      res.status(400).json({ msg: 'profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get a profile by user id
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', [
      'avatar',
      'following',
      'followers',
      'username',
      'name'
    ]);

    if (!profile) {
      res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// delete everything a user has
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    // @@@ todo - delete user posts
    res.json({ msg: 'profile has been deleted' });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// add experience
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'company is required').not().isEmpty(),
      check('from', 'from is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ msg: errors.array() });
    }

    const {
      title,
      location,
      position,
      from,
      to,
      current,
      description,
      company
    } = req.body;

    const newExperience = {
      title: title,
      loaction: location,
      position: position,
      from: from,
      to: to,
      current: current,
      description: description,
      company: company
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        await profile.experience.unshift(newExperience);

        await profile.save();

        res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// delete experience
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get the index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    // splice the experience from the array
    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// add education
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School name is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'from is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ msg: errors.array() });
    }

    const {
      school,
      fieldofstudy,
      degree,
      from,
      to,
      current,
      gpa,
      location,
      description
    } = req.body;

    const newEdu = {
      school: school,
      fieldofstudy: fieldofstudy,
      degree: degree,
      from: from,
      to: to,
      current: current,
      location: location,
      gpa: gpa,
      description: description
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        await profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// remove education
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // get the index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    // splice the experience from the array
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get users github repos
router.get('/github/:githubusername', auth, async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.githubusername}/repos?per_page=5&sort=created:asc`
    );

    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    };

    const githubResponse = await axios.get(uri, { headers });

    return res.json(githubResponse.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get all users post from their id
router.get('/user/posts/:user_id', auth, async (req, res) => {
  try {
    const post = await Post.find({ user: req.params.user_id }).sort({
      date: -1
    });

    if (!post) {
      res.send(404).json({ msg: 'Nothing was found' });
    } else {
      res.json(post);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// find all posts user has liked
router.get('/user/posts/liked/:user_id', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .elemMatch('likes', {
        user: req.params.user_id
      })
      .sort({ date: -1 });

    if (!posts) {
      res.status(404).json({ msg: 'No posts found' });
    } else {
      res.json(posts);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
