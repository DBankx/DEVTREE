import React from 'react';
import PropTypes from 'prop-types';

// this page gets the repos as props from the profile page and renders it into the ui
const GithubRepos = ({ repos }) => {
  return (
    <div className='github-repos'>
      <h3>
        <i className='fab fa-github'></i> Github Repos
      </h3>

      {repos &&
        repos.map((repo) => {
          return (
            <div className='repo' key={repo._id}>
              <div className='repo-desc'>
                <h5 className='mt-2'>
                  <a
                    style={{ color: '#000', textDecoration: 'none' }}
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {' '}
                    {repo.name}
                  </a>
                </h5>
                <p>{repo.description}</p>
              </div>
              <div className='activity'>
                <ul>
                  <li>
                    <strong>Stars: </strong>
                    {repo.stargazers_count}
                  </li>
                  <li>
                    <strong>Forks: </strong>
                    {repo.forks_count}
                  </li>
                  <li>
                    <strong>Watchers: </strong>
                    {repo.watchers_count}
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
    </div>
  );
};

GithubRepos.propTypes = {
  repos: PropTypes.array.isRequired
};

export default GithubRepos;
