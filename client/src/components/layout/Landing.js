import React, { Fragment } from 'react';
import devtree from '../../img/devtree.png';
import banner1 from '../../img/banner1.png';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Fragment>
      <div className='landing-page'>
        <div className='top-banner'>
          <img className='logo-image' src={devtree} alt='app logo' />
          <div className='top-content'>
            <div className='top-content-words'>
              <h1>Connecting Developers Wordlwide</h1>
              <p>
                Devtree is the number one platform for connecting with
                developers from different niches world wide, and is trusted by
                millions.
              </p>
              <ul>
                <li>
                  <Zoom in={true}>
                    <Fab variant='extended'>Register</Fab>
                  </Zoom>
                </li>
                <li>
                  <Zoom in={true}>
                    <Fab variant='extended'>Login</Fab>
                  </Zoom>
                </li>
              </ul>
            </div>
            <img src={banner1} alt='Banner image' />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
