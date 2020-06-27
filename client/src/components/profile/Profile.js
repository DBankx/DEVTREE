import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import {
  getProfileById,
  getUserPosts,
  getLikedPosts
} from '../../actions/profile';
import { connect } from 'react-redux';
import ProfileTop from './ProfileTop';
import Profilebio from './Profilebio';
import ProfileSkills from './ProfileSkills';
import Experience from './Experience';
import Education from './Education';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { Link } from 'react-router-dom';
import MainProfile from './MainProfile';
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GithubRepos from './GithubRepos';
import PostItem from '../posts/PostItem';

function Profile({
  getProfileById,
  auth,
  profile: { profile, loading, posts, likedPosts },
  getUserPosts,
  match,
  getLikedPosts
}) {
  useEffect(() => {
    getProfileById(match.params.id);
    getUserPosts(match.params.id);
    getLikedPosts(match.params.id);
  }, [getProfileById, getUserPosts, getLikedPosts]);

  // this controls the clicks of the tab view
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(true);

  function handleClick() {
    setClick(true);
    setClick2(false);
    setClick3(false);
  }

  function handleClick2() {
    setClick2(true);
    setClick(false);
    setClick3(false);
  }

  function handleClick3() {
    setClick3(true);
    setClick2(false);
    setClick(false);
  }

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div className='next'>
          <div className='profile'>
            <ProfileTop profile={profile} auth={auth} />
          </div>
          <div className='wrapper'>
            <div className='tabs'>
              <ul>
                <li className={click3 ? 'active' : null} onClick={handleClick3}>
                  <span>
                    <PersonIcon className='icons' />
                  </span>
                  <span className='text'>Profile</span>
                </li>
                <li onClick={handleClick2} className={click2 ? 'active' : null}>
                  <span>
                    <MessageIcon className='icons' />
                  </span>
                  <span className='text'>Posts</span>
                </li>
                <li onClick={handleClick} className={click ? 'active' : null}>
                  <span>
                    <FavoriteIcon className='icons' />
                  </span>
                  <span className='text'>Liked Posts</span>
                </li>
              </ul>
            </div>
            <div className='content'>
              <div
                className='tab-wrap'
                style={{ display: click3 ? 'block' : 'none' }}
              >
                <div className='tab-content'>
                  <Profilebio profile={profile} />
                  <ProfileSkills profile={profile} />
                  <div className='exp-edu'>
                    <Experience profile={profile} />
                    <Education profile={profile} />
                  </div>
                  <GithubRepos />
                </div>
              </div>
              <div
                className='tab-wrap'
                style={{ display: click2 ? 'block' : 'none' }}
              >
                <div className='tab-content'>
                  <div className='posts-area'>
                    <div className='posts-section'>
                      {posts.length > 0 ? (
                        posts.map((post) => (
                          <PostItem key={post._id} post={post} />
                        ))
                      ) : (
                        <p>{profile.user.username} has no posts yet...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='tab-wrap'
                style={{ display: click ? 'block' : 'none' }}
              >
                <div className='tab-content'>
                  <div className='posts-area'>
                    <div className='posts-section'>
                      {likedPosts.length > 0 ? (
                        likedPosts.map((post) => (
                          <PostItem key={post._id} post={post} />
                        ))
                      ) : (
                        <p>
                          {profile.user.username} hasn't liked any posts yet...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

const mapState = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapState, {
  getProfileById,
  getUserPosts,
  getLikedPosts
})(Profile);
