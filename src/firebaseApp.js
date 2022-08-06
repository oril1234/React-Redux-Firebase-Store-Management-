
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


//Firebase data in order to establish connection with it
const firebaseConfig = {
  apiKey: "some apiKey",
  authDomain: "some authDomain",
  projectId: "some projectId",
  storageBucket: "some storageBucket",
  messagingSenderId: "some messagingSenderId",
  appId: "some appId"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
 
