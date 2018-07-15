import axios from 'axios';
import { history } from '../../components/App';


const pushReservations = reservations => ({
  type: 'PUT_RESERVATIONS',
  payload: reservations
});

const addReservation = reservation => ({
  type: 'ADD_RESERVATION',
  payload: reservation
});

export const getReservations = () => {
  return dispatch => {
    return axios.get('http://localhost:3090/reservations')
      .then( reservations => {
        dispatch( pushReservations( reservations.data ) )
      })
      .catch( error => {
        if( error.response ){
          console.log(error.response.status);
        }
      });
  };
};

export const startAddReservation = reservation => {
  return dispatch => {
    return axios.post('http://localhost:3090/reservation', reservation)
      .then( response => {
        if( response.data === '' ){ return 'error'; }
        dispatch( addReservation( reservation ) );
      })
      .catch( error => {
        if( error.response ){
          console.log(error.response.status);
        }
      });
  }
}

export const startLogin = info => {
  return dispatch => {
    return axios.post('http://localhost:3090/login', info)
      .then( response => {
        const result = response.data;
        if( result === 'Error: No User Found' ){
          return 'no_user_found';
        }

        if( result === 'Non Authenticated' ){
          return 'not_authenticated';
        }

        const storageInfo = {
          authenticated: true,
          username: info.username
        }
        localStorage.setItem('auth_info', JSON.stringify(storageInfo));

        dispatch( authenticate( info.username ) );
        history.push('/admin/panel');
      })
      .catch( error => {
        if( error.response ){
          console.log(error.response.status);
        }
      });
  }
}

export const startSignin = info => {
  return dispatch => {
    return axios.post('http://localhost:3090/signin', info)
      .then( response => {
        const result = response.data;
        if( result === 'Error: User in Use' ){
          return 'user_in_use';
        }

        const storageInfo = {
          authenticated: true,
          username: info.username
        }
        localStorage.setItem('auth_info', JSON.stringify(storageInfo));

        dispatch( authenticate( info.username ) );
        history.push('/admin/panel');
      })
      .catch( error => {
        if( error.response ){
          console.log(error.response.status);
        }
      });
  }
}

export const authenticate = username => ({
  type: 'AUTHENTICATE',
  payload: username
});

export const logOut = () => ({
  type: 'LOGOUT'
});
