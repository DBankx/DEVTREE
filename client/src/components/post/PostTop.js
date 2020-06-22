import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { getPostById } from '../../actions/post';
import Zoom from '@material-ui/core/Zoom';
import DeleteIcon from '@material-ui/icons/Delete';

const PostTop = ({ post, addLike, removeLike, user, history, deletePost }) => {
  useEffect(() => {
    async function getPost() {
      await user;
      getPostById(post._id);
    }

    getPost();
  }, [getPostById]);

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
    <div className='post-word'>
      <div className='post-word-top'>
        <Link to={`/profile/${post && post.user}`}>
          <Avatar
            src={post && post.avatar}
            alt='profile image'
            style={{ width: '70px', height: '70px' }}
          />
        </Link>
        <p>{post && post.username}</p>
      </div>
      <p className='word'>{post && post.text}</p>
      <div className='bottom-info'>
        <ul>
          <li>
            <Moment format='MMM-DD-YYYY'>{post && post.date}</Moment>
          </li>
          <li>•</li>
          <li>
            <Moment fromNow>{post && post.date}</Moment>
          </li>
        </ul>
      </div>
      <div className='bottom-trigger'>
        <ul>
          <li>
            <span>
              {post && post.likes.length > 0 ? post.likes.length : null}
            </span>{' '}
            {isLiked == null ? (
              <FavoriteBorderIcon
                style={{ color: '#cccccc' }}
                onClick={() => addLike(post && post._id)}
              />
            ) : (
              <FavoriteIcon
                style={{ color: 'rgb(202, 70, 70)' }}
                onClick={() => removeLike(post && post._id)}
              />
            )}{' '}
          </li>
          <li>
            {post.comments.length > 0
              ? `${post && post.comments.length} Comments`
              : 'No comments yet'}
          </li>
          {post.user === user._id ? (
            <li>
              <Zoom in={true}>
                <DeleteIcon
                  style={{ color: 'rgb(100, 100, 100)' }}
                  onClick={() => {
                    deletePost(post && post._id);
                    history.push('/feed');
                  }}
                />
              </Zoom>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

PostTop.propTypes = {
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

export default connect(null, { addLike, removeLike, deletePost })(
  withRouter(PostTop)
);
