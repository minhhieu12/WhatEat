import { 
    USER_STATE_CHANGE,
} from '../constants/index'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export function fetchUser(){
    return dispatch => {
        fetch('http://192.168.1.187:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                passWord: password
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if (!json.isError) {
                dispatch({type: USER_STATE_CHANGE, currentUser: json.email})
            } else {
                alert('Không tồn tại!')
            }
        })
        .catch((error) => {
            alert(error);
        })
        /*
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
                } else {
                    console.log('Không tồn tại');
                }
            });
        */
    }
}