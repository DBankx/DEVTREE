import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPostById } from '../../actions/post';
import Spinner from '../layout/Spinner';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PostTop from './PostTop';
import CommentForm from './CommentForm';
import Comment from './Comment';

const Post = ({
  post: { post, loading },
  match,
  getPostById,
  auth: { user }
}) => {
  useEffect(() => {
    async function getPost() {
      await user;
      getPostById(match.params.id);
    }

    getPost();
  }, [getPostById]);

  return (
    <div className='next'>
      {post !== null && loading === false ? (
        <div className='single-post'>
          <Link to='/feed'>
            <KeyboardBackspaceIcon /> Back to Feed
          </Link>
          <PostTop post={post} user={user} />
          <CommentForm post={post} />
          {post.comments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapState = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapState, { getPostById })(Post);
