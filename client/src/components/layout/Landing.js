import React, { Fragment } from 'react';
import devtree from '../../img/devtree.png';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Fragment>
      <img className='logo-img' src={devtree} alt='' />
      <div className='home'>
        <div className='home-box'>
          <h1>Welcome To DEVTREE</h1>
          <p>
            Connecting developers of different kinds or niche all around the
            world
          </p>
          <ul className='btns-items'>
            <li>
              <Zoom in={true}>
                <Fab>
                  <Link to='/register' className='btns-a'>
                    Register
                  </Link>
                </Fab>
              </Zoom>
            </li>
            <li>
              <Zoom in={true}>
                <Fab>
                  <Link to='/login' className='btns-b'>
                    Login
                  </Link>
                </Fab>
              </Zoom>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
