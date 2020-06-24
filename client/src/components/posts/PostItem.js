import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

const PostItem = ({
  post,
  auth: { user },
  addLike,
  removeLike,
  deletePost
}) => {
  // checks if user has liked a certain post

  var isLiked;

  async function getLiked() {
    if (user !== null) {
      isLiked = post.likes.find((like) => like.user === user._id);
    } else {
      isLiked = null;
    }
  }

  getLiked();

  return (
    <div className='post'>
      <Link to={`/profile/${post && post.user}`}>
        <Avatar className='feed-avatar' src={post.avatar} alt='user image' />
      </Link>
      <div className='post-content'>
        <ul className='top-info'>
          <li>{post.username}</li>
          <li>•</li>
          <li>
            <Moment fromNow>{post.date}</Moment>
          </li>
        </ul>
        <div className='post-text-area'>
          <Link className='post-text' to={`/post/${post._id}`}>
            {post.text}
          </Link>
        </div>
        <ul className='trigger-bottom'>
          <li>
            {isLiked == null ? (
              <FavoriteBorderIcon
                style={{ color: '#cccccc', cursor: 'pointer' }}
                onClick={() => addLike(post && post._id)}
              />
            ) : (
              <FavoriteIcon
                style={{ color: 'rgb(202, 70, 70)', cursor: 'pointer' }}
                onClick={() => removeLike(post && post._id)}
              />
            )}{' '}
            <span>
              {post && post.likes.length > 0 ? post.likes.length : null}
            </span>
          </li>
          <li>
            <Link to={`/post/${post && post._id}`}>
              Comment
              {post && post.comments.length > 0
                ? `s (${post.comments.length})`
                : null}
            </Link>
          </li>
          {/* checking if the post was made by the user */}
          {post.user === user._id ? (
            <li>
              <Zoom in={true}>
                <DeleteIcon
                  className='del-btn'
                  onClick={() => deletePost(post && post._id)}
                />
              </Zoom>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapState = (state) => ({
  auth: state.auth
});

export default connect(mapState, { addLike, removeLike, deletePost })(PostItem);
