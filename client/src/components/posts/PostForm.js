import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';

const PostForm = ({ user, createPost }) => {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className='post-form'>
      <Link to={`/profile/${user && user._id}`} className='profile-post-link'>
        <Avatar
          className='post-profile'
          src={user && user.avatar}
          alt='user image'
          style={{
            width: '100px',
            height: '100px'
          }}
        />
      </Link>
      <div className='post-body'>
        <form
          onSubmit={(e) => {
            createPost({ text });
            e.preventDefault();
            setText('');
          }}
        >
          <textarea
            name='text'
            rows='4'
            placeholder='whats on your mind?'
            value={text}
            onChange={handleChange}
          ></textarea>
          <div className='post-btn'>
            <p>{text.length > 0 ? text.length : null}</p>
            <Zoom in={true}>
              <Fab variant='extended' type='submit'>
                Post
              </Fab>
            </Zoom>
          </div>
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  user: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired
};

export default connect(null, { createPost })(PostForm);
