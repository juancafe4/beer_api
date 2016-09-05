import React from 'react';
import {TextField, RaisedButton} from 'material-ui'
class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RegistrationForm';

        this.state = {
          email: '',
          password1: '',
          password2: '',
        }
        this._onSubmit = this._onSubmit.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChamgePassword1 = this._onChamgePassword1.bind(this);
        this._onChangePassword2 = this._onChangePassword2.bind(this);
    }

    _onSubmit(e) {
      e.preventDefault();
      let {email, password1, password2} = this.state

      if (email && password1 && password2) {
        if(password1 === password2) {
          this.props.register({email: email, password: password1});
          this.setState({email: '', password1: '', password2: ''})
        } else {
          console.log('Passwords do not match!')
        }
      }
    }
    _onChangeEmail(e) {
      this.setState({email: e.target.value});
    }
    _onChamgePassword1(e) {
      this.setState({password1: e.target.value});
    }
    _onChangePassword2(e) {
      this.setState({password2: e.target.value});
    }

    render() {
       return (
          <form onSubmit={this._onSubmit}>
            <TextField
              hintText="Email Address"
              type="email"
              value={this.state.email}
              onChange={this._onChangeEmail}
            /><br />
            <TextField
              hintText="Password"
              type="password"
              value={this.state.password1}
              onChange={this._onChamgePassword1}
            /><br />
            <TextField
              hintText="Retype Password"
              type="password"
              value={this.state.password2}
              onChange= {this._onChangePassword2}
            /><br />
            <RaisedButton type="submit" label="Create an Account" />
          </form>
        );
    }
}

export default RegistrationForm;
