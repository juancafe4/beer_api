import axios from 'axios'

import {browserHistory} from 'react-router'
export function receiveProfile(profile) {
  return {
    type: 'RECEIVE_PROFILE',
    payload: { profile }
  }
}

export function removeProfile() {
  return {
    type: 'REMOVE_PROFILE'
  }
}

export function register(user) {
    console.log(user  )
    axios.post('/api/users/register', user)
      .then(() => {
        dispatch(getProfile())
      })
      .catch(console.error)
}

export function getProfile() {
  return dispatch => {
    axios.get('/api/users/profile')
    .then(res => res.data)
    .then(profile => {
      dispatch(receiveProfile(profile))
      browserHistory.push('/profile')
    })
    .catch(console.error)
  }
}

// export function logout() {
//   return dispatch => {
//     axios.post('/api/users/logout')
//     .then(() => {
//       dispatch(removeProfile());
//     })
//     .catch(console.error)
//   }
// }

// export function login (user) {
//   return dispatch => {
//     axios.post('/api/users/login', user)
//     .then(() => {
//       dispatch(getProfile())
//     })
//     .catch(console.error)
//   }
// }


// export function updateProfile(id, obj) {
//   return dispatch => {
//     axios.put(`/api/users/${id}`, obj)
//     .then(res => res.data)
//     .then(profile => {
//       dispatch(receiveProfile(profile));
//     })
//     .catch(console.error)
//   }
// }
