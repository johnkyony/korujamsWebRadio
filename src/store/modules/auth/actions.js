const firebase = require('../firebaseConfig.js')
import router from './router'


export default {
  userSignUp: (context , {email , password})=>{
    context.commit('setLoading' , true)
    firebase.auth.createUserWithEmailAndPassword(email , password)
    return new Promise((resolve , reject) => {
      firebase.auth.onAuthStateChanged((user) => {
        if(user){
          context.commit('setCurrentUser' , {userId: user.uid , email: user.email })
          context.dispatch('createNewUser' , {userId: user.uid , email: user.email})
          resolve(user.uid)
        }else {
          reject('User is not signed id')
        }
      })
    })
    
  },
  login: (context, {email , password}) => {
    context.commit('toggleLoading' , true)
    firebase.auth.signInWithEmailAndPassword(email , password)
    return new Promise((resolve , reject) => {
      firebase.auth.onAuthStateChanged((user) => {
        if(user){
          context.commit('setCurrentUser' , {userId: user.uid , email: user.email})
          context.dispatch('fetchUserProfile')
          context.commit('toggleLoading' , false)
          router.push()
         
        }
      })
    })
  }
}