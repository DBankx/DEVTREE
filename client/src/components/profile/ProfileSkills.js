import React from 'react';
import PropTypes from 'prop-types';

const ProfileSkills = ({ profile }) => {
  return (
    <div className='skills-section'>
      <h4>skills:</h4>
      <ul>
        {profile.skills.map((skill, index) => {
          return <li key={index}>{skill}</li>;
        })}
      </ul>
    </div>
  );
};

ProfileSkills.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileSkills;
