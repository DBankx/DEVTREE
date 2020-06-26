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
        <section className='top-section'>
          <div className='top-content'>
            <h1>Connecting developers worldwide</h1>
            <p>
              Join Devtree to share toughts with developers from different
              niches from anywhere
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
        </section>
      </div>
    </Fragment>
  );
};

export default Landing;
