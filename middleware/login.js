import FirebaseApp from '~/utils/firebase.js';
import 'firebase/auth';

export default ({redirect}) => {
  if(FirebaseApp.auth().currentUser === null) {
    redirect('/login');
  }
}
