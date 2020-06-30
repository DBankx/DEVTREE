import React, { Fragment } from 'react';
import devtree from '../../img/devtree.png';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { Link } from 'react-router-dom';
import devtreeMockup from '../../img/devtreeBanner.png';
import speakerIcon from '../../img/speaker-icon.png';
import employment from '../../img/employment.png';
import connect from '../../img/connect.png';
import quotation from '../../img/quotation.png';

const Landing = () => {
  return (
    <Fragment>
      <div className='landing-page'>
        <section className='top-section'>
          <img src={devtree} alt='top logo' className='top-logo' />
          <div className='top-banner'>
            <div className='top-banner-text'>
              <h1>Connecting Developers Worldwide</h1>
              <p>
                Join Devtree and connecting with developers from different
                stacks and niches across the globe.
              </p>
              <ul>
                <li>
                  <Zoom in={true}>
                    <Link to='/register' style={{ textDecoration: 'none' }}>
                      <Fab variant='extended'>Register</Fab>
                    </Link>
                  </Zoom>
                </li>
                <li>
                  <Zoom in={true}>
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                      <Fab variant='extended'> Login</Fab>
                    </Link>
                  </Zoom>
                </li>
              </ul>
            </div>
            <div className='top-img'>
              <img src={devtreeMockup} alt='app mockup' />
            </div>
          </div>
        </section>
        <section className='features'>
          <div className='feat-body'>
            <h6>why use Devtree</h6>
            <h2>We provide developers a platform to connect and discover!</h2>
            <div className='feature-section'>
              <div className='feat-card'>
                <img src={speakerIcon} alt='speaker icon' />
                <h6>Express yourself</h6>
                <p>
                  Have a problem or an idea? voice it and have disucssions or
                  help with other programmers
                </p>
              </div>
              <div className='feat-card'>
                <img src={employment} alt='employment icon' />
                <h6>Find eager devs</h6>
                <p>
                  Are you looking for devs to hire? Just look through their
                  profile to find out their education and employment history!
                </p>
              </div>
              <div className='feat-card'>
                <img src={connect} alt='connect-icon' />
                <h6>Link with developers</h6>
                <p>
                  Link with a developer on other different platforms from
                  devtree by viewing their profile links
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='counter'>
          <div className='counter-talk'>
            <div className='one'>
              <h1>1</h1>
              <span>+</span>
            </div>
            <h1>Million</h1>
            <p>
              Devtree recently hit the mark of 1.7million users, and we as a
              compnay are so happy and estatic for the future of our brand and
              our users, we currently have so many features in the works without
              taking out of the current positive experience our users have while
              using the app, we come to hope our users will keep growing and
              keep flapping the devtree wings high. We love you guys so much!
            </p>
          </div>
        </section>
        <section className='testimonials'>
          <div className='tests'>
            <h3>Things our users have said about us</h3>
            <div className='tests-area'>
              <div className='test-square'>
                <img src={quotation} alt='marks' />
                <div className='test-box'>
                  <p>
                    This app made it easy for me to find projects that i could
                    use for my portfolio so i could get my first job as a
                    developer!!, really great app, and generally nice people on
                    here.
                  </p>
                  <span>John Deremego</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Landing;
