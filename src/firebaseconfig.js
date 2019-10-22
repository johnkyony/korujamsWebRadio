import firebase from 'firebase'
import 'firebase/firesotre'

const firebaseConfig = {
  apiKey: "AIzaSyDAwv1bwSxGMl9XBOzUXtJPK_yDoVTuf9o",
  authDomain: "korujamsradio-d747d.firebaseapp.com",
  databaseURL: "https://korujamsradio-d747d.firebaseio.com",
  projectId: "korujamsradio-d747d",
  storageBucket: "korujamsradio-d747d.appspot.com",
  messagingSenderId: "447859828916",
  appId: "1:447859828916:web:b5b41a11fa6ad443148fe1"
};

firebase.initializeApp(firebaseConfig)


//firebase utils 
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser



const settings = {
  timestampsInSnapshots: true
}


db.settings(settings)

const usersCollection = db.collection('users')

export {
db, 
firebase, 
usersCollection,
auth ,
currentUser
}