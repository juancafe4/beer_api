import React from 'react';
import {browserHistory} from 'react-router';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Profile';
    }

    componentDidMount() {
    	if(document.cookie.includes('authtoken')) {
      	console.log('We found a cookie');
    	} else {  
      	browserHistory.push('/');
    	}
    }
    render() {
        return <div>Profile</div>;
    }
}

export default Profile;
