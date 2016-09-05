import React, { Component } from 'react';
import {Link} from 'react-router'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.displayName = 'Layout';

  }
  componentDidMount() {
    if(document.cookie.includes('authtoken')) {
      console.log('Cooike found.')
    } else {  
      console.log('Cookie not found')
    }
  }
  render() {
    return (
    <MuiThemeProvider>
     <div>
      <div className="container">
        <h1 className="text-center">Welcome to the Beer API</h1>
        {this.props.children}
      </div>
     </div>
     </MuiThemeProvider>
    )
  }
}
