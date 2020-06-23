import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const Comment = ({ comment, auth: { user }, deleteComment, post }) => {
  return (
    <div className='comment-block'>
      <Link to={`/profile/${comment.user}`}>
        <Avatar src={comment.avatar} alt='profile image' className='media' />
      </Link>

      <div className='comment-text'>
        <strong>{comment.username}</strong>
        <p>{comment.text}</p>
        <ul>
          <li>
            Posted <Moment fromNow>{comment.date}</Moment>
          </li>
          <li>•</li>
          <li>
            {user && user._id === comment.user ? (
              <DeleteIcon
                onClick={() => deleteComment(post._id, comment._id)}
                className='del-btn'
              />
            ) : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
};

const mapState = (state) => ({
  auth: state.auth
});

export default connect(mapState, { deleteComment })(Comment);
