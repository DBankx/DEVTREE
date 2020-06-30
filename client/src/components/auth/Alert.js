import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

// This renders an alert according to the setAlert action with messages and the alert type
const SetAlert = ({ alerts }) => {
  return (
    <Fragment>
      {alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <Fragment>
              <div className='alert' key={alert.id}>
                <Alert style={{ position: 'fixed' }} severity={alert.alertType}>
                  {alert.message}
                </Alert>
              </div>
            </Fragment>
          );
        })}
    </Fragment>
  );
};

SetAlert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(SetAlert);
