import React from 'react';
import PropTypes from 'prop-types';

const GithubRepos = (props) => {
  return (
    <div className='github-repos'>
      <h3>
        <i className='fab fa-github'></i> Github Repos
      </h3>

      <div className='repo'>
        <div className='repo-desc'>
          <h5 className='mt-2'>Repo Name</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            accusamus.
          </p>
        </div>
        <div className='activity'>
          <ul>
            <li>
              <strong>Stars: </strong>10
            </li>
            <li>
              <strong>Forks: </strong>54
            </li>
            <li>
              <strong>Watchers: </strong>23
            </li>
          </ul>
        </div>
      </div>

      <div className='repo'>
        <div className='repo-desc'>
          <h5 className='mt-2'>Repo Name 2</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            accusamus.
          </p>
        </div>
        <div className='activity'>
          <ul>
            <li>
              <strong>Stars: </strong>10
            </li>
            <li>
              <strong>Forks: </strong>54
            </li>
            <li>
              <strong>Watchers: </strong>23
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

GithubRepos.propTypes = {};

export default GithubRepos;
