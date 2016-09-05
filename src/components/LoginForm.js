import React from 'react';
import {TextField, RaisedButton} from 'material-ui'
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'LoginForm';
        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit(e) {
      e.preventDefault();
      console.log('Logging in....');
    }
    render() {
        return (
          <form onSubmit={this._onSubmit}>
            <TextField
              hintText="Email Address"
              type="email"
            /><br />
            <TextField
              hintText="Password"
              type="password"
            /><br />
            <RaisedButton type="submit" label="Login" />
          </form>
        );
    }
}

export default LoginForm;

