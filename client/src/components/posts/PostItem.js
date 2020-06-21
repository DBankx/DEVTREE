import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { addLike, removeLike } from '../../actions/post';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

const PostItem = ({ post, auth: { user }, addLike, removeLike }) => {
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
      <Link to={`/profile/${post.user}`}>
        <Avatar className='feed-avatar' src={post.avatar} alt='user image' />
      </Link>
      <div className='post-content'>
        <ul className='top-info'>
          <li>{post.username}</li>
          <li>•</li>
          <li>
            <Moment format='YYYY/MM/DD'>{post.date}</Moment>
          </li>
        </ul>
        <p>{post.text}</p>
        <ul className='trigger-bottom'>
          <li>
            {isLiked == null ? (
              <FavoriteBorderIcon
                style={{ color: '#cccccc' }}
                onClick={() => addLike(post._id)}
              />
            ) : (
              <FavoriteIcon
                style={{ color: 'rgb(202, 70, 70)' }}
                onClick={() => removeLike(post._id)}
              />
            )}{' '}
            <span>{post.likes.length > 0 ? post.likes.length : null}</span>
          </li>
          <li>
            <a href='comments.html'>
              Comment{' '}
              {post.comments.length > 0 ? `(${post.comments.length})` : null}
            </a>
          </li>
          {/* checking if the post was made by the user */}
          {post.user === user._id ? (
            <li>
              <Zoom in={true}>
                <DeleteIcon style={{ color: '#333' }} />
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
  auth: PropTypes.object.isRequired
};

const mapState = (state) => ({
  auth: state.auth
});

export default connect(mapState, { addLike, removeLike })(PostItem);
