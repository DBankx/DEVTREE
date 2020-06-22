import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ addComment, post }) => {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className='comment-form'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment({ text }, post && post._id);
          setText('');
        }}
      >
        <TextField
          label='Leave a Comment'
          multiline
          rows={4}
          variant='outlined'
          fullWidth={true}
          name='text'
          onChange={handleChange}
        />

        <Zoom in={true}>
          <Fab variant='extended' type='submit'>
            comment
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

export default connect(null, { addComment })(CommentForm);
