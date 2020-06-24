import React, { Fragment, useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import PostForm from './PostForm';
const PostItem = React.lazy(() => import('./PostItem'));

const Posts = ({ post, getAllPosts, auth: { user } }) => {
  // wait for user before gets all posts
  useState(() => {
    async function getPosts() {
      await user;
      getAllPosts();
    }
    getPosts();
  }, [getAllPosts]);

  return (
    <Fragment>
      {post.loading ? (
        <Spinner />
      ) : (
        <Suspense fallback={<Spinner />}>
          <div className='next'>
            <h1 style={{ color: '#8d8d8d', fontWeight: '800', opacity: '0.5' }}>
              Feed <MarkunreadMailboxIcon />
            </h1>
            <div className='posts-area'>
              <PostForm user={user && user} />

              <hr></hr>
              <div className='posts-section'>
                {post &&
                  post.posts.map((post) => {
                    return <PostItem key={post._id} post={post} />;
                  })}
              </div>
            </div>
          </div>
        </Suspense>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired
};

const mapState = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapState, { getAllPosts })(Posts);
