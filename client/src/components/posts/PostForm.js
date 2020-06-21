import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';

const PostForm = ({ user, createPost }) => {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className='post-form'>
      <Avatar
        src={user && user.avatar}
        alt='user image'
        style={{ width: '100px', height: '100px' }}
      />
      <div className='post-body'>
        <form
          onSubmit={(e) => {
            createPost({ text });
            e.preventDefault();
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
