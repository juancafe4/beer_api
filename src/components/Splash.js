import React from 'react';
import {MuiThemeProvider} from 'material-ui';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

import { connect } from 'react-redux' ;
import {register} from '../actions/UserActions';
class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Splash';
    }
    render() {
    		let {register} = this.props;
        return (
        	<MuiThemeProvider>

    					<div className="row">
    						<div className="col-xs-6">
    							<h3>Log In</h3>
    							<LoginForm />
    						</div>
    						<div className="col-xs-6">
    							<h3>Or Create an Account</h3>
    							<RegistrationForm register={register}/>
    						</div>
    					</div>

  				</MuiThemeProvider>
       )
    }
}

export default connect(
	state => ({

	}),
  dispatch => ({
    register(user) {
      dispatch(register(user))
    }
  }))
  (Splash)
